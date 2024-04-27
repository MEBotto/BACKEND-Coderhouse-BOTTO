import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { showToast } from "./utils";

const url = "http://localhost:8080/api";

export function useLogin() {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  return async function (data) {
    try {
      const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = "Something went wrong";

        if (errorData.message) {
          errorMessage = errorData.message;
        }

        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      toast.success(`You've logged in successfully!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setToken(responseData.jwt);
      navigate("/");
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
}

export function useLogout() {
  const navigate = useNavigate();
  const { setToken, setUid, setRole } = useAuth();

  return async function () {
    try {
      const response = await fetch(`${url}/auth/logout`);

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUid(null);
      setRole(null);
      setToken(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
}

export async function registerUser(data) {
  const formData = new FormData();
  if (data && typeof data === "object") {
    for (const key in data) {
      if (key === "confirm_password") {
        continue;
      }
      formData.append(key, data[key]);
    }
  }

  try {
    const response = await fetch(`${url}/auth/register`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = "Something went wrong";

      if (errorData.error && errorData.error.code === 11000) {
        errorMessage = "An account with this email already exists";
      }

      throw new Error(errorMessage);
    }

    toast.success("You've successfully registered!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  } catch (error) {
    toast.error(`${error}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
}

export async function updateUser(data, file, uid, theme) {
  const formData = new FormData();
  if (data && typeof data === "object") {
    for (const key in data) {
      formData.append(key, data[key]);
      if (key === "role") {
        continue;
      }
    }
  }
  formData.append("photo", file);

  try {
    const response = await fetch(`${url}/auth/user/${uid}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = "Something went wrong";

      if (errorData.error) {
        errorMessage = errorData.error;
      }

      throw new Error(errorMessage);
    }

    showToast("success", "Your account was successfully updated!", theme);
  } catch (error) {
    console.error(error);
    showToast("error", `${error}`, theme);
  }
}

export async function createProduct(data, file, token) {
  const formData = new FormData();
  if (data && typeof data === "object") {
    for (const key in data) {
      if (key === "publication_date" && !data[key]) {
        continue;
      }
      if (key === "checkbox") {
        continue;
      }
      formData.append(key, data[key]);
    }
  }
  formData.append("thumbnail", file);

  try {
    const response = await fetch(`${url}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage;

      if (errorData.error) {
        errorMessage = errorData.error;
      } else if (errorData.message) {
        errorMessage = errorData.message;
      }

      throw new Error(errorMessage);
    }

    toast.success("The product was successfully registered!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  } catch (error) {
    console.error(error);
    toast.error(`${error}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
}

export async function createUserCart(uid) {
  const response = await fetch(`${url}/carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: uid }),
  });

  if (!response.ok) {
    throw new Error("Error adding user's cart");
  }

  return await response.json();
}

export async function addProductToCart(cartId, pid) {
  const response = await fetch(`${url}/carts/${cartId}/product/${pid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    let errorMessage;

    if (errorData.error) {
      errorMessage = errorData.error;
    } else if (errorData.message) {
      errorMessage = errorData.message;
    }

    throw new Error(errorMessage);
  }

  toast.success("The product was successfully added to your cart!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}

export async function deleteProduct(pid, token, setUpdate, update) {
  try {
    const response = await fetch(`${url}/products/${pid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    setUpdate(!update);
    toast.success("The product was successfully deleted!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  } catch (error) {
    console.error(error);
    toast.error(`${error}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
}

export async function deleteProductFromCart(cid, pid, update, state) {
  try {
    const response = await fetch(`${url}/carts/${cid}/products/${pid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    toast.success("The product was successfully deleted from cart!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    update(!state);
  } catch (error) {
    console.error(error);
    toast.error(`${error}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
}

export async function updateProductQuantity(
  cid,
  pid,
  quantity,
  loading,
  disabled,
  update,
  state
) {
  try {
    loading(true);
    disabled(true);
    const response = await fetch(`${url}/carts/${cid}/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
      throw new Error("Failed to update quantity");
    }
    loading(false);
    disabled(false);
    update(!state);
    toast.success("The product quantity was successfully updated!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    update(!state);
  } catch (error) {
    console.error("Error updating quantity:", error);
    loading(false);
    disabled(false);
    toast.error(`${error}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
}

export async function purchaseCart(cid, theme) {
  const response = await fetch(`${url}/carts/${cid}/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  showToast("success", "You've successfully purchased the cart!", theme);
}

export async function recoverPassword(email, theme, setIsClicked) {
  const response = await fetch(`${url}/auth/recover-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    let errorMessage = "Something went wrong";

    if (errorData.message) {
      errorMessage = errorData.message;
    }

    throw new Error(errorMessage);
  }

  showToast("success", "The email was sent!", theme);
  setIsClicked(true);
}

export async function newPassword(password, token, theme) {
  const response = await fetch(
    `http://localhost:8080/api/auth/new-password/${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  showToast("success", "Successfully updated password!", theme);
}
