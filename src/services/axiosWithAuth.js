import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: token,
    },
    baseURL: "https://potluck-planning-app.herokuapp.com",
  });
};

export default axiosWithAuth;
