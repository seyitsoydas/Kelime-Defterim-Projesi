"use client";

import type { Word, WordStatus } from "../interfaces/word";

interface WordCardProps {
  word: Word;
  onEdit: (word: Word) => void;
  onDelete: (id: string) => void;
}

const statusLabels: Record<WordStatus, string> = { new: "Yeni eklendi", learning: "Çalışıyorum", learned: "Öğrendim" };
const avatarFaces: Record<WordStatus, string> = { new: "•ᴗ•", learning: "◕‿◕", learned: "★ᴗ★" };

export function WordCard({ word, onEdit, onDelete }: WordCardProps) {
  return (
    <article className={`word-card status-${word.status}`}>
      <div className="word-avatar" aria-hidden="true"><span>{avatarFaces[word.status]}</span></div>
      <div className="word-content">
        <div className="word-title-row">
          <div>
            <h3>{word.english}</h3>
            <p className="meaning">{word.turkish}</p>
          </div>
          <span className={`status-pill ${word.status}`}>{statusLabels[word.status]}</span>
        </div>
        {word.example && <p className="example">“{word.example}”</p>}
        <div className="word-footer">
          <span className="category">{word.category}</span>
          <div className="card-actions">
            <button type="button" onClick={() => onEdit(word)}>Düzenle</button>
            <button type="button" className="delete-button" onClick={() => onDelete(word.id)}>Sil</button>
          </div>
        </div>
      </div>
    </article>
  );
}
