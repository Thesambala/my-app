# Implementasi Halaman Detail Produk dengan CSR, SSR, dan SSG

## Struktur File

```
src/pages/
├── products/
│   └── [product].tsx          # CSR - Client-Side Rendering
├── produk/
│   ├── index.tsx              # CSR - Daftar Produk
│   ├── [produk].tsx           # SSG - Detail Produk (default)
│   ├── server.tsx             # SSR - Daftar Produk
│   ├── server/
│   │   └── [id].tsx           # SSR - Detail Produk
│   └── static/
│       ├── index.tsx          # SSG - Daftar Produk
│       └── [id].tsx           # SSG - Detail Produk
```

## 1. CSR (Client-Side Rendering)

### Halaman Daftar: `/produk`
- **File**: `src/pages/produk/index.tsx`
- **Metode**: useSWR untuk fetch data di browser
- **Karakteristik**:
  - Data diambil setelah halaman dimuat
  - Ada loading state
  - Data di-cache oleh SWR
  - Cocok untuk data yang sering berubah

### Halaman Detail: `/products/[product]`
- **File**: `src/pages/products/[product].tsx`
- **Metode**: useSWR dengan dynamic route
- **URL**: `http://localhost:3000/products/123`

## 2. SSR (Server-Side Rendering)

### Halaman Daftar: `/produk/server`
- **File**: `src/pages/produk/server.tsx`
- **Metode**: getServerSideProps
- **Karakteristik**:
  - Data diambil di server setiap request
  - Tidak ada loading state
  - Data selalu fresh
  - Cocok untuk data yang perlu selalu update

### Halaman Detail: `/produk/server/[id]`
- **File**: `src/pages/produk/server/[id].tsx`
- **Metode**: getServerSideProps dengan dynamic route
- **URL**: `http://localhost:3000/produk/server/123`

## 3. SSG (Static Site Generation)

### Halaman Daftar: `/produk/static`
- **File**: `src/pages/produk/static/index.tsx`
- **Metode**: getStaticProps
- **Karakteristik**:
  - Data diambil saat build time
  - Halaman di-generate sebagai HTML statis
  - Sangat cepat (served dari CDN)
  - ISR: revalidate setiap 10 detik

### Halaman Detail: `/produk/static/[id]`
- **File**: `src/pages/produk/static/[id].tsx`
- **Metode**: getStaticPaths + getStaticProps
- **URL**: `http://localhost:3000/produk/static/123`

### Halaman Detail Default: `/produk/[produk]`
- **File**: `src/pages/produk/[produk].tsx`
- **Metode**: getStaticPaths + getStaticProps (SSG)
- **URL**: `http://localhost:3000/produk/123`

## Perbandingan

| Aspek | CSR | SSR | SSG |
|-------|-----|-----|-----|
| **Kapan Data Diambil** | Di browser setelah page load | Di server setiap request | Saat build time |
| **Loading State** | Ada (terlihat user) | Tidak ada | Tidak ada |
| **Kecepatan** | Lambat (initial load) | Sedang | Sangat cepat |
| **SEO** | Kurang baik | Sangat baik | Sangat baik |
| **Data Freshness** | Tergantung cache | Selalu fresh | Stale (kecuali ISR) |
| **Server Load** | Rendah | Tinggi | Sangat rendah |
| **Use Case** | Dashboard, data real-time | Profil user, data dinamis | Blog, katalog produk |

## Cara Testing

### 1. Testing CSR
```bash
# Buka browser
http://localhost:3000/produk
# Klik produk untuk detail
http://localhost:3000/products/123
```

### 2. Testing SSR
```bash
# Buka browser
http://localhost:3000/produk/server
# Klik produk untuk detail
http://localhost:3000/produk/server/123
```

### 3. Testing SSG
```bash
# Build terlebih dahulu
npm run build

# Jalankan production server
npm start

# Buka browser
http://localhost:3000/produk/static
# Klik produk untuk detail
http://localhost:3000/produk/static/123
```

## Navigasi Antar Metode

Setiap halaman daftar produk memiliki tombol navigasi untuk berpindah antar metode:
- **CSR** (abu-abu/hitam)
- **SSR** (biru)
- **SSG** (hijau)

## Styling Pembeda

- **CSR**: Background abu-abu (#f5f5f5)
- **SSR**: Background biru muda (#e3f2fd)
- **SSG**: Background hijau muda (#e8f5e9)

## API Endpoint

Semua metode menggunakan endpoint yang sama:
- Daftar produk: `/api/produk`
- Detail produk: `/api/produk/[id]`

## Catatan Penting

1. **SSG memerlukan build** untuk melihat hasil akhir
2. **ISR (Incremental Static Regeneration)** diaktifkan dengan `revalidate: 10` (10 detik)
3. **fallback: false** pada getStaticPaths berarti hanya path yang di-generate yang valid
4. Untuk production, gunakan SSG untuk performa terbaik
5. Gunakan SSR hanya jika data harus selalu fresh
6. CSR cocok untuk aplikasi yang memerlukan interaktivitas tinggi
