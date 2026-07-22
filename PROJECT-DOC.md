# Project Documentation: Platform Asesmen Skill Sistem Informasi

**Versi Dokumen:** 1.0.0  
**Tanggal Update Terakhir:** 22 Juli 2026  
**Pengembang:** Nabil Arif Triyanto (NaApipp)  
**Tech Stack:** Next.js (App Router), React, Tailwind CSS, MongoDB (Mongoose), Vercel  

---

## 1. Pendahuluan

### 1.1 Deskripsi Proyek
Platform Asesmen Skill Sistem Informasi (SI) adalah sebuah aplikasi web interaktif yang dirancang khusus untuk mengukur dan memetakan kecenderungan minat serta bakat mahasiswa SI. Sistem ini mengevaluasi apakah profil kompetensi pengguna lebih dominan pada ranah **Bisnis** atau **Teknologi**. 

Berdasarkan hasil asesmen kuesioner, sistem akan memplot posisi pengguna dalam sebuah kuadran visual dan merekomendasikan jenjang karier (career path) yang relevan dengan profil mereka.

### 1.2 Tujuan Sistem
- Memberikan wawasan yang objektif bagi mahasiswa Sistem Informasi mengenai kelebihan mereka (Business vs. Technical).
- Menyediakan panduan awal yang komprehensif terkait rekomendasi karier profesional di dunia industri IT.
- Mengumpulkan data historis asesmen untuk keperluan analisis lanjutan melalui dashboard admin.

---

## 2. Arsitektur Sistem & Teknologi

Sistem ini dikembangkan menggunakan arsitektur monolitik modern (Fullstack Serverless) dengan rincian teknologi berikut:

- **Frontend:** Next.js (React Framework), TypeScript, Tailwind CSS untuk styling, dan Lucide React untuk ikonografi. Komponen berjalan sebagian besar di sisi client (Client Components) untuk interaktivitas form.
- **Backend (API):** Next.js Route Handlers (`app/api/*`) digunakan sebagai backend ringan untuk memproses logic bisnis, validasi *input* (menggunakan Zod), dan operasi database.
- **Database:** MongoDB (dengan MongoDB Atlas) diintegrasikan menggunakan Mongoose ODM (Object Data Modeling).
- **Deployment:** Vercel (untuk Frontend dan API Serverless Functions).

---

## 3. Fitur Utama

### 3.1 Portal Mahasiswa (User Interface)
- **Registrasi Sesi:** Input Nama Lengkap (tervalidasi huruf dan spasi, maks. 30 karakter) dan NIM (tervalidasi angka, maks. 12 karakter).
- **Kuesioner Dinamis:** Menyajikan pertanyaan pilihan ganda (4 opsi) secara interaktif dengan indikator kemajuan (progress bar).
- **Kalkulasi *Rule-Based*:** Perhitungan bobot skor yang transparan (Bisnis vs Teknologi) berdasarkan opsi yang dipilih, mengonversi bobot menjadi persentase 0-100%.
- **Visualisasi Hasil (Kuadran):** Diagram *scatter plot* yang interaktif untuk memetakan skor ke salah satu dari 4 kuadran: 
  - **Strategis:** Bisnis ≥ 50%, Teknologi < 50%
  - **Visioner:** Bisnis ≥ 50%, Teknologi ≥ 50%
  - **Teknis:** Bisnis < 50%, Teknologi ≥ 50%
  - **Explorer:** Bisnis < 50%, Teknologi < 50%
- **Rekomendasi Karier:** Penawaran *job title* industri yang dipetakan secara khusus sesuai kuadran yang diraih oleh pengguna, dilengkapi dengan deskripsi pekerjaan.

### 3.2 Portal Admin (Dashboard)
- **Manajemen Histori:** Menampilkan rekam jejak pengisian asesmen (skor, identitas, dan waktu) secara tersentralisasi.
- **Pencarian & Filter:** Kemudahan menelusuri data berdasarkan Nama atau NIM.
- **Ekspor Data:** Fitur ekspor histori *submission* ke dalam format CSV/Excel untuk keperluan pelaporan dan analitik eksternal.

---

## 4. Struktur Basis Data (Database Schema)

Sistem menggunakan skema MongoDB (NoSQL) yang dirancang untuk mendukung skalabilitas form kuesioner dan histori evaluasi:

1. **`students_submissions`**
   - Menyimpan seluruh data riwayat pengerjaan mahasiswa.
   - Kolom: `_id`, `nama`, `nim`, `jawaban` (Array referensi), `skorBisnis`, `skorTeknologi`, `kuadran`, `createdAt`.
2. **`questions`**
   - Menyimpan daftar pertanyaan secara dinamis.
   - Kolom: `_id`, `pertanyaan`, `options` (Array objek mengandung `teks`, `bobotBisnis`, `bobotTeknologi`).
3. **`career_recommendations`**
   - Relasi *mapping* kuadran hasil ke rekomendasi pekerjaan yang sesuai.
   - Kolom: `_id`, `kuadran`, `namaKarier`, `deskripsi`, `labelKecocokan`.
4. **`admins`**
   - Menyimpan data autentikasi pengelola platform.
   - Kolom: `_id`, `email`, `passwordHash`.

---

## 5. Alur Data & Logic Sistem

### 5.1 Alur Pengisian & Kalkulasi
1. Pengguna mengisi identitas (Step 1). Validasi dilakukan di *client-side* dan *server-side*.
2. Pengguna mengisi kuesioner (Step 2). Seluruh jawaban disimpan secara lokal dalam *state* React.
3. Saat *submit* (Step 3), sistem menjumlahkan total `bobotBisnis` dan `bobotTeknologi` dari jawaban yang dipilih.
4. Total bobot dibagi dengan skor maksimal absolut dari *seed* pertanyaan untuk mendapatkan nilai persentase bulat (0-100%).
5. Penentuan kuadran terjadi berdasarkan *threshold* garis tengah di poin persentase 50%.
6. *Payload* hasil akhir dikirim melalui REST API (`POST /api/assesment`) untuk direkam secara permanen ke MongoDB.
7. Pengguna dialihkan ke layar Hasil (Step 4) untuk melihat ulasan dan visualisasi.

---

## 6. Panduan Instalasi & Pengembangan (Local Setup)

Untuk menjalankan proyek ini di *local environment*, ikuti langkah-langkah berikut:

### Prasyarat
- Node.js (Versi 18.x atau lebih baru)
- NPM atau Yarn
- Akun MongoDB Atlas (atau MongoDB *local instance*)

### Langkah-langkah
1. **Clone repositori:**
   ```bash
   git clone https://github.com/NaApipp/platform_skillassesment.git
   cd platform_skillassesment
   ```

2. **Instalasi dependencies:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment:**
   Buat file `.env.local` pada *root* direktori proyek dan tambahkan URI koneksi MongoDB Anda:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/namadatabase?retryWrites=true&w=majority
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Aplikasi dapat diakses melalui `http://localhost:3000`.

---

## 7. Penanganan Deployment (Production)

Proyek ini sangat direkomendasikan untuk di-deploy ke **Vercel** karena dukungan penuh dan otomatis terhadap fitur Next.js App Router dan Serverless Functions.

- Tautkan repository GitHub ke akun Vercel.
- Pada pengaturan proyek di Vercel, pastikan untuk mendaftarkan parameter `Environment Variables` (terutama `MONGODB_URI`).
- Pastikan IP Vercel diizinkan (Allowlist / Whitelist `0.0.0.0/0`) pada konfigurasi **Network Access** di MongoDB Atlas.

---

## 8. Pemeliharaan dan Pengembangan Lanjutan

Fitur-fitur yang direkomendasikan untuk pengembangan di masa depan (Fase 2):
1. **Content Management System (CMS) Soal:** Modul di dalam halaman Admin untuk membuat (Create), membaca (Read), mengubah (Update), dan menghapus (Delete) pertanyaan serta bobot opsi secara dinamis tanpa melakukan *re-seed* data.
2. **Autentikasi Terpadu:** Menerapkan standar JWT atau integrasi *Single Sign-On (SSO)* dari universitas/fakultas terkait.
3. **Analitik Mendalam:** Menambahkan fitur grafik demografi keseluruhan mahasiswa, persebaran nilai, dan distribusi kuadran di halaman Admin.

---
*Dokumentasi ini disiapkan untuk memastikan pengembangan berkelanjutan, kemudahan alih serah (handover), dan standardisasi proses engineering.*
