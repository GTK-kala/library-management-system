/////////////////// USER API LOGIC ////////////
const API = import.meta.env.VITE_API_URL;

///////////// GET USER DATA ///////////
export const FetchUserData = async () => {
  try {
    const id = localStorage.getItem("id");
    const API = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API}/api/user/${id}`);
    const data = await res.json();
    const Data = data.result;
    if (!res.ok) {
      console.log(data.message);
    } else {
      return Data;
    }
  } catch (error) {
    console.log(error);
  }
};

////////////// GET BOOK STATUS ///////////
export const GetBookStatus = async () => {
  try {
    const id = localStorage.getItem("id");
    const res = await fetch(`${API}/api/book/status/${id}`);
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
    } else {
      const Data = data.result;
      const Borrowed_Book = Data.filter((book) => book.status === "borrowed");
      const Returned_Book = Data.filter((book) => book.status === "returned");
      return {
        Data,
        Borrowed_Book,
        Returned_Book,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
