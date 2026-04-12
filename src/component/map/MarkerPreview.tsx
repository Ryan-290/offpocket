'use client';

import Image from 'next/image';
import Link from 'next/link';
import { OffpickContent } from '@/type/content';
import { CATEGORIES } from './CategoryChips';
import { IoClose } from 'react-icons/io5';

const baseURL = 'https://pzwfxlohnoiemrlczoyt.supabase.co/storage/v1/object/public/offpick-images//';

interface MarkerPreviewProps {
  content: OffpickContent;
  onClose: () => void;
}

export default function MarkerPreview({ content, onClose }: MarkerPreviewProps) {
  const category = (content as any).category ?? 'popup';
  const cat = CATEGORIES.find((c) => c.id === category) ?? CATEGORIES[2];

  const formatDate = (dateStr: string) => {
    const [, month, day] = dateStr.split('-');
    return `${month}.${day}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden w-[300px] animate-fadeIn">
      <div className="relative">
        <Link href={`/place/${content.id}`}>
          <div className="relative w-full h-[140px]">
            <Image
              alt={content.title}
              src={baseURL + content.thumbnail_url}
              fill
              className="object-cover"
            />
          </div>
        </Link>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
        >
          <IoClose className="w-4 h-4 text-white" />
        </button>
        <span
          className="absolute top-2 left-2 text-xs text-white px-2 py-0.5 rounded-full font-medium"
          style={{ backgroundColor: cat.color }}
        >
          {cat.icon} {cat.label}
        </span>
      </div>
      <Link href={`/place/${content.id}`} className="block p-3">
        <h3 className="font-semibold text-sm truncate">{content.title}</h3>
        <p className="text-xs text-gray-500 mt-1 truncate">{content.location}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {formatDate(content.start_date)}~{formatDate(content.end_date)}
        </p>
      </Link>
    </div>
  );
}
