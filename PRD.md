# Product Requirements Document (PRD)
## Platform Skill Assessment — Sistem Informasi (Bisnis vs Teknologi)

**Versi:** 1.0
**Tanggal:** 14 Juli 2026
**Status:** Draft — Menunggu Konfirmasi Client
**Tech Stack:** Next.js (Fullstack), MongoDB + Mongoose, Tailwind CSS, Vercel

---

## 1. Latar Belakang

Client membutuhkan sebuah web interaktif untuk mengukur kecenderungan skill awal mahasiswa Sistem Informasi (SI), apakah mereka lebih condong ke arah Bisnis atau Teknologi. Hasil pengukuran ini digunakan untuk memberikan rekomendasi career path yang sesuai dengan profil mahasiswa.

Sistem ini merupakan tahap awal (pilot) yang difokuskan pada jurusan Sistem Informasi. Tidak ada kebutuhan untuk mendukung multi-jurusan pada versi ini.

---

## 2. Tujuan Produk

1. Menyediakan kuesioner asesmen skill berbasis pilihan ganda (4 opsi per pertanyaan) untuk mahasiswa.
2. Menghitung skor kecenderungan Bisnis vs Teknologi menggunakan sistem rule-based (bukan AI/ML).
3. Menampilkan hasil asesmen dalam bentuk visual kuadran, skor persentase, dan rekomendasi karier.
4. Menyediakan dashboard admin untuk memantau seluruh histori pengisian oleh mahasiswa.

---

## 3. Target Pengguna & Role

| Role | Deskripsi | Autentikasi |
|---|---|---|
| Mahasiswa (User) | Mengisi kuesioner dan melihat hasil asesmen miliknya | Tidak perlu login. Cukup input Nama & NIM di awal sesi. |
| Admin | Mengelola dan memantau seluruh data hasil asesmen mahasiswa | Perlu login (lihat Open Decision §8) |

> **Catatan penting:** Mahasiswa boleh mengisi kuesioner berkali-kali tanpa batasan. Ini adalah behavior yang disengaja, bukan bug.

---

## 4. Ruang Lingkup (Scope)

### 4.1 In-Scope

- Form kuesioner multiple choice dinamis (jumlah soal fleksibel, disimpan di database)
- Input identitas (Nama, NIM) sebelum mulai kuesioner
- Progress bar & indikator jumlah soal terjawab
- Perhitungan skor rule-based (Bisnis % vs Teknologi %)
- Halaman hasil: visual kuadran (scatter plot 4 kuadran), ringkasan skor, rekomendasi karier
- Penyimpanan setiap submission ke database (histori, tidak overwrite)
- Dashboard admin dengan flat table seluruh histori submission (tanpa grouping per NIM)
- Export data admin (CSV/Excel) — detail lihat §7.5

### 4.2 Out of Scope (Versi ini)

- Multi-jurusan / multi-kategori expertise selain Bisnis-Teknologi
- Fitur share/download hasil sebagai gambar (story-style) — referensi UI saja, bukan fitur
- Sistem role admin bertingkat (multi-admin dengan permission berbeda)
- Notifikasi email/WhatsApp ke mahasiswa

---

## 5. User Flow

### 5.1 Alur Mahasiswa

1. Mahasiswa membuka landing page → isi Nama & NIM
2. Mulai kuesioner → menjawab N pertanyaan (1 dari 4 opsi per soal), dengan progress bar
3. Submit jawaban
4. Sistem menghitung skor Bisnis % dan Teknologi % secara rule-based
5. Sistem menentukan kuadran berdasarkan threshold 50%-50%
6. Mahasiswa diarahkan ke halaman hasil: kuadran, skor, dan rekomendasi karier
7. Data submission tersimpan permanen di database

### 5.2 Alur Admin

1. Admin login ke dashboard
2. Melihat flat table seluruh histori submission (Nama, NIM, skor Bisnis, skor Teknologi, kuadran, waktu submit)
3. Admin dapat mencari/filter data
4. Admin dapat export data ke CSV/Excel

---

## 6. Logic Perhitungan Skor & Kuadran

### 6.1 Struktur Scoring

- Setiap pertanyaan memiliki 4 opsi jawaban
- Setiap opsi memiliki bobot skor terhadap dua kategori: `bobot_bisnis` dan `bobot_teknologi`
- Bobot disimpan di database per opsi jawaban (fleksibel, tidak hardcode), sehingga dapat disesuaikan tanpa deploy ulang
- Skor akhir dihitung sebagai persentase dari total bobot maksimum yang mungkin dicapai

### 6.2 Penentuan Kuadran (Threshold 50%-50%)

| Kondisi | Kuadran |
|---|---|
| Bisnis ≥ 50% DAN Teknologi < 50% | Strategis |
| Bisnis ≥ 50% DAN Teknologi ≥ 50% | Visioner |
| Bisnis < 50% DAN Teknologi < 50% | Explorer |
| Bisnis < 50% DAN Teknologi ≥ 50% | Teknis |

> **Catatan:** Aturan tie-breaker untuk kasus tepat di angka 50% perlu dikonfirmasi lebih lanjut (lihat §8).

### 6.3 Rekomendasi Karier

Setiap kuadran dipetakan ke daftar rekomendasi posisi karier beserta label kecocokan (misal: "Sangat Sesuai", "Sesuai", "Cukup Sesuai"). Mapping ini disimpan di database agar dapat diubah oleh admin di kemudian hari.

---

## 7. Functional Requirements

### 7.1 Modul Kuesioner (Mahasiswa)

- **FR-1:** Sistem dapat menampilkan form input Nama & NIM sebelum kuesioner dimulai
- **FR-2:** Sistem menampilkan soal secara dinamis dari database (jumlah soal tidak fixed)
- **FR-3:** Sistem menampilkan progress bar berdasarkan jumlah soal terjawab / total soal
- **FR-4:** Sistem memvalidasi bahwa seluruh soal telah dijawab sebelum submit
- **FR-5:** Sistem menyimpan setiap submission sebagai record baru (bukan update/overwrite)

### 7.2 Modul Perhitungan Skor

- **FR-6:** Sistem menghitung skor Bisnis % dan Teknologi % berdasarkan bobot jawaban yang dipilih
- **FR-7:** Sistem menentukan kuadran berdasarkan aturan threshold 50%-50%
- **FR-8:** Sistem mengambil daftar rekomendasi karier berdasarkan kuadran hasil

### 7.3 Modul Hasil (Mahasiswa)

- **FR-9:** Sistem menampilkan visual kuadran (scatter plot) dengan posisi titik user
- **FR-10:** Sistem menampilkan ringkasan skor Bisnis % dan Teknologi % (progress bar)
- **FR-11:** Sistem menampilkan daftar rekomendasi karier beserta label kecocokan

### 7.4 Modul Admin

- **FR-12:** Admin dapat login ke dashboard
- **FR-13:** Admin dapat melihat flat table seluruh histori submission mahasiswa
- **FR-14:** Admin dapat mencari/filter data berdasarkan Nama atau NIM
- **FR-15:** Admin dapat melihat detail hasil skor per submission

### 7.5 Modul Export Data

- **FR-16:** Admin dapat export seluruh data histori ke format CSV/Excel

### 7.6 (Open) Modul Manajemen Soal

- **FR-17 (TBD):** Admin dapat CRUD pertanyaan, opsi jawaban, dan bobot skor — status: belum diputuskan, lihat §8

---

## 8. Open Decisions / TBD

Poin-poin berikut belum diputuskan final oleh client dan perlu dikonfirmasi sebelum atau selama development. PRD ini disusun agar development inti (kuesioner, scoring, hasil, dashboard admin flat table) tetap bisa berjalan tanpa terhambat poin-poin ini.

| # | Topik | Status | Catatan |
|---|---|---|---|
| 1 | Bobot scoring per opsi jawaban | Diserahkan ke developer | Akan didesain fleksibel via database |
| 2 | Jumlah & isi soal final | Belum fix | Skema harus dinamis, jumlah soal tidak hardcode |
| 3 | Soal: CRUD via admin panel atau seed manual | Belum diputuskan | Sementara diasumsikan seed manual dulu untuk MVP; CRUD bisa jadi fase 2 |
| 4 | Metode autentikasi admin | Belum diputuskan | Asumsi awal: JWT-based custom auth (sesuai preferensi client) |
| 5 | Tie-breaker skor tepat 50%-50% | Belum diputuskan | Perlu aturan eksplisit sebelum go-live |

---

## 9. Non-Functional Requirements

- **NFR-1:** Sistem harus responsive (mobile-friendly), mengingat mahasiswa kemungkinan besar mengakses via HP
- **NFR-2:** Waktu respon perhitungan skor & render hasil < 2 detik
- **NFR-3:** Data submission harus tersimpan permanen di MongoDB (Atlas, karena deploy di Vercel)
- **NFR-4:** Halaman admin harus terproteksi dan tidak dapat diakses tanpa autentikasi valid
- **NFR-5:** Tidak ada batasan jumlah submission per mahasiswa (by design)

---

## 10. Entity Relationship Diagram (ERD) — Dasar

### 10.1 Koleksi (Collections) MongoDB

**`students_submission`** (histori submission — flat, tidak grouping)

```js
{
  _id: ObjectId,
  nama: String,
  nim: String,
  jawaban: [
    { questionId: ObjectId, selectedOptionId: ObjectId }
  ],
  skorBisnis: Number,      // persentase 0-100
  skorTeknologi: Number,   // persentase 0-100
  kuadran: String,         // "Strategis" | "Visioner" | "Explorer" | "Teknis"
  createdAt: Date
}
```

**`questions`** (bank soal)

```js
{
  _id: ObjectId,
  pertanyaan: String,
  urutan: Number,
  options: [
    {
      _id: ObjectId,
      teks: String,
      bobotBisnis: Number,
      bobotTeknologi: Number
    }
  ],
  createdAt: Date
}
```

**`career_recommendations`** (mapping kuadran → rekomendasi karier)

```js
{
  _id: ObjectId,
  kuadran: String,          // "Strategis" | "Visioner" | "Explorer" | "Teknis"
  namaKarier: String,
  deskripsi: String,
  labelKecocokan: String,   // "Sangat Sesuai" | "Sesuai" | "Cukup Sesuai"
  urutan: Number
}
```

**`admins`**

```js
{
  _id: ObjectId,
  email: String,
  passwordHash: String,
  createdAt: Date
}
```

### 10.2 Relasi

- `students_submission.jawaban[].questionId` → referensi ke `questions._id`
- `students_submission.jawaban[].selectedOptionId` → referensi ke `questions.options[]._id`
- `students_submission.kuadran` → berelasi logis (bukan foreign key) ke `career_recommendations.kuadran`

---

## 11. Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend + Backend | Next.js (Fullstack — App Router) |
| Database | MongoDB (Atlas, untuk kompatibilitas dengan Vercel) |
| ODM | Mongoose |
| Styling | Tailwind CSS |
| Deployment | Vercel |
| Admin Auth | JWT (asumsi awal — lihat §8) |

---

## 12. Metrik Keberhasilan (Success Metrics)

- Mahasiswa dapat menyelesaikan kuesioner dan melihat hasil tanpa error
- Skor & kuadran yang dihasilkan konsisten dengan bobot yang dikonfigurasi
- Admin dapat melihat dan meng-export seluruh data histori dengan akurat
- Waktu loading halaman hasil < 2 detik pada koneksi standar

---

## 13. Lampiran — Referensi Visual

- **Halaman 1 (Kuesioner):** Referensi UI progress bar, pertanyaan pilihan ganda, tombol navigasi (Sebelumnya/Selanjutnya), tombol Submit
- **Halaman 2 (Hasil Asesmen):** Referensi UI visual kuadran (scatter plot), ringkasan skor per kategori, card rekomendasi karier dengan label kecocokan
- **Gambar tambahan (story-style):** Hanya referensi mood/gaya visual, bukan fitur terpisah pada versi ini