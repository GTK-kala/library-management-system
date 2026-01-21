////////////////// API FOR DELETING MEMBER   ////////////////////////

const API = import.meta.env.VITE_API_URL;

export const DeleteMember = async (member) => {
  try {
    const id = member.id;
    console.log(id);
    const res = await fetch(`${API}/api/admin/deleteMember/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
    } else {
      return console.log(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};
