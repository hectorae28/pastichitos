"use client";
import { ref, child, get, push, set, update } from "firebase/database";
import { db } from "@/hooks/firebase";
import { useEffect, useState } from "react";
import { formatData } from "@/hooks/formatData";
import { useRouter } from "next/navigation";

import Link from "next/link";
export default function FormMenu({
  props = { id: "", name: "", price: "", products: {} },
}) {
  const { id, name, price, products } = props;
  const [menu, setMenu] = useState({ id, name, price, products });
  const [stock, setStock] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    get(child(ref(db), `stock/`))
      .then((snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          setStock(formatData(data));
        } else {
          reject("No data available");
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  const handleSelected = (id, name, isChecked) => {
    if (isChecked == false) {
      const newState = { ...menu.products };
      delete newState[id];
      setMenu((prevState) => ({
        ...prevState,
        products: { ...newState },
      }));
    } else {
      setMenu((prevState) => ({
        ...prevState,
        products: {
          ...prevState.products,
          [id]: {
            name,
            count: isChecked == true ? isChecked : parseInt(isChecked),
          },
        },
      }));
    }
  };
  const handleCreate = (e) => {
    e.preventDefault();
    push(ref(db, "menu/"), {
      name: menu.name,
      price: menu.price,
      products: menu.products,
    })
      .then(() => {
        setMenu({ id: "", name: "", price: "", products: {} });
        router.replace(`/dashboard/menu?showDialog=${Math.random() * 10}`);
      })
      .catch((error) => {
        setError(error);
      });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    update(ref(db, `menu/${menu.id}`), {
      name: menu.name,
      price: menu.price,
      products: menu.products,
    })
      .then(() => {
        router.push("/dashboard/menu?showDialog=n");
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <>
      <form
        className="space-y-6"
        onSubmit={menu.id === "" ? handleCreate : handleUpdate}
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="nombre"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={menu.name}
            onChange={({ target }) => setMenu({ ...menu, name: target.value })}
            required
          />
          <label
            htmlFor="nombre"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nombre
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="price"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            min="1"
            value={menu.price}
            onChange={({ target }) =>
              setMenu({ ...menu, price: parseInt(target.value) })
            }
            required
          />
          <label
            htmlFor="price"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Precio
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          {stock !== "no data" &&
            stock.map((item, index) => (
              <div
                key={index}
                className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <input
                  type="checkbox"
                  className="w-4 mr-5 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={menu.products[item.id]}
                  onChange={(e) =>
                    handleSelected(
                      item.id,
                      item.nombre,
                      e.target.checked == true ? 1 : false
                    )
                  }
                />
                <label className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.nombre}{" "}
                  <span className="font-normal text-gray-700 dark:text-gray-400 text-sm">
                    {item.peso}
                  </span>
                </label>
                <br />
                {menu.products[item.id] ? (
                  <input
                    type="number"
                    className=" mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Cantidad"
                    value={menu.products[item.id].count}
                    min={1}
                    onChange={(e) =>
                      handleSelected(
                        item.id,
                        item.nombre,
                        parseInt(e.target.value)
                      )
                    }
                    required
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {menu.id === "" ? "Crear Producto" : "Actualizar"}
        </button>
      </form>
      {error !== null && (
        <div
          className=" flex flex-col gap-3 p-4 mt-5 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">¡Error!</span>
          {error}
          <Link href="/dashboard/stock" className="w-full">
            <button
              type="button"
              className=" w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              regresar
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
