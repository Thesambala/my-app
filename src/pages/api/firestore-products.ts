import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveProducts } from "../../../utils/db/servicefirebase";
import { ProductType } from "../../types/Product.type";

type Data = {
  status: boolean;
  status_code: number;
  data: ProductType[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // Ambil data dari Firestore
    const firestoreData = await retrieveProducts("products");
    
    // Pastikan data sesuai dengan ProductType interface
    const products: ProductType[] = (firestoreData || []).map((item: any) => ({
      id: item.id || "",
      name: item.name || "",
      price: item.price || 0,
      image: item.image || "",
      category: item.category || ""
    }));
    
    res.status(200).json({ 
      status: true, 
      status_code: 200, 
      data: products 
    });
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    res.status(500).json({ 
      status: false, 
      status_code: 500, 
      data: [] 
    });
  }
}