const url = "http://localhost:8080/api";

export async function fetchProductData(
  limit,
  page,
  query,
  category,
  owner,
  volume
) {
  const params = {
    limit,
    page,
    ...(query && { query }),
    ...(category && { category }),
    ...(owner && { owner }),
    ...(volume && { volume }),
  };

  const queryString = new URLSearchParams(params).toString();
  const urlFetch = `${url}/products?${queryString}`;
  try {
    const response = await fetch(urlFetch);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const { productData } = await response.json();
    return {
      products: productData.payload,
      totalPages: productData.totalPages,
      hasPrevPage: productData.hasPrevPage,
      hasNextPage: productData.hasNextPage,
      docsPerPage: productData.docsPerPage,
      totalDocs: productData.totalDocs,
    };
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export async function fetchUserCart(uid) {
  const response = await fetch(`${url}/carts/user/${uid}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function fetchMessages(token) {
  const response = await fetch(`${url}/messages`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

export async function fetchCardData(token) {
  const numberOfProducts = await fetch(`${url}/products`)
    .then((res) => res.json())
    .then(({ productData }) => productData.totalDocs)
    .catch((error) => console.error("Error fetching data:", error));

  const numberOfCustomers = await fetch(`${url}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then(({ totalDocs }) => totalDocs)
    .catch((error) => console.error("Error fetching data:", error));

  return {
    numberOfCustomers,
    numberOfInvoices: 0,
    totalPaidInvoices: 0,
    numberOfProducts,
  };
}

export async function fetchUser(uid) {
  const response = await fetch(`${url}/users/${uid}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}
