"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Word, WordFormData, WordStatus } from "../interfaces/word";

interface WordFormProps {
  editingWord: Word | null;
  onSave: (data: WordFormData) => void;
  onCancel: () => void;
}

const emptyForm: WordFormData = {
  english: "",
  turkish: "",
  category: "Akademik",
  example: "",
  status: "new",
};

export function WordForm({ editingWord, onSave, onCancel }: WordFormProps) {
  const [formData, setFormData] = useState<WordFormData>(emptyForm);

  useEffect(() => {
    if (editingWord) {
      const { english, turkish, category, example, status } = editingWord;
      setFormData({ english, turkish, category, example, status });
    } else {
      setFormData(emptyForm);
    }
  }, [editingWord]);

  function updateField(field: keyof WordFormData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formData.english.trim() || !formData.turkish.trim()) return;

    onSave({
      ...formData,
      english: formData.english.trim(),
      turkish: formData.turkish.trim(),
      example: formData.example.trim(),
    });

    if (!editingWord) setFormData(emptyForm);
  }

  return (
    <section className="form-panel" aria-labelledby="word-form-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow">YENİ KAYIT</span>
          <h2 id="word-form-title">{editingWord ? "Kelimeyi düzenle" : "Deftere kelime ekle"}</h2>
          <p className="section-note">Kelime ve Türkçe anlam alanlarının doldurulması yeterli.</p>
        </div>
        <span className="pencil-badge" aria-hidden="true">✎</span>
      </div>

      <form onSubmit={handleSubmit} className="word-form">
        <label>
          İngilizce kelime
          <input value={formData.english} onChange={(event) => updateField("english", event.target.value)} placeholder="essential" required />
        </label>

        <label>
          Türkçe anlamı
          <input value={formData.turkish} onChange={(event) => updateField("turkish", event.target.value)} placeholder="gerekli, temel" required />
        </label>

        <label>
          Kategori
          <select value={formData.category} onChange={(event) => updateField("category", event.target.value)}>
            <option>Akademik</option>
            <option>Çevre</option>
            <option>Bilim</option>
            <option>Sosyal Bilimler</option>
            <option>Genel</option>
          </select>
        </label>

        <label>
          Öğrenme durumu
          <select value={formData.status} onChange={(event) => updateField("status", event.target.value as WordStatus)}>
            <option value="new">Yeni ekledim</option>
            <option value="learning">Üzerinde çalışıyorum</option>
            <option value="learned">Öğrendim</option>
          </select>
        </label>

        <label className="wide-field">
          Örnek cümle <span>(isteğe bağlı)</span>
          <input value={formData.example} onChange={(event) => updateField("example", event.target.value)} placeholder="Water is essential for life." />
        </label>

        <div className="form-actions wide-field">
          {editingWord && <button type="button" className="button button-quiet" onClick={onCancel}>Vazgeç</button>}
          <button type="submit" className="button button-primary">
            <span aria-hidden="true">{editingWord ? "✓" : "+"}</span>
            {editingWord ? "Kaydet" : "Deftere ekle"}
          </button>
        </div>
      </form>
    </section>
  );
}
