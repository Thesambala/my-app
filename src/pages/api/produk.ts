// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
  // Data produk dengan field lengkap: id, name, category, price, image
  // Data ini akan berkurang untuk menunjukkan perbedaan CSR/SSR vs SSG
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
