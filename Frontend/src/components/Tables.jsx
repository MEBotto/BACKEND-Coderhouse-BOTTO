import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { fetchProductData, fetchUserData } from "../lib/data.js";
import { deleteProduct, deleteUser } from "../lib/actions.js";
import { formatDateAndTime } from "../lib/utils.js";
import useAuth from "../hooks/useAuth.js";
import { Link } from "react-router-dom";

export function ProductsTable({ query, currentPage, theme, limit, owner }) {
  const [products, setProducts] = useState(null);
  const [update, setUpdate] = useState(false);
  const { token } = useAuth();
  useEffect(() => {
    if (owner) {
      fetchProductData(limit, currentPage, query, null, owner)
        .then((data) => {
          if (data && data.products) {
            setProducts(data.products);
          } else {
            console.error("Failed to fetch product data");
          }
        })
        .catch((error) => console.error("An error occurred:", error));
    } else {
      fetchProductData(limit, currentPage, query)
        .then((data) => {
          if (data && data.products) {
            setProducts(data.products);
          } else {
            console.error("Failed to fetch product data");
          }
        })
        .catch((error) => console.error("An error occurred:", error));
    }
  }, [query, currentPage, limit, owner, update]);

  const handleDelete = async (pid) => {
    await deleteProduct(pid, token, setUpdate, update);
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div
          className={`rounded-lg ${
            theme === "dark"
              ? "bg-zinc-900 text-white"
              : "bg-zinc-300 text-black"
          } p-2 md:pt-0`}
        >
          <div className="md:hidden">
            {products?.map((product) => (
              <div
                key={product._id}
                className={`mb-2 w-full rounded-md ${
                  theme === "dark" ? "bg-color" : "bg-colorLight"
                } p-4`}
              >
                <div
                  className={`flex items-center justify-between border-b ${
                    theme === "dark" ? "border-zinc-900" : "border-zinc-300"
                  } pb-4`}
                >
                  <div>
                    <div className="mb-2 flex items-center">
                      <img
                        src={product.thumbnail}
                        className="mr-2 w-[28px]"
                        alt={`${product.title}'s product picture`}
                      />
                      <p>{product.title}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                      theme === "dark"
                        ? "bg-mainColor text-black"
                        : "bg-mainColorLight text-white"
                    }`}
                  >
                    Created By: {product.owner}
                  </span>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {product.stock} available
                    </p>
                    <p>${product.price}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/dashboard/products/${product._id}`}
                      className={`rounded-md border p-2 ${
                        theme === "dark"
                          ? "hover:bg-mainColor hover:text-black text-white border-zinc-900"
                          : "hover:bg-mainColorLight hover:text-white text-black border-zinc-300"
                      }`}
                    >
                      <i className="ri-pencil-line text-xl" />
                    </Link>
                    <button
                      className={`rounded-md border p-2 ${
                        theme === "dark"
                          ? "hover:bg-mainColor hover:text-black text-white border-zinc-900"
                          : "hover:bg-mainColorLight hover:text-white text-black border-zinc-300"
                      }`}
                      onClick={() => handleDelete(product._id)}
                    >
                      <i className="ri-delete-bin-line text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table
            className={`hidden min-w-full ${
              theme === "dark" ? "text-white" : "text-black"
            } md:table`}
          >
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title & Image
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Code
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Owner
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Stock
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody
              className={`${theme === "dark" ? "bg-color" : "bg-colorLight"}`}
            >
              {products?.map((product) => (
                <tr
                  key={product._id}
                  className={`w-full border-b py-3 text-sm ${
                    theme === "dark" ? "border-zinc-900" : "border-zinc-300"
                  } last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg`}
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.thumbnail}
                        className="w-[32px] h-[48px]"
                        alt={`${product.title}'s product picture`}
                      />
                      <p>{product.title}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.code}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.owner}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.stock}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    ${product.price}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <Link
                        to={`/dashboard/products/${product._id}`}
                        className={`rounded-md border p-2 ${
                          theme === "dark"
                            ? "hover:bg-mainColor hover:text-black text-white border-zinc-900"
                            : "hover:bg-mainColorLight hover:text-white text-black border-zinc-300"
                        }`}
                      >
                        <i className="ri-pencil-line text-xl" />
                      </Link>
                      <button
                        className={`rounded-md border p-2 ${
                          theme === "dark"
                            ? "hover:bg-mainColor hover:text-black text-white border-zinc-900"
                            : "hover:bg-mainColorLight hover:text-white text-black border-zinc-300"
                        }`}
                        onClick={() => handleDelete(product._id)}
                      >
                        <i className="ri-delete-bin-line text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function UsersTable({ query, currentPage, theme, limit }) {
  const [users, setUsers] = useState(null);
  const [update, setUpdate] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchUserData(limit, currentPage, query, token)
      .then((data) => {
        if (data && data.users) {
          console.log("cambio")
          setUsers(data.users);
        } else {
          console.error("Failed to fetch user data");
        }
      })
      .catch((error) => console.error("An error occurred:", error));
  }, [query, currentPage, limit, token, update]);

  const handleDelete = async (uid) => {
    await deleteUser(uid, token, theme, setUpdate, update)
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div
          className={`rounded-lg ${
            theme === "dark"
              ? "bg-zinc-900 text-white"
              : "bg-zinc-300 text-black"
          } p-2 md:pt-0`}
        >
          <div className="md:hidden">
            {users?.map((user) => {
              const { dateString, timeString } = formatDateAndTime(
                user.last_connection
              );
              return (
                <div
                  key={user._id}
                  className={`mb-2 w-full rounded-md ${
                    theme === "dark" ? "bg-color" : "bg-colorLight"
                  } p-4`}
                >
                  <div
                    className={`flex items-center justify-between border-b ${
                      theme === "dark" ? "border-zinc-900" : "border-zinc-300"
                    } pb-4`}
                  >
                    <div>
                      <div className="mb-2 flex items-center">
                        <img
                          src={user.photo}
                          className="mr-2 rounded-full w-[48px]"
                          alt={`${user.title}'s product picture`}
                        />
                        <p>
                          {user.first_name} {user.last_name}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        theme === "dark"
                          ? "bg-mainColor text-black"
                          : "bg-mainColorLight text-white"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">{user.email}</p>
                      <p>
                        {dateString} {timeString}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/dashboard/users/${user._id}`}
                        className={`rounded-md border p-2 ${
                          theme === "dark"
                            ? "hover:bg-mainColor hover:text-black text-white border-zinc-900"
                            : "hover:bg-mainColorLight hover:text-white text-black border-zinc-300"
                        }`}
                      >
                        <i className="ri-pencil-line text-xl" />
                      </Link>
                      <button
                        className={`rounded-md border p-2 ${
                          theme === "dark"
                            ? "hover:bg-mainColor hover:text-black text-white border-zinc-900"
                            : "hover:bg-mainColorLight hover:text-white text-black border-zinc-300"
                        }`}
                        onClick={() => handleDelete(user._id)}
                      >
                        <i className="ri-delete-bin-line text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <table
            className={`hidden min-w-full ${
              theme === "dark" ? "text-white" : "text-black"
            } md:table`}
          >
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name & Avatar
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Role
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Last Connection
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody
              className={`${theme === "dark" ? "bg-color" : "bg-colorLight"}`}
            >
              {users?.map((user) => {
                const { dateString, timeString } = formatDateAndTime(
                  user.last_connection
                );
                return (
                  <tr
                    key={user._id}
                    className={`w-full border-b py-3 text-sm ${
                      theme === "dark" ? "border-zinc-900" : "border-zinc-300"
                    } last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg`}
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.photo}
                          className="w-[48px] rounded-full"
                          alt={`${user.first_name}'s user picture`}
                        />
                        <p>{user.first_name} {user.last_name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">{user.email}</td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {user.role}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {dateString} {timeString}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <Link
                          to={`/dashboard/users/${user._id}`}
                          className={`rounded-md border p-2 ${
                            theme === "dark"
                              ? "hover:bg-mainColor hover:text-black text-white border-zinc-900"
                              : "hover:bg-mainColorLight hover:text-white text-black border-zinc-300"
                          }`}
                        >
                          <i className="ri-pencil-line text-xl" />
                        </Link>
                        <button
                          className={`rounded-md border p-2 ${
                            theme === "dark"
                              ? "hover:bg-mainColor hover:text-black text-white border-zinc-900"
                              : "hover:bg-mainColorLight hover:text-white text-black border-zinc-300"
                          }`}
                          onClick={() => handleDelete(user._id)}
                        >
                          <i className="ri-delete-bin-line text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

UsersTable.propTypes = {
  query: PropTypes.string,
  currentPage: PropTypes.number,
  theme: PropTypes.string,
  limit: PropTypes.number,
};

ProductsTable.propTypes = {
  query: PropTypes.string,
  currentPage: PropTypes.number,
  theme: PropTypes.string,
  limit: PropTypes.number,
  owner: PropTypes.string,
};
