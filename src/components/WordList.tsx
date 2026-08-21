"use client";

import type { Word } from "../interfaces/word";
import { WordCard } from "./WordCard";

interface WordListProps {
  words: Word[];
  onEdit: (word: Word) => void;
  onDelete: (id: string) => void;
}

export function WordList({ words, onEdit, onDelete }: WordListProps) {
  if (words.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-face" aria-hidden="true">•︵•</div>
        <h3>Burada henüz kelime yok</h3>
        <p>Aramayı temizleyebilir veya yukarıdan yeni bir kelime ekleyebilirsin.</p>
      </div>
    );
  }

  return <div className="word-list">{words.map((word) => <WordCard key={word.id} word={word} onEdit={onEdit} onDelete={onDelete} />)}</div>;
}
