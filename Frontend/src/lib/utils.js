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

export function getRandomColor(theme) {
  let color;
  do {
    color = "#";
    for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 16).toString(16);
    }
  } while (isColorTooDarkOrLight(color, theme));
  return color;
}

export function isColorTooDarkOrLight(color, theme) {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  if (theme === "dark") {
    return brightness < 128;
  } else {
    return brightness > 200;
  }
}

export function formatDateAndTime(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  let dateString;
  if (isToday) {
    dateString = "Hoy";
  } else if (isYesterday) {
    dateString = "Ayer";
  } else {
    dateString = date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  const timeString = date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { dateString, timeString };
}

export function formatUserName(user, uid) {
  let name;
  if (user && user._id) {
    if (user._id === uid) {
      name = "You";
    } else {
      name = `${user.first_name} ${user.last_name}`;
      name = name.split(" ")[0];
      name =
        name.toLowerCase().charAt(0).toUpperCase() +
        name.slice(1).toLowerCase();
    }
  } else {
    name = "You";
  }
  return name;
}

export function getUserColor(name, theme, userColors, setUserColors) {
  let color = userColors[name];
  if (!color) {
    do {
      color = getRandomColor(theme);
    } while (color === "#000000" || color === "#FFFFFF");
    setUserColors({ ...userColors, [name]: color });
  }
  return color;
}
