# Mukhtashar Al-Hizbul A'zham & Sholawat 40 — Buku Digital (PWA)

## Cara menjalankan
PWA butuh dilayani lewat **http/https**, bukan dibuka langsung sebagai file (`file://`),
karena service worker tidak diizinkan berjalan tanpa server.

**Opsi tercepat (di komputer sendiri):**
```
cd nama-folder-ini
python3 -m http.server 8000
```
lalu buka `http://localhost:8000` di browser HP/laptop (di jaringan Wi-Fi yang sama, ganti
`localhost` dengan IP komputer).

**Opsi hosting gratis (disarankan untuk pemakaian sehari-hari):**
- **GitHub Pages / Cloudflare Pages / Netlify**: upload seluruh isi folder ini (jangan hanya
  `index.html`) ke repo/situs statis, lalu buka URL-nya.
- Setelah dibuka sekali di HP, ketuk tombol **"Pasang"** di menu (☰) atau pilih
  **"Add to Home Screen"** dari menu browser agar muncul sebagai aplikasi mandiri, bisa dibuka
  offline.

## Struktur file
- `index.html`, `style.css`, `app.js`, `data.js` — aplikasi
- `manifest.json`, `sw.js` — konfigurasi PWA & cache offline
- `assets/pages/page-01.jpg … page-76.jpg` — setiap halaman asli buku, dirender sebagai gambar
- `icons/` — ikon aplikasi

## Catatan penting soal teks Arab
File PDF sumber menggunakan font Arab kustom (Uthmanic Script) yang **ToUnicode map-nya rusak**
(dikonfirmasi lewat `pdffonts`) — artinya proses ekstraksi teks otomatis menghasilkan karakter
acak untuk semua teks Arab. Menampilkan ulang teks Arab hasil ekstraksi yang rusak, atau
menerka-nerka susunannya, berisiko salah untuk teks ibadah.

Karena itu, aplikasi ini menampilkan **setiap halaman sebagai gambar hasil scan asli** (render
font tetap benar meski peta teksnya rusak) — sehingga bacaan Arab, tasydid, dan harakatnya
tetap 100% sama persis dengan buku aslinya. Terjemahan Indonesia dan Faidah yang tampil sebagai
teks (di tab "Bagian") sudah diverifikasi dapat diekstrak bersih, dan digunakan sebagai
ringkasan cepat, bukan pengganti halaman aslinya.

Jika suatu saat Anda punya sumber teks Arab yang bersih (mis. dari penerbit/aplikasi digital
resmi), teks itu bisa ditambahkan ke `data.js` agar bisa dicari dan disalin — beri tahu saya
dan saya bantu strukturkan.
