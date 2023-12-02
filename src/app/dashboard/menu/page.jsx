import { db } from "@/hooks/firebase";
import { ref, child, get } from "firebase/database";
import { formatData } from "@/hooks/formatData";
import Modal from "@/components/modal";
import FormMenu from "./formMenu";
import Link from "next/link";

export async function getMenu() {
  return new Promise((resolve, reject) => {
    get(child(ref(db), `menu/`))
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
          resolve(data);
        } else {
          reject("No data available");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}


const getMinimalStockCombo = (products, stock) => {
  let min = Infinity;
  for (const item of products) {
    if (stock[item.id].cantidad === 0) {
      return 0;
    }
    const ratio = stock[item.id].cantidad / item.count;
    if (ratio < min) {
      min = ratio;
    }
  }
  return Math.floor(min);
};
export const revalidate = 0;
const Menu = async () => {
  try {
    const menu = await getMenu();
    //const stock = await getStock();
    //
    return (
      <>
        <div className="w-full h-[90vh] flex flex-wrap justify-center items-flex-start gap-10 p-10">
          {menu !== "No data available" &&
            menu.map((item,index) => (
              <Link
                className="w-full md:w-60"
                href={"/dashboard/menu/" + item.id}
                key={index}
              >
                {/* getMinimalStockCombo(formatData(item.products), stock) */}
                <div className="sm:w-60 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.name}{" "}
                    <span className="font-normal text-gray-700 dark:text-gray-400 text-sm">
                      {item.price}$
                    </span>
                  </h2>
                </div>
              </Link>
            ))}
        </div>
        <Modal title="Crear Menu">
          <FormMenu />
        </Modal>
      </>
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
        <Modal title="Nuevo Menu">
          <FormMenu />
        </Modal>
      </div>
    );
  }
};
export default Menu;
