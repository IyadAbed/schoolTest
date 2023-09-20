import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { UserContext } from "../Context/UserContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function Login() {
  const [userInfo, setNewUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  let { setAuth, refresh } = useContext(AuthContext);
  let { userRefresh, user } = useContext(UserContext);

  const [errors, setErrors] = useState({});
  const [serverDataErrors, setServerDataErrors] = useState({
    emailError: "",
    passwordError: "",
    InActive: "",
  });

  const validateForm = () => {
    const errors = {};

    if (!userInfo.email) {
      errors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      errors.email = "Must be example@test.com";
    }
    if (!userInfo.password) {
      errors.password = "password is required";
    }
    return errors;
  };

  useEffect(() => {
    validateForm();
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const res = await axios.post("http://localhost:5000/log", userInfo);
      if (res.data.error == "email not found") {
        setServerDataErrors({
          ...serverDataErrors,
          emailError: res.data.error,
        });
      } else if (res.data.error == "Invallid password") {
        setServerDataErrors({
          ...serverDataErrors,
          passwordError: res.data.error,
        });
      } else if (res.data.error == "InActive") {
        setServerDataErrors({
          ...serverDataErrors,
          InActive: res.data.error,
        });
      } else {
        localStorage.setItem("token", res.data.Tok);
        userRefresh();
        // setTimeout(() => {
        //   refresh();
        //   setAuth(true);
        //   navigate("/");
        // }, "500");
        setTimeout(async () => {
          // await setDoc(doc(db, "users", user?._id + user._id), {
          //   uid: user?._id + user._id,
          //   name: user.name,
          //   email: user.email,
          // });
          // await setDoc(doc(db, "userChats", user?._id + user._id), {});
          refresh();
          setAuth(true);
          navigate("/");
        }, "500");
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                  <div>
                    {errors.email && (
                      <span className="text-danger">{errors.email}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <div>
                    {errors.email && (
                      <span className="text-danger">{errors.password}</span>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to={"/registration"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
                {serverDataErrors.emailError && (
                  <div
                    className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
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
                        <p className="font-bold">
                          {serverDataErrors.emailError}
                        </p>
                        <p className="text-sm">
                          Make sure you know how these changes affect you.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {serverDataErrors.passwordError && (
                  <div
                    className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
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
                        <p className="font-bold">
                          {serverDataErrors.passwordError}
                        </p>
                        <p className="text-sm">
                          Make sure you know how these changes affect you.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {serverDataErrors.InActive && (
                  <div
                    className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
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
                        <p className="font-bold">{serverDataErrors.InActive}</p>
                        <p className="text-sm">
                          Make sure you know how these changes affect you.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
