import { getFirestore, collection, getDocs, Firestore, getDoc, doc } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

// Windsurf: Refactor | Explain | Generate JSDoc | X
export async function retrieveProducts(collectionName: string) {
  console.log("retrieveProducts called with collection:", collectionName);
  const snapshot = await getDocs(collection(db, collectionName));
  console.log("Snapshot size:", snapshot.size);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log("Retrieved products:", data);
  return data;
}

// Windsurf: Refactor | Explain | Generate JSDoc | X
export async function retrieveDataByID(collectionName: string, id: string) {
  console.log("retrieveDataByID called with collection:", collectionName, "id:", id);
  const docRef = doc(db, collectionName, id);
  console.log("Document reference created");
  const snapshot = await getDoc(docRef);
  console.log("Snapshot exists:", snapshot.exists());
  
  if (snapshot.exists()) {
    const data = {
      id: snapshot.id,
      ...snapshot.data(),
    };
    console.log("Document data:", data);
    return data;
  } else {
    console.log("Document not found");
    return null;
  }
}


