import { db } from "@/hooks/firebase";
import { ref, child, get, limitToFirst } from "firebase/database";
import { formatData } from "@/hooks/formatData";
import Modal from "@/components/modal";
import TableCrud from "@/components/tableCrud";
import FormOrder from "./orders/form";

export async function getOrders() {
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
export async function getStock() {
  return new Promise((resolve, reject) => {
    get(child(ref(db), `stock/`))
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

const Dashboard = async () => {
  try {
    const orders = await getOrders();
    const stock = await getStock()
    return (
      <div className="lg:p-10 flex flex-wrap lg:flex-nowrap">
        <section className=" w-full lg:w-3/5">
          <TableCrud props={orders} />
        </section>
        <div className="flex flex-wrap justify-center items-start gap-10 px-5 lg:px-3">
          {stock !== "no data" &&
            stock.map((item) => (
              <div
                className="w-full md:w-48"
                key={item.id}
              >
                <div className="sm:w-48 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.nombre}{" "}
                    <span className="font-normal text-gray-700 dark:text-gray-400 text-sm">
                      {item.peso}
                    </span>
                  </h5>
                  <p 
                  className={item.cantidad<10
                    ?"tracking-tight text-red-600 dark:text-red-600 text-3xl"
                    :"tracking-tight text-gray-900 dark:text-white text-3xl"}>
                    {item.cantidad}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <Modal title="Nuevo Pedido">
          <FormOrder />
        </Modal>
      </div>
    );
  } catch (error) {
    console.error(error);
  }
};
export default Dashboard;
