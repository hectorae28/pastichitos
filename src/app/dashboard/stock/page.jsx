import { db } from "@/hooks/firebase";
import { ref, child, get } from "firebase/database";
import { formatData } from "@/hooks/formatData";
import Link from "next/link";
import Modal from "@/components/modal";
import { FormStock } from "@/app/dashboard/stock/formStock";

export async function getData() {
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

const Almacen = async () => {
  try {
    const stock = await getData();
    return (
      <section>
        <div className="w-full flex flex-wrap justify-center items-center gap-10 p-10">
          {stock !== "no data" &&
            stock.map((item) => (
              <Link
                className="w-full md:w-60"
                href={"/dashboard/stock/" + item.id}
                key={item.id}
              >
                <div className="sm:w-60 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.nombre}{" "}
                    <span className="font-normal text-gray-700 dark:text-gray-400 text-sm">
                      {item.peso}
                    </span>
                  </h5>
                  <p className="tracking-tight text-gray-900 dark:text-white text-3xl">
                    {item.cantidad}
                  </p>
                </div>
              </Link>
            ))}
        </div>
        <Modal title='Crear Producto'>
          <FormStock />
        </Modal>
      </section>
    );
  } catch (error) {
    console.error("Error al obtener los datos: ", error);
  }
};
export default Almacen;
