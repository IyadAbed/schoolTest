import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AddUser({ refresh, setRefresh }) {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const notifySuccess = (msg) => toast.success(msg);
  // const notifyError = (msg) => toast.error(msg);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const validateForm = () => {
    const errors = {};

    // Perform validation checks
    if (!newUser.name) {
      errors.name = "First name is required";
    }
    if (newUser.name.length < 8) {
      errors.name = "Username must be at least 8 characters long";
    }
    if (!newUser.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+.\S+/.test(newUser.email)) {
      errors.email = "Must be example@test.com";
    }

    if (!newUser.password) {
      errors.password = "password is required";
    } else if (newUser.password.length < 6) {
      errors.password = "Password must contain at least 6 characters";
    } else if (!/^[a-zA-Z0-9!@#$%^&]+$/.test(newUser.password)) {
      errors.password =
        "The password must contain English letters, numbers and special characters";
    } else if (!/\d/.test(newUser.password)) {
      errors.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&]/.test(newUser.password)) {
      errors.password =
        "Password must contain at least one special character (!@#$%^&*).";
    }

    if (newUser.password !== newUser.confirmPassword) {
      errors.re_password = "passwords are not match";
    }
    return setErrors(errors);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    validateForm();
  }, [newUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const userData = {
        name: newUser.name,
        password: newUser.password,
        email: newUser.email,
      };
      const res = await axios.post("http://localhost:5000/addUser", userData);
      if (res.data.error == "this email is already exists") {
        setServerError(res.data.error);
      } else if (res.data.error == "this name is already exists") {
        setServerError(res.data.error);
      } else {
        e.target.reset();
        setRefresh(!refresh);
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <div id="" className="bg-white  rounded divide-y divide-gray-100 shadow ">
        <div className="text-white">
          <button
            onClick={() => {
              window.my_modal_4.showModal();
            }}
            className="btn bg-white hover:bg-[#70acc7] shadow-lg hover:shadow-xl border-none "
          >
            Add New User
          </button>
        </div>
      </div>
      <dialog id="my_modal_4" className="modal">
        <form onSubmit={handleSubmit} method="dialog" className="modal-box">
          <div className="grid grid-cols-1  gap-4 ">
            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                placeholder="Majd Fodeh"
                onChange={handleChange}
                type="text"
                name="name"
                className="input input-sm  border-[#70acc7] w-full max-w-xs"
              />
              {errors.name && (
                <span className=" text-red-600">{errors.name}</span>
              )}
            </div>

            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text">User Email</span>
              </label>
              <input
                placeholder="name@company.com"
                onChange={handleChange}
                type="email"
                name="email"
                className="input input-sm  border-[#70acc7] w-full max-w-xs"
              />
              {errors.email && (
                <span className=" text-red-600">{errors.email}</span>
              )}
            </div>

            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="input input-sm  border-[#70acc7] w-full max-w-xs"
              />
              {errors.password && (
                <span className=" text-red-600">{errors.password}</span>
              )}
            </div>

            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text">confirmPassword</span>
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="input input-sm  border-[#70acc7] w-full max-w-xs"
              />
              {errors.re_password && (
                <span className=" text-red-600">{errors.re_password}</span>
              )}
            </div>
            <div className="form-control w-full max-w-xs mx-auto">
              <button type="submit" className="btn btn-sm btn-primary">
                Add
              </button>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2">
                  ✕
                </button>
              </form>
            </div>
          </div>
          {serverError && (
            <div
              className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md my-4"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-red-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">{serverError}</p>
                  <p className="text-sm">
                    Make sure you know how these changes affect you.
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>
      </dialog>
    </>
  );
}

export default AddUser;
