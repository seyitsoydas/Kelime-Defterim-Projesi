import type { Word } from "../interfaces/word";

const STORAGE_KEY = "kelime-defterim-words";

export function getStoredWords(): Word[] | null {
  if (typeof window === "undefined") return null;

  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as Word[]) : null;
  } catch {
    return null;
  }
}

export function saveWords(words: Word[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}
