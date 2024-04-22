export async function fetchProductData(limit, page, query, category, owner) {
  let url
  if (query && category && owner) {
    url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=asc&query=${query}&category=${category}&owner=${owner}`;
  } else if (query && owner) {
    url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=asc&query=${query}&owner=${owner}`;
  } else if (category && owner) {
    url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=asc&category=${category}&owner=${owner}`;
  } else if (owner) {
    url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=asc&owner=${owner}`;
  } else if (query && category) {
    url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=asc&query=${query}&category=${category}`;
  } else if (query) {
    url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=asc&query=${query}`;
  } else if (category) {
    url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=asc&category=${category}`;
  } else {
    url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=asc`;
  }
  try {
    const response = await fetch(
      url
    );
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
