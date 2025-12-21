////////////////// API FOR FETCHING USER WITH ACTIVE STATUS ////////////////////////

const FetchUsers = async () => {
  try {
    const url = `https://library-management-system-production-27d8.up.railway.app/api/user`;
    const res = await fetch(url);
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
