////////////////// API FOR FETCHING USER WITH ACTIVE STATUS ////////////////////////

////////// FETCH ACTIVE USERS
const FetchActiveUsers = async () => {
  try {
    const url_site = `https://library-management-system-production-27d8.up.railway.app/api/user`;
    const url_local = `http://localhost:3001/api/user`;
    const res = await fetch(url_local);
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

/////////// FETCH BORROWED BOOKS
const FetchBorrowedBooks = async () => {
  try {
    const url_site = `https://library-management-system-production-27d8.up.railway.app/api/book/borrowed`;
    const url_local = `http://localhost:3001/api/book/status`;
    const res = await fetch(url_local);
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

/////////////// FETCH OVERDUE BOOKS
const FetchOverdueBooks = async () => {
  try {
    const url_site = `https://library-management-system-production-27d8.up.railway.app/api/book/borrowed`;
    const url_local = `http://localhost:3001/api/book/status`;
    const res = await fetch(url_local);
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
