import { toast, Bounce } from "react-toastify";

export function generateYAxis(revenue) {
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
}

export function generatePagination(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      2,
      " ...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    " ...",
    totalPages,
  ];
}

export function showToast(type, message, theme) {
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme === "dark" ? "light" : "dark",
    transition: Bounce,
  };

  if (type === "success") {
    toast.success(message, toastOptions);
  } else if (type === "error") {
    toast.error(message, toastOptions);
  }
}

export function calculateTotalPrice(products) {
  return products.reduce((total, product) => {
    return total + product.productId.price * product.quantity;
  }, 0);
}

export function calculateTotalQuantity(products) {
  return products.reduce((total, product) => {
    return total + product.quantity;
  }, 0);
}
