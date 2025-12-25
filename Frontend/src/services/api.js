////////////////// API FOR FETCHING USER WITH ACTIVE STATUS ////////////////////////

const API = import.meta.env.VITE_API_URL;

////////// FETCH ACTIVE USERS
const FetchActiveUsers = async () => {
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
export const count_active = FetchActiveUsers();

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

/////////// FETCH BORROWED BOOKS
const FetchBorrowedBooks = async () => {
  try {
    const res = await fetch(`${API}/api/book/status`);
    const data = await res.json();
    const Data = data.result;
    if (!res.ok) {
      console.log(data.message);
    } else {
      const Borrowed_Book = Data.filter((book) => book.status === "borrowed");
      return Borrowed_Book.length;
    }
  } catch (error) {
    console.log(error);
  }
};
export const count_borrowed = FetchBorrowedBooks();

//////////////////////////////////////////////////////////

/////////////// FETCH OVERDUE BOOKS
const FetchOverdueBooks = async () => {
  try {
    const res = await fetch(`${API}/api/book/status`);
    const data = await res.json();
    const Data = data.result;
    if (!res.ok) {
      console.log(data.message);
    } else {
      const Borrowed_Book = Data.filter((book) => book.status === "overdue");
      return Borrowed_Book.length;
    }
  } catch (error) {
    console.log(error);
  }
};
export const count_overdue = FetchOverdueBooks();

/////////////// FETCH RETURNED BOOKS
const FetchReturnedBooks = async () => {
  try {
    const res = await fetch(`${API}/api/book/status`);
    const data = await res.json();
    const Data = data.result;
    if (!res.ok) {
      console.log(data.message);
    } else {
      const Borrowed_Book = Data.filter((book) => book.status === "returned");
      return Borrowed_Book.length;
    }
  } catch (error) {
    console.log(error);
  }
};
export const count_returned = FetchReturnedBooks();
