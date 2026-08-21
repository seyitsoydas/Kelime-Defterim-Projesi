"use client";

import type { WordStatus } from "../interfaces/word";

export type StatusFilter = "all" | WordStatus;

interface WordFilterProps {
  search: string;
  status: StatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
}

export function WordFilter({ search, status, onSearchChange, onStatusChange }: WordFilterProps) {
  const options: Array<[StatusFilter, string]> = [
    ["all", "Tümü"],
    ["new", "Yeni eklenen"],
    ["learning", "Çalışıyorum"],
    ["learned", "Öğrendim"],
  ];

  return (
    <div className="filters">
      <label className="search-box">
        <span aria-hidden="true">⌕</span>
        <span className="sr-only">Kelime ara</span>
        <input type="search" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="İngilizce veya Türkçe ara" />
      </label>
      <div className="filter-buttons" aria-label="Öğrenme durumuna göre filtrele">
        {options.map(([value, label]) => (
          <button key={value} type="button" className={status === value ? "filter-button active" : "filter-button"} onClick={() => onStatusChange(value)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
