"use client";
import { useSearchParams } from 'next/navigation'
import { useRef, useEffect } from 'react'
export default function Modal({ children, title }) {
  const dialogRef = useRef(null);
  const searchParams = useSearchParams();
  const showDialog = searchParams.get("showDialog");
  useEffect(() => {
    if (showDialog === 'y') {
        dialogRef.current?.showModal()
    } else {
        dialogRef.current?.close()
    }
}, [showDialog])

  const closeDialog = () => {
    if (dialogRef.current && typeof dialogRef.current.close === "function") {
      try {
        dialogRef.current?.close();
      } catch (error) {
        console.error("Error al cerrar el diálogo:", error);
      }
    } else {
      console.error("dialogRef.current no es un diálogo:", dialogRef.current);
    }
  };

  const openDialog = () => {
    dialogRef.current?.showModal();
  };
  return (
    <>
      <dialog
        ref={dialogRef}
        className="fixed rounded-lg items-center justify-center w-full max-w-md max-h-full"
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="px-6 py-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                onClick={closeDialog}
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                x
              </button>
            </div>
            {children}
          </div>
        </div>
      </dialog>
      <div className="fixed right-5 bottom-5 items-center justify-center">
        <button
          data-tooltip-target="tooltip-new"
          onClick={openDialog}
          type="button"
          className="inline-flex items-center justify-center w-14 h-14 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
