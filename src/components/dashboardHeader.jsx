"use client";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const path = usePathname();
  const routs = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Pedidos", path: "/dashboard/orders" },
    { name: "Menu", path: "/dashboard/menu" },
    { name: "Almacen", path: "/dashboard/stock" },
    { name: "Almacen Pre-Produccion", path: "/dashboard/pre-stock" },
  ];
  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <h1 className="m-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-[#ffc700]">
            Pastichitos
          </span>
        </h1>
        <ul className="flex flex-wrap -mb-px">
          {routs.map((item, index) => (
            <li className="mr-2" key={index}>
              <Link href={item.path}>
                <span
                  className={
                    path == item.path
                      ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                      : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  }
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
          <li className="mr-2">
            <button
              onClick={() => signOut()}
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Salir
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
