import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";
import { UserContext } from "../Context/UserContext";
import { RefreshContext } from "../App";
import axios from "axios";

function AddSubject({ refresh, setRefresh }) {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: "",
    minMark: Number,
  });

  const [serverError, setServerError] = useState("");
  const [success, SetSuccess] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        name: newUser.name,
        email: newUser.minMark,
      };
      const res = await axios.post(
        "http://localhost:5000/addNewSubject",
        userData
      );
      if (res.data.error == "this subject is already exists") {
        setServerError(res.data.error);
      } else {
        SetSuccess(res.data.message);
        setRefresh(!refresh);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="" className="bg-white  rounded divide-y divide-gray-100 shadow ">
        <div className="tooltip tooltip-info text-white" data-tip="Add Subject">
          <button
            onClick={() => {
              window.my_modal_2.showModal();
            }}
            className="btn bg-white hover:bg-info shadow-lg hover:shadow-xl border-none "
          >
            Add New Subject
          </button>
        </div>
      </div>
      <dialog id="my_modal_2" className="modal">
        <form onSubmit={handleSubmit} method="dialog" className="modal-box">
          <div className="grid grid-cols-1  gap-4 ">
            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text">Subject Name</span>
              </label>
              <input
                placeholder="Math"
                onChange={handleChange}
                type="text"
                name="name"
                className="input input-sm  border-[#70acc7] w-full max-w-xs"
                required
              />
            </div>
            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text">Min Mark</span>
              </label>
              <input
                placeholder="50"
                onChange={handleChange}
                type="Number"
                min={0}
                name="minMark"
                required
                className="input input-sm  border-[#70acc7] w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs mx-auto">
              <button type="submit" className="btn btn-sm btn-primary">
                Add
              </button>
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
          {success && (
            <div
              className="bg-red-100 border-t-4 border-green-400 rounded-b text-green-600 px-4 py-3 shadow-md my-4"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-green-500 mr-4"
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

export default AddSubject;
