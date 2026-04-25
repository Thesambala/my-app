// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  retrieveDataByID,
  retrieveProducts,
} from "../../../utils/db/servicefirebase";

// Windsurf: Refactor | Explain
type Data = {
  status: boolean;
  status_code: number;
  data: any;
};

// Data statis untuk testing
const staticProducts = [
  {
    id: "123",
    name: "Sepatu Kasogi",
    price: 500000,
    category: "sepatu lari",
    image: "/sepatu-duramo.svg"
  },
  {
    id: "456",
    name: "Baju Polo",
    price: 100000,
    category: "pakaian casual",
    image: "/kaos.svg"
  },
  {
    id: "789",
    name: "Sepatu Duramo SL",
    price: 900000,
    category: "men's shoes",
    image: "/sepatu-duramo.svg"
  }
];

// Windsurf: Refactor | Explain | Generate JSDoc | X
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    // Jika ada parameter produk (route: /api/produk/[id])
    if (req.query.produk![1]) {
      const productId = req.query.produk![1];
      
      // Coba cari di data statis dulu
      let data: any = staticProducts.find(p => p.id === productId);
      
      // Jika tidak ada di data statis, coba dari Firestore
      if (!data) {
        data = await retrieveDataByID("products", productId);
      }
      
      if (data) {
        res.status(200).json({ status: true, status_code: 200, data });
      } else {
        res.status(404).json({ status: false, status_code: 404, data: null });
      }
      return;
    } else {
      // Return semua produk (gabungan statis + Firestore)
      const firestoreProducts = await retrieveProducts("products");
      const allProducts = [...staticProducts, ...firestoreProducts];
      res.status(200).json({ status: true, status_code: 200, data: allProducts });
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ 
      status: false, 
      status_code: 500, 
      data: null 
    });
  }
}
