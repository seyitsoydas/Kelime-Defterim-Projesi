# Kelime Defterim

İngilizce kelimeleri kaydetmek ve öğrenme durumunu takip etmek için React ile hazırlanmış bir web uygulamasıdır.

## Özellikler

- Kelime ekleme
- Kelimeleri listeleme ve arama
- Kelime bilgilerini güncelleme
- Kelime silme
- Öğrenme durumuna göre filtreleme
- LocalStorage ile verileri tarayıcıda saklama
- Telefon ve bilgisayara uyumlu tasarım

## Kullanılan Teknolojiler

- React
- TypeScript
- Vite
- Pure CSS
- LocalStorage

## Klasör Yapısı

```text
src/
├── components/
│   ├── WordCard.tsx
│   ├── WordFilter.tsx
│   ├── WordForm.tsx
│   └── WordList.tsx
├── interfaces/
│   └── word.ts
├── pages/
│   └── HomePage.tsx
├── utils/
│   └── storage.ts
├── App.tsx
├── index.css
└── main.tsx
```

## Bilgisayarda Çalıştırma

Önce Node.js kurulmalıdır. Ardından proje klasörü VS Code ile açılır ve terminalde aşağıdaki komutlar çalıştırılır:

```bash
npm install
npm run dev
```

Terminalde gösterilen yerel adres tarayıcıda açılır.

## Veri Saklama

Eklenen kelimeler tarayıcının LocalStorage alanına kaydedilir. Sayfa yenilendiğinde kelimeler kaybolmaz.
