import { generateYAxis } from "../lib/utils.js";
import PropTypes from "prop-types";

export default function RevenueChart({ theme }) {
  const revenue = [
    { month: "Jan", revenue: 2000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 2500 },
    { month: "Apr", revenue: 3500 },
    { month: "May", revenue: 4000 },
    { month: "Jun", revenue: 4500 },
    { month: "Jul", revenue: 5000 },
    { month: "Aug", revenue: 5500 },
    { month: "Sep", revenue: 6000 },
    { month: "Oct", revenue: 6500 },
    { month: "Nov", revenue: 7000 },
    { month: "Dec", revenue: 7500 },
  ];
  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>Recent Revenue</h2>
      <div
        className={`rounded-xl ${
          theme === "dark" ? "bg-zinc-900" : "bg-zinc-300"
        } p-4`}
      >
        <div
          className={`mt-0 grid grid-cols-12 items-end gap-2 rounded-md ${
            theme === "dark" ? "bg-color" : "bg-colorLight"
          } p-4 sm:grid-cols-13 md:gap-4`}
          style={{ maxWidth: "100%" }}
        >
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className={`w-full rounded-md ${theme === "dark" ? "bg-mainColor" : "bg-mainColorLight"}`}
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <i className="ri-calendar-line text-xl"></i>
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}

RevenueChart.propTypes = {
  theme: PropTypes.string.isRequired,
};
