import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/layouts/navbar";
import Link from "next/link"; // 1. Tambahkan import Link di sini

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      {/* Jika kamu ingin memunculkan Navbar, kamu bisa uncomment baris di bawah ini */}
      {/* <Navbar /> */}
      
      <h1>Praktikum Next.js Pages Route</h1> <br />
      <p>Mahasiswa D4 Pengembangan Web</p>

      {/* 2. Tambahkan block navigasi di bawah sini */}
      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link href="/auth/login" style={{ color: 'blue', textDecoration: 'underline' }}>
          
        </Link>
        <Link href="/produk" style={{ color: 'blue', textDecoration: 'underline' }}>
          
        </Link>
        <Link href="/category/baju/pria/kemeja" style={{ color: 'blue', textDecoration: 'underline' }}>
          
        </Link>
      </div>
      {/* ----------------------------------------- */}

    </div>
  );
}