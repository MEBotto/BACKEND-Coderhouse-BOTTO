import PropTypes from "prop-types";
import CardWrapper from "../../../components/Cards";
import RevenueChart from "../../../components/RevenueChart";
import LatestInvoices from "../../../components/LatestInvoices";

export default function Home({ theme }) {
  return (
    <main
      className={`w-full h-full ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <h1 className="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper theme={theme} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart theme={theme}/>
        <LatestInvoices theme={theme}/>
      </div>
    </main>
  );
}

Home.propTypes = {
  theme: PropTypes.string.isRequired,
};
