import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

export const HandleClick = async (id) => {
  try {
    const res = await fetch(`${API}/api/book/borrow/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
    } else {
      toast.success(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
