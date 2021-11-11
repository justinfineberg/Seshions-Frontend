import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initalInput = {
  username: "",
  password: "",
};

function Login(props) {
  const [formValues, setFormValues] = useState(initalInput);
  const { push } = useHistory();

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const loginValues = {
      username: formValues.username,
      password: formValues.password,
    };
    axios
      .post(
        "https://potluck-planning-app.herokuapp.com/api/auth/login",
        loginValues
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-white w-2/3 m-auto mt-5 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <div className="mb-4">
        <p className="text-xl mb-6"> Please Login </p>
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          name="username"
          type="text"
          placeholder="Username"
          value={formValues.username}
          onChange={onChange}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          name="password"
          type="password"
          placeholder="******************"
          value={formValues.password}
          onChange={onChange}
        />
        <button
          onClick={onSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </button>
      </div>
      <div className="flex items-center justify-between"></div>
    </div>
  );
}

export default Login;
