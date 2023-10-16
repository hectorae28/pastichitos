import { ref, child, get } from "firebase/database";
import { db } from "@/hooks/firebase";
import RemuveButton from "@/components/remuveButton";
import Link from "next/link";
import FormOrder from "../form";

export async function getData(params) {
  return new Promise((resolve, reject) => {
    get(child(ref(db), `orders/${params.slug}`))
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
export const revalidate = 0
const Form = async ({ params }) => {
  try {
    const orders = await getData(params);

    return (
      <div className="mt-10 max-h-full items-center flex flex-wrap justify-center p-10 gap-10">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="px-6 py-6 lg:px-8">
              <div className="flex justify-between items-center">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Actualizar
                </h3>
                <RemuveButton parent="orders" id={params?.slug} />
              </div>
              <FormOrder props={{ id: params.slug, ...orders }} />
            </div>
          </div>
        </div>
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
                <Link href="/dashboard/orders" className="w-full">
                  <button
                    type="button"
                    className=" w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    regresar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Form;