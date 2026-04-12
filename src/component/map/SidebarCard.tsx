'use client';

import Image from 'next/image';
import Link from 'next/link';
import { OffpickContent } from '@/type/content';
import { CATEGORIES } from './CategoryChips';
import clsx from 'clsx';

const baseURL = 'https://pzwfxlohnoiemrlczoyt.supabase.co/storage/v1/object/public/offpick-images//';

interface SidebarCardProps {
  content: OffpickContent;
  isHighlighted?: boolean;
  onClick?: () => void;
}

export default function SidebarCard({ content, isHighlighted, onClick }: SidebarCardProps) {
  const category = (content as any).category ?? 'popup';
  const cat = CATEGORIES.find((c) => c.id === category) ?? CATEGORIES[2];

  const formatDate = (dateStr: string) => {
    const [, month, day] = dateStr.split('-');
    return `${month}.${day}`;
  };

  return (
    <div
      id={`card-${content.id}`}
      onClick={onClick}
      className={clsx(
        'flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50',
        isHighlighted && 'bg-gray-50 scale-[1.02]'
      )}
      style={isHighlighted ? { outline: `2px solid ${cat.color}`, outlineOffset: '-1px' } : undefined}
    >
      {/* 썸네일 */}
      <div className="relative w-[80px] h-[80px] md:w-[100px] md:h-[80px] rounded-lg overflow-hidden shrink-0">
        <Image
          alt={content.title}
          src={baseURL + content.thumbnail_url}
          fill
          className="object-cover"
        />
        <span
          className="absolute top-1 left-1 text-[10px] text-white px-1.5 py-0.5 rounded-full font-medium"
          style={{ backgroundColor: cat.color }}
        >
          {cat.icon}
        </span>
      </div>
      {/* 정보 */}
      <Link href={`/place/${content.id}`} className="flex flex-col min-w-0 flex-1">
        <h3 className="font-semibold text-sm truncate">{content.title}</h3>
        <p className="text-xs text-gray-500 mt-1 truncate">{content.location}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {formatDate(content.start_date)}~{formatDate(content.end_date)}
        </p>
      </Link>
    </div>
  );
}
