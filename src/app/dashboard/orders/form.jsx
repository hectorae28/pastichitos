"use client";
import { ref, child, get, push, set, update } from "firebase/database";
import { db } from "@/hooks/firebase";
import { useEffect, useState } from "react";
import { formatData } from "@/hooks/formatData";
import { usePathname,useRouter } from "next/navigation";
import Link from "next/link";

export default function FormOrder({
  props = { id: "", name: "", phone: "", totalPrice: 0, products: {} },
}) {
  const { id, name, phone, totalPrice, products } = props;
  const [order, setOrder] = useState({ id, name, phone, totalPrice, products });
  const [stock, setStock] = useState(null);
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const pathName = usePathname()
  
  useEffect(() => {
    get(child(ref(db), `menu/`))
      .then((snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          setMenu(data);
        } else {
          setError("Menu No data available");
        }
      })
      .catch((error) => {
        setError(error);
      });
    get(child(ref(db), `stock/`))
      .then((snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          setStock(data);
        } else {
          setError("Stock No data available");
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, []);
  const handleSelected = (id, name, price, isChecked) => {
    if (isChecked == false) {
      setOrder({ ...order });
      const newState = { ...order.products };
      delete newState[id];
      setOrder((prevState) => ({
        ...prevState,
        totalPrice: prevState.totalPrice - price * prevState.products[id].count,
        products: { ...newState },
      }));
    } else {
      setOrder({ ...order });
      setOrder((prevState) => ({
        ...prevState,
        totalPrice:
          isChecked < prevState.products[id]?.count
            ? prevState.totalPrice - price
            : prevState.totalPrice + price,
        products: {
          ...prevState.products,
          [id]: {
            name,
            price,
            count: isChecked == true ? isChecked : parseInt(isChecked),
          },
        },
      }));
    }
  };
  const handleCreate = (e) => {
    e.preventDefault();
    validateStock(order.products, menu, stock)
      .then((total) => {
        push(ref(db, "orders/"), {
          name: order.name,
          phone: order.phone,
          totalPrice: order.totalPrice,
          products: order.products,
          date: new Date().toLocaleString(),
        })
          .then(() => {
            total.map((item) => {
              update(ref(db, `stock/${item.id}`), {
                cantidad: parseInt(
                  stock[item.id].cantidad - item.totalOrderCount
                ),
              })
                .then(() => {
                  setOrder({
                    id: "",
                    name: "",
                    phone: "",
                    totalPrice: 0,
                    products: {},
                  });
                  router.replace(
                    `${pathName}?showDialog=${Math.random() * 10}`
                  );
                })
                .catch((error) => {
                  setError(error);
                });
            });
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        setError(error);
      });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    update(ref(db, `orders/${order.id}`), {
      name: order.name,
      phone: order.phone,
      totalPrice: order.totalPrice,
      products: order.products,
      date: new Date().toLocaleString(),
    })
      .then(() => {
        router.push("/dashboard/orders?showDialog=n");
      })
      .catch((error) => {
        setError(error);
      });
  };
  const validateStock = (Orderproducts, menu, stock) => {
    return new Promise((resolve, reject) => {
      const totalProducts = {};
      formatData(Orderproducts).map((productItem) => {
        formatData(menu[productItem.id].products).map((menuItem, index) => {
          totalProducts[menuItem.id] = {
            ...menuItem,
            totalOrderCount: totalProducts[menuItem.id]
              ? totalProducts[menuItem.id].totalOrderCount +
                productItem.count * menuItem.count
              : productItem.count * menuItem.count,
          };
        });
      });
      formatData(totalProducts).map((item) => {
        if (stock[item.id].cantidad < item.totalOrderCount) {
          reject("no hay suficiente Stock");
        }
      });
      resolve(formatData(totalProducts));
    });
  };
  return (
    <>
      <form
        className="space-y-6"
        onSubmit={order.id === "" ? handleCreate : handleUpdate}
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="nombre"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={order.name}
            onChange={({ target }) =>
              setOrder({ ...order, name: target.value })
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
            type="tel"
            name="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            pattern="[0-9]{4}-[0-9]{7}"
            value={order.phone}
            onChange={({ target }) =>
              setOrder({ ...order, phone: target.value })
            }
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          {formatData(menu).length !== 0 &&
            formatData(menu).map((item) => (
              <div
                key={item.id}
                className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <input
                  type="checkbox"
                  className="w-4 mr-5 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={order.products[item.id]}
                  onChange={(e) =>
                    handleSelected(
                      item.id,
                      item.name,
                      item.price,
                      e.target.checked == true ? 1 : false
                    )
                  }
                />
                <label className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.name}{" "}
                  <span className="font-normal text-gray-700 dark:text-gray-400 text-sm">
                    {item.price}
                  </span>
                </label>
                <br />
                {order.products[item.id] ? (
                  <input
                    type="number"
                    className=" mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Cantidad"
                    value={order.products[item.id].count}
                    min={1}
                    onChange={(e) =>
                      handleSelected(
                        item.id,
                        item.name,
                        item.price,
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
        <p className="text-4xl font-bold text-gray-900 dark:text-white">
          {order.totalPrice}$
        </p>
        <button
          disabled={order.totalPrice == 0}
          type="submit"
          className={
            order.totalPrice == 0
              ? "w-full text-white bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:focus:ring-blue-800"
              : "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          }
        >
          {order.id === "" ? "Crear Pedido" : "Actualizar"}
        </button>
      </form>
      {error !== null && (
        <div
          className=" flex flex-col gap-3 p-4 mt-5 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">¡Error!</span>
          {error}
          <Link
            href={`/dashboard/orders?showDialog=${Math.random() * 10}`}
            className="w-full"
          >
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
