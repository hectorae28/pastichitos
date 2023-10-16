import { db } from "@/hooks/firebase";
import { push, ref,onValue } from "firebase/database";
import { formatData } from "@/hooks/formatData";

export async function POST(request) {
  const body = await request.json();
  const { nombre, peso, cantidad } = body;
  createStock(nombre, peso, cantidad);
  return new Response('OK');
}

function createStock(nombre, peso, cantidad) {
  const reference = ref(db, "stock/");
  push(reference, {
    nombre,
    peso,
    cantidad: parseInt(cantidad),
  });
}

export async function GET(request){
  try {
    const data= await getData()
    return Response.json(data)
  } catch (error) {
    return new Response(error)
  }
}
export async function getData() {
  return new Promise((resolve, reject) => {
    const starCountRef = ref(db, "stock");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        resolve(formatData(data));
      } else {
        resolve({ error: "no data" });
      }
    }, (error) => {
      reject(error);
    });
  });
}