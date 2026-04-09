import Link from "next/link";
import { useRouter } from "next/router";

const halamanLogin = () => {
  const { push } = useRouter();

  const handleLogin = () => {
    // login logic disini
    // Menyimpan tanda "isLoggedIn" ke dalam browser
    localStorage.setItem("isLoggedIn", "true");

    // Setelah itu, baru pindah ke halaman produk
    push("/produk");
  };

  return (
    <div>
      <h1>Halaman Login</h1>
      {/* Gunakan tombol pertama ini saat melakukan test */}
      <button onClick={handleLogin}>Login</button> <br />
      <button onClick={() => push("/produk")}>Login</button> <br />
      <button onClick={() => handleLogin()}>Login</button> <br />
      <Link
        href="/auth/register"
        style={{ color: "blue", textDecoration: "underline" }}
      >
        Ke Halaman Register
      </Link>
    </div>
  );
};

export default halamanLogin;
