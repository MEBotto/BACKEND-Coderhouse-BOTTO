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
  const url = `http://localhost:8080/api/products?${queryString}`;
  try {
    const response = await fetch(url);
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
