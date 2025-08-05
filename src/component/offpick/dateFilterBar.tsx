'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { parseISO, isAfter, isBefore } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'

interface Content {
  id: string
  title: string
  startDate: string // YYYY-MM-DD
  endDate: string   // YYYY-MM-DD
}

interface DateFilterBarProps {
  contents: Content[]
  onFiltered: (filtered: Content[]) => void
}

export default function DateFilterBar({ contents, onFiltered }: DateFilterBarProps) {
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = range

  const handleFilter = () => {
    if (!startDate || !endDate) return

    const filtered = contents.filter((item) => {
      const itemStart = parseISO(item.startDate)
      const itemEnd = parseISO(item.endDate)

      return !(isBefore(itemEnd, startDate) || isAfter(itemStart, endDate))
    })

    onFiltered(filtered)
  }

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl bg-white">
      <label className="text-sm font-semibold">날짜 선택 (시작일 ~ 종료일)</label>
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => setRange(update)}
        isClearable
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜를 선택하세요"
        className="p-2 border rounded"
      />

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleFilter}
        disabled={!startDate || !endDate}
      >
        필터 적용
      </button>
    </div>
  )
}
