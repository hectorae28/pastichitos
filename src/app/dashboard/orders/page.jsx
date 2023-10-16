import { db } from "@/hooks/firebase";
import { ref, child, get } from "firebase/database";
import { formatData } from "@/hooks/formatData";
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
export const revalidate = 0;
const Pedidos = async () => {
  try {
    const orders = await getData();
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
      <div className="mt-10 max-h-full items-center flex justify-center p-10">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="px-6 py-6 lg:px-8">
              <div
                className=" flex flex-col gap-3 p-4 mt-5 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">¡Error!</span>
                {error}
              </div>
            </div>
          </div>
        </div>
        <Modal title="Nuevo Pedido">
          <FormOrder />
        </Modal>
      </div>
    );
  }
};
export default Pedidos;
