import type { NextApiRequest, NextApiResponse } from "next";
import { ProductType } from "../../../types/Product.type";

type Data = {
  status: boolean;
  status_code: number;
  data: ProductType | null;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  // Data produk (sama dengan /api/produk)
  const products: ProductType[] = [
    {
      id: "1",
      name: "Sepatu Duramo SL",
      category: "Men's Shoes",
      price: 900000,
      image: "/sepatu-duramo.svg"
    },
    {
      id: "2",
      name: "SEPATU SAMBA OG",
      category: "Men's Shoes",
      price: 2000000,
      image: "/sepatu-samba.svg"
    }
  ];

  // Cari produk berdasarkan ID
  const product = products.find((p) => p.id === id);

  if (product) {
    res.status(200).json({ 
      status: true, 
      status_code: 200, 
      data: product 
    });
  } else {
    res.status(404).json({ 
      status: false, 
      status_code: 404, 
      data: null 
    });
  }
}
