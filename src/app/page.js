import Link from "next/link";
import { redirect } from "next/navigation";
export default function Home() {
  redirect("/dashboard");
  /* return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          404
        </span>{" "}
        <br /> En Constuccion
      </h1>
      <Link href='/dashboard'>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Admin
        </button>
      </Link>
    </main>
  ); */
}
