export type WordStatus = "new" | "learning" | "learned";

export interface Word {
  id: string;
  english: string;
  turkish: string;
  category: string;
  example: string;
  status: WordStatus;
  createdAt: number;
}

export type WordFormData = Omit<Word, "id" | "createdAt">;
