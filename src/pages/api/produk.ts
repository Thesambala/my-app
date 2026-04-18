// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

type Data = {
  status: boolean;
  status_code: number;
  data: Product[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Data produk dengan field lengkap: id, name, category, price, image
  const data: Product[] = [
    {
      id: "1",
      name: "Sepatu Duramo SL",
      category: "Men's Shoes",
      price: 900000,
      image: "/sepatu-duramo.svg"
    },
    {
      id: "2",
      name: "Sepatu Samba OG",
      category: "Men's Shoes",
      price: 2000000,
      image: "/sepatu-samba.svg"
    },
    {
      id: "3",
      name: "Kaos Bergambar",
      category: "Pakaian Casual",
      price: 20000,
      image: "/kaos.svg"
    },
    {
      id: "4",
      name: "Kemeja Formal",
      category: "Pakaian Formal",
      price: 50000,
      image: "/kemeja.svg"
    },
    {
      id: "5",
      name: "Jaket Hoodie",
      category: "Pakaian Casual",
      price: 75000,
      image: "/jaket.svg"
    }
  ];

  res.status(200).json({ status: true, status_code: 200, data });
}
