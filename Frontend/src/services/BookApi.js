import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

export const HandleClick = async (id) => {
  try {
    const res = await fetch(`${API}/books/borrow/:${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      toast.error("Error");
    } else {
      toast.success("Ok");
    }
  } catch (error) {
    toast.error("error");
  }
};
