'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

interface BottomSheetProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

type SheetState = 'collapsed' | 'half' | 'expanded';

const SNAP_POINTS: Record<SheetState, number> = {
  collapsed: 0.15,
  half: 0.50,
  expanded: 0.90,
};

export default function BottomSheet({ children, header }: BottomSheetProps) {
  const [state, setState] = useState<SheetState>('half');
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    startY: 0,
    startHeight: 0,
    isDragging: false,
  });

  const getHeight = useCallback(() => {
    return typeof window !== 'undefined' ? window.innerHeight * SNAP_POINTS[state] : 400;
  }, [state]);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(getHeight());
  }, [getHeight]);

  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight * SNAP_POINTS[state]);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [state]);

  const snapToNearest = useCallback((currentHeight: number) => {
    const vh = window.innerHeight;
    const ratio = currentHeight / vh;

    let closest: SheetState = 'half';
    let minDist = Infinity;
    for (const [key, snap] of Object.entries(SNAP_POINTS)) {
      const dist = Math.abs(ratio - snap);
      if (dist < minDist) {
        minDist = dist;
        closest = key as SheetState;
      }
    }
    setState(closest);
    setHeight(vh * SNAP_POINTS[closest]);
  }, []);

  const handleDragStart = useCallback((clientY: number) => {
    dragRef.current = {
      startY: clientY,
      startHeight: height,
      isDragging: true,
    };
  }, [height]);

  const handleDragMove = useCallback((clientY: number) => {
    if (!dragRef.current.isDragging) return;
    const diff = dragRef.current.startY - clientY;
    const newHeight = Math.max(
      window.innerHeight * 0.10,
      Math.min(window.innerHeight * 0.92, dragRef.current.startHeight + diff)
    );
    setHeight(newHeight);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;
    snapToNearest(height);
  }, [height, snapToNearest]);

  return (
    <div
      ref={sheetRef}
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40 flex flex-col transition-[height] duration-300 ease-out md:hidden"
      style={{ height }}
    >
      {/* Drag handle */}
      <div
        className="flex justify-center py-3 cursor-grab active:cursor-grabbing touch-none"
        onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
        onTouchEnd={handleDragEnd}
        onMouseDown={(e) => {
          handleDragStart(e.clientY);
          const onMove = (ev: MouseEvent) => handleDragMove(ev.clientY);
          const onUp = () => {
            handleDragEnd();
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
          };
          document.addEventListener('mousemove', onMove);
          document.addEventListener('mouseup', onUp);
        }}
      >
        <div className="w-10 h-1 bg-gray-300 rounded-full" />
      </div>

      {/* Header (category chips etc) */}
      {header && <div className="px-4 pb-2 shrink-0">{header}</div>}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {children}
      </div>
    </div>
  );
}
