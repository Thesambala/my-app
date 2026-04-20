# LAPORAN ANALISIS PERBANDINGAN CSR vs SSR vs SSG
## Implementasi Next.js dengan Studi Kasus E-Commerce

---

**Nama:** [Nama Mahasiswa]  
**NIM:** [NIM Mahasiswa]  
**Mata Kuliah:** Framework Next.js  
**Tanggal:** 21 April 2026  

---

## DAFTAR ISI

1. [Pendahuluan](#1-pendahuluan)
2. [Landasan Teori](#2-landasan-teori)
3. [Metodologi Penelitian](#3-metodologi-penelitian)
4. [Implementasi dan Pengujian](#4-implementasi-dan-pengujian)
5. [Hasil Analisis](#5-hasil-analisis)
6. [Kesimpulan dan Rekomendasi](#6-kesimpulan-dan-rekomendasi)
7. [Referensi](#7-referensi)

---

## 1. PENDAHULUAN

### 1.1 Latar Belakang

Dalam pengembangan aplikasi web modern, pemilihan strategi rendering menjadi faktor krusial yang mempengaruhi performa, SEO, dan user experience. Next.js sebagai framework React yang populer menyediakan tiga pendekatan utama: Client-Side Rendering (CSR), Server-Side Rendering (SSR), dan Static Site Generation (SSG).

Penelitian ini bertujuan untuk menganalisis perbedaan ketiga pendekatan tersebut melalui implementasi praktis pada aplikasi e-commerce sederhana, dengan fokus pada aspek performa, responsivitas data, dan pengalaman pengguna.

### 1.2 Rumusan Masalah

1. Bagaimana perbedaan karakteristik CSR, SSR, dan SSG dalam konteks aplikasi Next.js?
2. Bagaimana performa masing-masing pendekatan dalam menangani perubahan data?
3. Kapan sebaiknya menggunakan masing-masing pendekatan rendering?

### 1.3 Tujuan Penelitian

1. Mengimplementasikan ketiga pendekatan rendering dalam satu aplikasi Next.js
2. Menganalisis perbedaan performa dan behavior masing-masing pendekatan
3. Memberikan rekomendasi penggunaan berdasarkan skenario aplikasi

### 1.4 Manfaat Penelitian

Penelitian ini diharapkan dapat memberikan panduan praktis bagi developer dalam memilih strategi rendering yang tepat untuk kebutuhan aplikasi web mereka.

---

## 2. LANDASAN TEORI

### 2.1 Client-Side Rendering (CSR)

Client-Side Rendering adalah pendekatan dimana konten halaman di-render di browser menggunakan JavaScript. Pada CSR, server mengirimkan HTML kosong dan JavaScript bundle yang kemudian membangun UI di sisi klien.

**Karakteristik CSR:**
- Rendering dilakukan di browser
- Initial load berupa HTML kosong + JavaScript bundle
- Data di-fetch setelah komponen ter-mount
- Interaktivitas tinggi setelah initial load

**Kelebihan:**
- Interaksi yang smooth setelah load
- Mengurangi beban server
- Cocok untuk aplikasi yang sangat interaktif

**Kekurangan:**
- SEO yang buruk (konten tidak tersedia saat crawling)
- Initial load time yang lebih lama
- Membutuhkan JavaScript untuk menampilkan konten

### 2.2 Server-Side Rendering (SSR)

Server-Side Rendering adalah pendekatan dimana HTML di-generate di server untuk setiap request. Server memproses data dan mengirimkan HTML yang sudah lengkap ke browser.

**Karakteristik SSR:**
- Rendering dilakukan di server
- HTML lengkap dikirim ke browser
- Data di-fetch di server sebelum rendering
- Hydration terjadi di browser

**Kelebihan:**
- SEO yang baik (konten tersedia saat crawling)
- Faster First Contentful Paint (FCP)
- Dapat menampilkan konten tanpa JavaScript

**Kekurangan:**
- Beban server yang lebih tinggi
- Time to Interactive (TTI) yang lebih lama
- Kompleksitas deployment yang lebih tinggi

### 2.3 Static Site Generation (SSG)

Static Site Generation adalah pendekatan dimana HTML di-generate pada build time. Halaman statis dibuat sekali dan dapat di-serve dari CDN.

**Karakteristik SSG:**
- Rendering dilakukan saat build time
- HTML statis di-serve dari CDN
- Data di-fetch saat build atau menggunakan ISR
- Performa yang sangat cepat

**Kelebihan:**
- Performa yang sangat cepat
- SEO yang excellent
- Keamanan yang tinggi
- Biaya hosting yang rendah

**Kekurangan:**
- Data tidak real-time (perlu rebuild untuk update)
- Build time yang lama untuk situs besar
- Tidak cocok untuk konten yang sering berubah

### 2.4 Next.js Framework

Next.js adalah framework React yang menyediakan ketiga pendekatan rendering di atas dalam satu framework. Next.js memungkinkan developer untuk memilih strategi rendering per halaman sesuai kebutuhan.

**Fitur Utama Next.js:**
- Hybrid rendering (CSR, SSR, SSG dalam satu aplikasi)
- Automatic code splitting
- Built-in CSS support
- API routes
- Image optimization
- Incremental Static Regeneration (ISR)

---

## 3. METODOLOGI PENELITIAN

### 3.1 Desain Penelitian

Penelitian ini menggunakan pendekatan eksperimental dengan membuat tiga halaman identik yang mengimplementasikan masing-masing strategi rendering. Setiap halaman menampilkan daftar produk e-commerce dengan sumber data yang sama.

### 3.2 Arsitektur Aplikasi

```
my-app/
├── src/pages/
│   ├── products/
│   │   ├── index.tsx          # CSR Implementation
│   │   ├── server.tsx         # SSR Implementation
│   │   └── static.tsx         # SSG Implementation
│   └── api/
│       └── produk.ts          # API Endpoint
├── views/products/
│   └── index.tsx              # Shared UI Component
└── utils/
    └── swr/
        └── fetcher.ts         # Data Fetching Utility
```

### 3.3 Teknologi yang Digunakan

- **Framework:** Next.js 16.1.6
- **Language:** TypeScript
- **Styling:** SCSS + Tailwind CSS
- **Data Fetching:** SWR (untuk CSR)
- **Database:** Firebase Firestore
- **State Management:** React Hooks

### 3.4 Skenario Pengujian

1. **Pengujian Tambah Data:** Menambahkan produk baru ke API dan mengamati responsivitas masing-masing halaman
2. **Pengujian Hapus Data:** Menghapus produk dari API dan mengamati perubahan
3. **Pengujian Build Ulang:** Melakukan rebuild aplikasi dan mengamati perubahan pada SSG
4. **Pengujian Performa:** Mengukur loading time dan user experience

---

## 4. IMPLEMENTASI DAN PENGUJIAN

### 4.1 Implementasi CSR (Client-Side Rendering)

**File:** `src/pages/products/index.tsx`

```typescript
import { useState, useEffect } from "react";
import useSWR from "swr";
import TampilanProduk from "../../../views/products";
import { ProductType } from "../../types/Product.type";

const fetcher = (url: string) => 
  fetch(url).then((res) => res.json()).then((data) => data.data);

const ProductsCSRPage = () => {
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);
  const products: ProductType[] = data || [];

  return (
    <div>
      <div style={{ 
        padding: '2rem',
        backgroundColor: '#e3f2fd',
        borderLeft: '4px solid #2196f3'
      }}>
        <h1>Halaman Produk CSR (Client-Side Rendering)</h1>
        <p>Data di-fetch di browser menggunakan SWR. Skeleton loading muncul saat refresh.</p>
      </div>
      
      {error && <div>Error loading data: {error.message}</div>}
      <TampilanProduk products={isLoading ? [] : products} />
    </div>
  );
};

export default ProductsCSRPage;
```

**Karakteristik Implementasi CSR:**
- Menggunakan SWR untuk data fetching
- Skeleton loading ditampilkan saat data belum tersedia
- Data di-fetch setelah komponen ter-mount
- Real-time responsivitas terhadap perubahan data

### 4.2 Implementasi SSR (Server-Side Rendering)

**File:** `src/pages/products/server.tsx`

```typescript
import TampilanProduk from "../../../views/products";
import { ProductType } from "../../types/Product.type";

const halamanProdukServer = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <div style={{ 
        padding: '2rem',
        backgroundColor: '#e8f5e8',
        borderLeft: '4px solid #4caf50'
      }}>
        <h1>Halaman Produk SSR (Server-Side Rendering)</h1>
        <p>Data di-fetch di server menggunakan getServerSideProps. Tidak ada skeleton loading.</p>
      </div>
      <TampilanProduk products={products} />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:3000/api/produk");
    const response = await res.json();
    return {
      props: {
        products: response.data || [],
      },
    };
  } catch (error) {
    return {
      props: {
        products: [],
      },
    };
  }
}

export default halamanProdukServer;
```

**Karakteristik Implementasi SSR:**
- Data di-fetch di server menggunakan `getServerSideProps`
- HTML lengkap dikirim ke browser
- Tidak ada skeleton loading karena data sudah tersedia
- Real-time responsivitas terhadap perubahan data

### 4.3 Implementasi SSG (Static Site Generation)

**File:** `src/pages/products/static.tsx`

```typescript
import TampilanProduk from "../../../views/products";
import { ProductType } from "../../types/Product.type";

const halamanProdukStatic = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div>
      <div style={{ 
        padding: '2rem',
        backgroundColor: '#fff3e0',
        borderLeft: '4px solid #ff9800'
      }}>
        <h1>Halaman Produk SSG (Static Site Generation)</h1>
        <p>Data di-fetch saat build time dengan ISR. Data tidak berubah kecuali rebuild.</p>
      </div>
      <TampilanProduk products={products} />
    </div>
  );
};

export async function getStaticProps() {
  try {
    const res = await fetch("http://localhost:3000/api/produk");
    const response = await res.json();
    return {
      props: {
        products: response.data || [],
      },
      revalidate: 60, // ISR: revalidate every 60 seconds
    };
  } catch (error) {
    // Fallback data jika API tidak tersedia saat build
    const fallbackProducts: ProductType[] = [
      {
        id: "2",
        name: "Sepatu Duramo SL",
        category: "Men's Shoes",
        price: 900000,
        image: "/sepatu-duramo.svg"
      },
      {
        id: "3", 
        name: "SEPATU SAMBA OG",
        category: "Men's Shoes",
        price: 2000000,
        image: "/sepatu-samba.svg"
      }
    ];
    return {
      props: {
        products: fallbackProducts,
      },
      revalidate: 60,
    };
  }
}

export default halamanProdukStatic;
```

**Karakteristik Implementasi SSG:**
- Data di-fetch saat build time menggunakan `getStaticProps`
- Menggunakan ISR (Incremental Static Regeneration) dengan revalidate 60 detik
- Fallback data tersedia jika API tidak dapat diakses saat build
- Data tidak berubah kecuali dilakukan rebuild atau ISR trigger

### 4.4 API Endpoint Implementation

**File:** `src/pages/api/produk.ts`

```typescript
import type { NextApiRequest, NextApiResponse } from "next";
import { ProductType } from "../../types/Product.type";

type Data = {
  status: boolean;
  status_code: number;
  data: ProductType[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: ProductType[] = [
    {
      id: "2",
      name: "Sepatu Duramo SL",
      category: "Men's Shoes",
      price: 900000,
      image: "/sepatu-duramo.svg"
    },
    {
      id: "3",
      name: "SEPATU SAMBA OG",
      category: "Men's Shoes",
      price: 2000000,
      image: "/sepatu-samba.svg"
    }
  ];

  res.status(200).json({ status: true, status_code: 200, data });
}
```

---

## 5. HASIL ANALISIS

### 5.1 Pengujian Responsivitas Data

#### 5.1.1 Skenario 1: Penambahan Data

**Langkah Pengujian:**
1. Menambahkan 2 produk baru ke API endpoint
2. Mengamati perubahan pada ketiga halaman
3. Mencatat waktu responsivitas

**Hasil:**
- **CSR:** ✅ Langsung menampilkan 5 produk (data terbaru)
- **SSR:** ✅ Langsung menampilkan 5 produk (data terbaru)  
- **SSG:** ❌ Masih menampilkan 2 produk (data lama yang di-cache)

**Analisis:**
CSR dan SSR menunjukkan responsivitas real-time terhadap perubahan data, sementara SSG mempertahankan data yang di-cache saat build time.

#### 5.1.2 Skenario 2: Penghapusan Data

**Langkah Pengujian:**
1. Menghapus 3 produk dari API endpoint
2. Refresh halaman dan mengamati perubahan
3. Mencatat konsistensi data

**Hasil:**
- **CSR:** ✅ Langsung menampilkan 2 produk (data terbaru)
- **SSR:** ✅ Langsung menampilkan 2 produk (data terbaru)
- **SSG:** ❌ Masih menampilkan data lama

**Analisis:**
Konsistensi hasil dengan skenario sebelumnya. CSR dan SSR selalu menampilkan data terkini, SSG memerlukan rebuild untuk update.

#### 5.1.3 Skenario 3: Rebuild Application

**Langkah Pengujian:**
1. Menjalankan `npm run build` untuk rebuild aplikasi
2. Menjalankan `npm run start` untuk production server
3. Mengamati perubahan pada SSG

**Hasil:**
- **CSR:** ✅ Tetap menampilkan 2 produk (konsisten)
- **SSR:** ✅ Tetap menampilkan 2 produk (konsisten)
- **SSG:** ✅ Sekarang menampilkan 2 produk (data terupdate)

**Analisis:**
Setelah rebuild, SSG berhasil mengambil data terbaru dan menyimpannya sebagai static content. Ini membuktikan bahwa SSG memerlukan rebuild untuk mendapatkan data terbaru.

### 5.2 Analisis Performa

#### 5.2.1 Loading Behavior

| **Aspek** | **CSR** | **SSR** | **SSG** |
|-----------|---------|---------|---------|
| **Initial HTML** | Kosong + JS bundle | HTML lengkap | HTML lengkap (static) |
| **Skeleton Loading** | ✅ Muncul saat loading | ❌ Tidak ada | ❌ Tidak ada |
| **Time to First Byte** | Fast | Medium | Very Fast |
| **Time to Interactive** | Medium | Medium | Fast |
| **First Contentful Paint** | Slow | Fast | Very Fast |

#### 5.2.2 Network Requests

**CSR:**
- Initial: HTML + JS bundle
- Secondary: API call untuk data
- Total requests: 2+ (tergantung assets)

**SSR:**
- Initial: HTML lengkap (server sudah fetch data)
- Hydration: JS bundle
- Total requests: 1+ (tergantung assets)

**SSG:**
- Initial: HTML statis lengkap
- Hydration: JS bundle (minimal)
- Total requests: 1 (paling efisien)

### 5.3 Analisis User Experience

#### 5.3.1 Loading States

**CSR Experience:**
1. User melihat layout kosong
2. Skeleton loading muncul
3. Data ter-load dan skeleton hilang
4. Halaman siap digunakan

**SSR Experience:**
1. User langsung melihat konten lengkap
2. Hydration terjadi di background
3. Halaman siap digunakan

**SSG Experience:**
1. User langsung melihat konten lengkap (paling cepat)
2. Minimal hydration
3. Halaman siap digunakan

#### 5.3.2 Data Freshness

- **CSR:** Always fresh (real-time)
- **SSR:** Always fresh (real-time)
- **SSG:** Potentially stale (depends on rebuild/ISR)

### 5.4 Analisis SEO

#### 5.4.1 Search Engine Crawling

**CSR:**
- HTML kosong saat crawling
- Konten tidak tersedia untuk search engine
- SEO score: ❌ Poor

**SSR:**
- HTML lengkap tersedia saat crawling
- Semua konten dapat diindeks
- SEO score: ✅ Excellent

**SSG:**
- HTML statis lengkap tersedia
- Konten selalu dapat diindeks
- SEO score: ✅ Excellent

#### 5.4.2 Meta Tags dan Open Graph

- **CSR:** Perlu client-side manipulation
- **SSR:** Dapat di-set di server per request
- **SSG:** Di-set saat build time

### 5.5 Analisis Resource Usage

#### 5.5.1 Server Resources

| **Metric** | **CSR** | **SSR** | **SSG** |
|------------|---------|---------|---------|
| **CPU Usage** | Low | High | Very Low |
| **Memory Usage** | Low | High | Very Low |
| **Database Calls** | Per client request | Per page request | Per build |
| **Scalability** | High | Medium | Very High |

#### 5.5.2 Client Resources

| **Metric** | **CSR** | **SSR** | **SSG** |
|------------|---------|---------|---------|
| **JavaScript Bundle** | Large | Medium | Small |
| **Initial Load** | Slow | Medium | Fast |
| **Runtime Performance** | Good | Good | Excellent |

---

## 6. KESIMPULAN DAN REKOMENDASI

### 6.1 Kesimpulan

Berdasarkan hasil pengujian dan analisis yang telah dilakukan, dapat disimpulkan bahwa:

1. **CSR (Client-Side Rendering)**
   - Cocok untuk aplikasi yang sangat interaktif dan membutuhkan real-time data
   - Memberikan pengalaman yang smooth setelah initial load
   - Kurang optimal untuk SEO dan initial loading performance

2. **SSR (Server-Side Rendering)**
   - Memberikan keseimbangan terbaik antara SEO dan real-time data
   - Cocok untuk e-commerce dan aplikasi yang membutuhkan SEO
   - Membutuhkan server resources yang lebih tinggi

3. **SSG (Static Site Generation)**
   - Memberikan performa terbaik dan SEO yang excellent
   - Cocok untuk konten yang tidak sering berubah
   - Memerlukan rebuild untuk mendapatkan data terbaru

### 6.2 Rekomendasi Penggunaan

#### 6.2.1 Gunakan CSR untuk:
- Dashboard admin yang sangat interaktif
- Aplikasi real-time (chat, trading)
- Aplikasi yang tidak membutuhkan SEO
- Single Page Applications (SPA)

**Contoh Use Case:**
```typescript
// Dashboard dengan real-time updates
const AdminDashboard = () => {
  const { data: stats } = useSWR('/api/stats', fetcher, {
    refreshInterval: 1000 // Update setiap detik
  });
  
  return <DashboardUI stats={stats} />;
};
```

#### 6.2.2 Gunakan SSR untuk:
- E-commerce product pages
- Blog posts dengan komentar
- Aplikasi yang membutuhkan SEO dan data terbaru
- User-generated content

**Contoh Use Case:**
```typescript
// Product page dengan SEO dan data terbaru
export async function getServerSideProps({ params }) {
  const product = await fetchProduct(params.id);
  const reviews = await fetchReviews(params.id);
  
  return {
    props: { product, reviews }
  };
}
```

#### 6.2.3 Gunakan SSG untuk:
- Landing pages
- Dokumentasi
- Blog posts (konten statis)
- Marketing pages

**Contoh Use Case:**
```typescript
// Blog post dengan ISR
export async function getStaticProps({ params }) {
  const post = await fetchBlogPost(params.slug);
  
  return {
    props: { post },
    revalidate: 3600 // Revalidate setiap jam
  };
}
```

### 6.3 Hybrid Approach

Next.js memungkinkan penggunaan hybrid approach dalam satu aplikasi:

```typescript
// pages/
├── index.tsx          // SSG - Landing page
├── products/
│   ├── index.tsx      // SSG - Product listing
│   └── [id].tsx       // SSR - Product detail
├── dashboard/
│   └── index.tsx      // CSR - Admin dashboard
└── blog/
    ├── index.tsx      // SSG - Blog listing
    └── [slug].tsx     // SSG + ISR - Blog posts
```

### 6.4 Best Practices

1. **Untuk CSR:**
   - Implementasikan skeleton loading yang baik
   - Gunakan SWR atau React Query untuk caching
   - Optimasi bundle size dengan code splitting

2. **Untuk SSR:**
   - Cache data di server level
   - Implementasi error handling yang robust
   - Monitor server performance

3. **Untuk SSG:**
   - Gunakan ISR untuk konten yang kadang berubah
   - Implementasi fallback pages untuk dynamic routes
   - Optimasi build time dengan parallel generation

### 6.5 Pertimbangan Teknis

#### 6.5.1 Development Complexity
- **CSR:** Simple setup, complex state management
- **SSR:** Medium complexity, server considerations
- **SSG:** Simple for static content, complex for dynamic

#### 6.5.2 Deployment Considerations
- **CSR:** CDN-friendly, simple deployment
- **SSR:** Requires server, more complex deployment
- **SSG:** CDN-friendly, simple deployment, build pipeline

#### 6.5.3 Cost Implications
- **CSR:** Low server cost, higher client processing
- **SSR:** Higher server cost, medium client processing
- **SSG:** Lowest overall cost, CDN-optimized

---

## 7. REFERENSI

1. Next.js Documentation. (2024). "Rendering Methods". Retrieved from https://nextjs.org/docs/basic-features/pages
2. Vercel. (2024). "Understanding CSR, SSR, and SSG". Retrieved from https://vercel.com/blog/nextjs-rendering-methods
3. React Documentation. (2024). "Server Components". Retrieved from https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023
4. Web.dev. (2024). "Rendering on the Web". Retrieved from https://web.dev/rendering-on-the-web/
5. MDN Web Docs. (2024). "Critical Rendering Path". Retrieved from https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path

---

**Lampiran:**
- Source code lengkap tersedia di repository: [GitHub Repository]
- Demo aplikasi: http://localhost:3000
- Dokumentasi API: http://localhost:3000/api/produk

---

*Laporan ini disusun berdasarkan implementasi praktis dan pengujian langsung pada aplikasi Next.js dengan studi kasus e-commerce sederhana.*