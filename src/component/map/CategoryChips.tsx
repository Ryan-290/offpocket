'use client';

import clsx from 'clsx';

export type CategoryId = 'all' | 'performance' | 'popup' | 'exhibition' | 'restaurant' | 'date_course';

export interface Category {
  id: CategoryId;
  label: string;
  color: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: 'all', label: '전체', color: '#6B7280', icon: '🔍' },
  { id: 'performance', label: '공연', color: '#FF6B6B', icon: '🎵' },
  { id: 'popup', label: '팝업', color: '#4ECDC4', icon: '🛍️' },
  { id: 'exhibition', label: '전시', color: '#9B59B6', icon: '🖼️' },
  { id: 'restaurant', label: '맛집', color: '#F39C12', icon: '🍴' },
  { id: 'date_course', label: '데이트', color: '#E91E63', icon: '💕' },
];

interface CategoryChipsProps {
  selected: CategoryId[];
  onToggle: (id: CategoryId) => void;
  counts?: Record<string, number>;
}

export default function CategoryChips({ selected, onToggle, counts }: CategoryChipsProps) {
  const isAllSelected = selected.includes('all');

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-1">
      {CATEGORIES.map((cat) => {
        const isActive = cat.id === 'all' ? isAllSelected : selected.includes(cat.id);
        const count = cat.id !== 'all' && counts ? counts[cat.id] ?? 0 : undefined;

        return (
          <button
            key={cat.id}
            onClick={() => onToggle(cat.id)}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border shrink-0',
              isActive
                ? 'text-white shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            )}
            style={isActive ? { backgroundColor: cat.color, borderColor: cat.color } : undefined}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
            {count !== undefined && count > 0 && (
              <span
                className={clsx(
                  'text-xs px-1.5 py-0.5 rounded-full',
                  isActive ? 'bg-white/25' : 'bg-gray-100'
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
