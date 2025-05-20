function getUserRole() {
  try {
    const root = JSON.parse(localStorage.getItem("persist:root"));
    if (!root || !root.auth) return null;

    const auth = JSON.parse(root.auth);
    return auth.role || null;
  } catch (error) {
    console.error("Error reading user role:", error);
    return null;
  }
}

const logoutFunction = () => {
  localStorage.clear();
  window.location.href = '/';
};

export default {
  getUserRole,
  logoutFunction
};
