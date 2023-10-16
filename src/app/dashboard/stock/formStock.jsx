"use client";
import { push, ref, set, update } from "firebase/database";
import { db } from "@/hooks/firebase";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function FormStock({
  props = { id: "", nombre: "", peso: "", cantidad: '' },
}) {
  const { id, nombre, peso, cantidad } = props;
  const [stock, setStock] = useState({ id, nombre, peso, cantidad });
  const [error, setError] = useState(null);
  const router = useRouter();
  const handleUpdate = (e) => {
    e.preventDefault();
    set(ref(db, `stock/${stock.id}`), {
      nombre: stock.nombre,
      peso: stock.peso,
      cantidad: parseInt(stock.cantidad),
    })
      .then(() => {
        router.push("/dashboard/stock?showDialog=n");
      })
      .catch((error) => {
        setError(error);
      });
  };
  const handleCreate = (e) => {
    e.preventDefault();
    push(ref(db, "stock/"), {
      nombre: stock.nombre,
      peso: stock.peso,
      cantidad: parseInt(stock.cantidad),
    })
      .then(() => {
        setStock({ id: "", nombre: "", peso: "", cantidad: '' })
        router.replace(`/dashboard/stock?showDialog=${Math.random()*10}`);
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <>
      <form
        className="space-y-6"
        onSubmit={stock.id === "" ? handleCreate : handleUpdate}
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="nombre"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={stock.nombre}
            onChange={({ target }) =>
              setStock({ ...stock, nombre: target.value })
            }
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
            type="text"
            name="peso"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={stock.peso}
            onChange={({ target }) =>
              setStock({ ...stock, peso: target.value })
            }
            required
          />
          <label
            htmlFor="peso"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Peso
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="cantidad"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            min='0'
            value={stock.cantidad}
            onChange={({ target }) =>
              setStock({ ...stock, cantidad: target.value })
            }
            required
          />
          <label
            htmlFor="peso"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Cantidad 
          </label>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {stock.id === "" ? "Crear Producto" : "Actualizar"}
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

export function ProductionStock({props}){
  const {id,cantidad}= props
  const [stock, setStock] = useState({ id, cantidadSuma:'' });
  const [error, setError] = useState(null);
  const router = useRouter();
  const handleProduction = (e) => {
    e.preventDefault();
    const totalCount=parseInt(cantidad) + parseInt(stock.cantidadSuma)
    update(ref(db, `stock/${stock.id}`), {
      cantidad: parseInt(totalCount),
    })
      .then(() => {
        router.push("/dashboard/stock?showDialog=n");
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <>
      <form
        className="space-y-6 h-44 flex flex-col justify-between"
        onSubmit={handleProduction}
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="number"
            name="cantidad"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            min='0'
            value={stock.cantidadSuma}
            onChange={({ target }) =>
              setStock({ ...stock, cantidadSuma: target.value })
            }
            required
          />
          <label
            htmlFor="peso"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Cantidad = {cantidad}
          </label>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sumar Produccion
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
