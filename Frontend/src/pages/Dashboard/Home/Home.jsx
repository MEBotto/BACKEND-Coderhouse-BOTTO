import PropTypes from "prop-types";
import { Suspense } from "react";

export default function Home({theme}) {
  return (
    <main className={`w-full h-full p-6 md:p-12 ${theme === "dark" ? "text-white" : "text-black"}`}>
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<div>Loading...</div>}></Suspense>
      </div>
    </main>
  );
}

Home.propTypes = {
  theme: PropTypes.string.isRequired,
};
