import { useRouter } from 'next/router';

const BlogDetailPage = () => {
  const { query } = useRouter();

  return (
    <div>
      <h1>Detail Blog</h1>
      <p>Menampilkan konten untuk blog dengan slug: <strong>{query.slug}</strong></p>
    </div>
  );
};

export default BlogDetailPage;