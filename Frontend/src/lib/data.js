export async function fetchProductData(limit, page, query) {
  let url
  if (query) {
    url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=asc&query=${query}`
  } else {
    url = `http://localhost:8080/api/products?limit=${limit}&page=${page}&sort=asc`
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
