////////////////// API FOR FETCHING USER WITH ACTIVE STATUS ////////////////////////

const FetchUsers = async () => {
  try {
    const url_site = `https://library-management-system-production-27d8.up.railway.app/api/user`;
    const url_local = `http://localhost:3001/api/user`;
    const res = await fetch(url_local);
    const data = res.json();
    if (!res.ok) {
      console.log(data.message);
    } else {
      return data.result;
    }
  } catch (error) {
    console.log(error);
  }
};

export const count = FetchUsers();
