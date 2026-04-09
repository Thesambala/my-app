import { useRouter } from 'next/router';

export default function Category() {
  const router = useRouter();
  // Mengambil array 'slug' dari URL
  const { slug } = router.query;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Detail Kategori</h1>
      <p>Berikut adalah parameter URL yang ditangkap:</p>
      
      {/* Menampilkan array parameter dalam bentuk list */}
      <ul>
        {slug ? (
          slug.map((param, index) => (
            <li key={index}>{param}</li>
          ))
        ) : (
          <li>Memuat parameter...</li>
        )}
      </ul>
    </div>
  );
}