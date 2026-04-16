// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  status_code: number;
  data: any[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Data statis untuk testing
  const data = [
    {
      id: "1",
      nama: "Kaos Polos",
      harga: 10000,
      ukuran: "L",
      warna: "merah",
      category: "Pakaian Pria"
    },
    {
      id: "2",
      nama: "Kaos Berlengan Panjang",
      harga: 15000,
      ukuran: "M",
      warna: "biru",
      category: "Pakaian Pria"
    },
    {
      id: "3",
      nama: "Kaos Bergambar",
      harga: 20000,
      ukuran: "XL",
      warna: "hitam",
      category: "Pakaian Casual"
    }
  ];

  res.status(200).json({ status: true, status_code: 200, data });
}
