import Link from "next/link";
import { formatData } from "@/hooks/formatData";

export default function TableCrud({ props }) {
  return (
    <>
      <div className="hidden lg:block relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="  w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Telefono
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3">
                $
              </th>
              <th scope="col" className="px-6 py-3">
                Productos
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {props !== "No data available" &&
              props.map((item, index) => (
                <tr
                  key={item.id}
                  className={
                    index % 2 == 0
                      ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                      : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                  }
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.phone}</td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">{item.totalPrice}$</td>
                  <td className="px-6 py-4">
                    {
                      <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                        {formatData(item.products).map((productItem, index) => (
                          <li key={index}>
                            {productItem.name}-{productItem.count}
                          </li>
                        ))}
                      </ul>
                    }
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/orders/${item.id}`}
                      className=" flex flex-col items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                      </svg>
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className=" lg:hidden p-5 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          {props.map((item, index) => (
            <div
              key={item.id}
              className={
                index % 2 == 0
                  ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700 flex flex-wrap"
                  : "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700 flex flex-wrap"
              }
            >
              <p scope="row" className="px-6 py-4">
                <span className=" pr-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Nombre:
                </span>
                {item.name}
              </p>
              <p className="px-6 py-4">
                <span className=" pr-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Telefono:
                </span>
                {item.phone}
              </p>
              <p className="px-6 py-4">
                <span className=" pr-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Fecha:
                </span>
                {item.date}
              </p>
              <p className="px-6 py-4">
                <span className=" pr-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Precio Total:
                </span>
                {item.totalPrice}$
              </p>
              <div className="px-6 py-4">
                <span className=" pr-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Productos:
                </span>
                {
                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                    {formatData(item.products).map((productItem, index) => (
                      <li key={index}>
                        {productItem.name}-{productItem.count}
                      </li>
                    ))}
                  </ul>
                }
              </div>
              <p className="px-6 py-4">
                <Link
                  href={`/dashboard/orders/${item.id}`}
                  className=" flex flex-col items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                  </svg>
                  Editar
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
//"border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
