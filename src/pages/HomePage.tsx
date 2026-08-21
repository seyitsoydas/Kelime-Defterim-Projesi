"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WordFilter, type StatusFilter } from "../components/WordFilter";
import { WordForm } from "../components/WordForm";
import { WordList } from "../components/WordList";
import type { Word, WordFormData } from "../interfaces/word";
import { getStoredWords, saveWords } from "../utils/storage";

const sampleWords: Word[] = [
  { id: "sample-essential", english: "essential", turkish: "gerekli, temel", category: "Akademik", example: "Water is essential for life.", status: "learned", createdAt: 1 },
  { id: "sample-depletion", english: "depletion", turkish: "tükenme, azalma", category: "Çevre", example: "Resource depletion can cause ecological damage.", status: "learning", createdAt: 2 },
  { id: "sample-enhance", english: "enhance", turkish: "geliştirmek, artırmak", category: "Akademik", example: "Technology can enhance student engagement.", status: "new", createdAt: 3 },
];

export function HomePage() {
  const [words, setWords] = useState<Word[]>(sampleWords);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [editingWord, setEditingWord] = useState<Word | null>(null);
  const [ready, setReady] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWords(getStoredWords() ?? sampleWords);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveWords(words);
  }, [words, ready]);

  const visibleWords = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("tr-TR");
    return words.filter((word) => {
      const matchesSearch = !query || word.english.toLocaleLowerCase("en-US").includes(query) || word.turkish.toLocaleLowerCase("tr-TR").includes(query);
      const matchesStatus = statusFilter === "all" || word.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [words, search, statusFilter]);

  const learnedCount = words.filter((word) => word.status === "learned").length;
  const learningCount = words.filter((word) => word.status === "learning").length;

  function handleSave(formData: WordFormData) {
    if (editingWord) {
      setWords((current) => current.map((word) => word.id === editingWord.id ? { ...word, ...formData } : word));
      setEditingWord(null);
      return;
    }

    const newWord: Word = { ...formData, id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, createdAt: Date.now() };
    setWords((current) => [newWord, ...current]);
  }

  function handleEdit(word: Word) {
    setEditingWord(word);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleDelete(id: string) {
    const word = words.find((item) => item.id === id);
    if (!word || !window.confirm(`“${word.english}” kelimesini silmek istiyor musun?`)) return;
    setWords((current) => current.filter((item) => item.id !== id));
    if (editingWord?.id === id) setEditingWord(null);
  }

  return (
    <main>
      <header className="hero">
        <nav className="nav shell" aria-label="Ana menü">
          <a className="brand" href="#top" aria-label="Kelime Defterim ana sayfa">
            <span className="brand-mark" aria-hidden="true">Aa</span>
            <span>Kelime Defterim</span>
          </a>
          <a className="nav-link" href="#kelimeler">Kayıtlı kelimeler</a>
        </nav>

        <div className="hero-content shell" id="top">
          <div className="hero-copy">
            <span className="hero-note">YÖKDİL KELİME ÇALIŞMASI</span>
            <h1>Kelimeleri not et,<br /><em>sonra tekrar dön.</em></h1>
            <p>Çalışırken karşılaştığın kelimeleri anlamları ve örnek cümleleriyle aynı yerde tut.</p>
            <a className="button button-primary hero-button" href="#form-area"><span aria-hidden="true">+</span> Kelime ekle</a>
          </div>

          <div className="character-scene" aria-label="Üç sevimli kelime karakteri">
            <span className="spark spark-one">✦</span>
            <span className="spark spark-two">✦</span>
            <div className="character character-yellow"><span className="character-letter">A</span><span className="character-face">•ᴗ•</span><span className="character-arm left" /><span className="character-arm right" /></div>
            <div className="character character-blue"><span className="character-letter">B</span><span className="character-face">◕‿◕</span><span className="character-arm left" /><span className="character-arm right" /></div>
            <div className="character character-coral"><span className="character-letter">C</span><span className="character-face">•◡•</span><span className="character-arm left" /><span className="character-arm right" /></div>
            <div className="scene-shadow" />
          </div>
        </div>
      </header>

      <div className="shell content-grid">
        <section className="stats" aria-label="Kelime istatistikleri">
          <article><span className="stat-icon stat-total" aria-hidden="true">Aa</span><div><span>Toplam</span><strong>{words.length} kelime</strong></div></article>
          <article><span className="stat-icon stat-learning" aria-hidden="true">•‿•</span><div><span>Öğreniyorum</span><strong>{learningCount} kelime</strong></div></article>
          <article><span className="stat-icon stat-learned" aria-hidden="true">✓</span><div><span>Öğrendim</span><strong>{learnedCount} kelime</strong></div></article>
        </section>

        <div id="form-area" ref={formRef} className="scroll-target">
          <WordForm editingWord={editingWord} onSave={handleSave} onCancel={() => setEditingWord(null)} />
        </div>

        <section id="kelimeler" className="words-section" aria-labelledby="words-title">
          <div className="section-heading list-heading">
            <div><span className="eyebrow">KELİME LİSTESİ</span><h2 id="words-title">Kayıtlı kelimeler</h2></div>
            <span className="result-count">{visibleWords.length} kelime</span>
          </div>
          <WordFilter search={search} status={statusFilter} onSearchChange={setSearch} onStatusChange={setStatusFilter} />
          <WordList words={visibleWords} onEdit={handleEdit} onDelete={handleDelete} />
        </section>
      </div>

      <footer><div className="shell footer-content"><span>Kelime Defterim</span><p>YÖKDİL çalışmaları için kişisel kelime takip uygulaması.</p></div></footer>
    </main>
  );
}
