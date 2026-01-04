////////////////// API FOR FETCHING USER WITH ACTIVE STATUS ////////////////////////

const API = import.meta.env.VITE_API_URL;

////////// FETCH ACTIVE USERS
export const FetchActiveUsers = async () => {
  try {
    const res = await fetch(`${API}/api/user`);
    const data = await res.json();
    const Data = data.result;
    if (!res.ok) {
      console.log(data.message);
    } else {
      return Data.length;
    }
  } catch (error) {
    console.log(error);
  }
};

/////////////////////////////////////////////////////

/////////// FETCH BOOKS
export const FetchBooks = async () => {
  try {
    const res = await fetch(`${API}/api/books`);
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

///////////////////////////////////////////////////////

/////////// FETCH BOOKS STATUS
export const FetchBooksStatus = async () => {
  try {
    const res = await fetch(`${API}/api/book/status`);
    const data = await res.json();
    const Data = data.result;
    if (!res.ok) {
      console.log(data.message);
    } else {
      const Overdue_Book = Data.filter((book) => book.status === "overdue");
      const Borrowed_Book = Data.filter((book) => book.status === "borrowed");
      const Returned_Book = Data.filter((book) => book.status === "returned");
      return {
        Overdue_Book,
        Borrowed_Book,
        Returned_Book,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
