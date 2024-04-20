import clsx from "clsx";
import PropTypes from "prop-types";

export default function LatestInvoices({ theme }) {
  const latestInvoices = [
    {
      id: 1,
      name: "Customer 1",
      email: "customer1@example.com",
      image_url: "https://example.com/image1.jpg",
      amount: "$100.00",
    },
    {
      id: 2,
      name: "Customer 2",
      email: "customer2@example.com",
      image_url: "https://example.com/image2.jpg",
      amount: "$200.00",
    },
    {
      id: 3,
      name: "Customer 3",
      email: "customer3@example.com",
      image_url: "https://example.com/image3.jpg",
      amount: "$300.00",
    },
    {
      id: 4,
      name: "Customer 4",
      email: "customer4@example.com",
      image_url: "https://example.com/image4.jpg",
      amount: "$400.00",
    },
    {
      id: 5,
      name: "Customer 5",
      email: "customer5@example.com",
      image_url: "https://example.com/image5.jpg",
      amount: "$500.00",
    },
  ];
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`mb-4 text-xl md:text-2xl`}>Latest Invoices</h2>
      <div
        className={`flex grow flex-col justify-between rounded-xl ${
          theme === "dark" ? "bg-zinc-900" : "bg-zinc-300"
        } p-4`}
      >
        <div
          className={`${theme === "dark" ? "bg-color" : "bg-colorLight"} px-6`}
        >
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  }
                )}
              >
                <div className="flex items-center">
                  <img
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p className={`truncate text-sm font-medium md:text-base`}>
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <i className="ri-loop-right-line"></i>
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}

LatestInvoices.propTypes = {
  theme: PropTypes.string.isRequired,
};
