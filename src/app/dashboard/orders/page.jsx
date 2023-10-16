import { db } from "@/hooks/firebase";
import { ref, child, get } from "firebase/database";
import { formatData } from "@/hooks/formatData";
import Link from "next/link";
import Modal from "@/components/modal";
import TableCrud from "@/components/tableCrud";
import FormOrder from "./form";

export async function getData() {
  return new Promise((resolve, reject) => {
    get(child(ref(db), `orders/`))
      .then((snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          resolve(formatData(data));
        } else {
          reject("No data available");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export const revalidate = 0
const Pedidos = async() => {
  try {
    const orders = await getData()
    //console.log(orders)
    return (
      <div className=" lg:py-10 flex w-full flex-col justify-center items-center">
        <div className=" w-full lg:w-3/5">
          <TableCrud props={orders} />
        </div>
        <Modal title="Nuevo Pedido">
          <FormOrder />
        </Modal>
      </div>
    );
  } catch (error) {
    return (
      <div className="w-full">
        <h1>Pedidos</h1>
        {error}
        <TableCrud/>
        <Modal title="Nuevo Pedido">
          <FormOrder/>
        </Modal>
      </div>
    );
  }
};
export default Pedidos;