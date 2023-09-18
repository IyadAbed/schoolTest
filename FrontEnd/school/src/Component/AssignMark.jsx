import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AssignMark({ refresh, setRefresh }) {
  // const navigate = useNavigate();

  const [sellectedSubject, setSellectedSubject] = useState();

  const [subjects, setSubject] = useState([]);

  const [students, setStudent] = useState();

  const [mark, setMark] = useState(Number);

  const [sellectedStuddent, setSellectedStuddent] = useState();

  // const [serverError, setServerError] = useState("");
  // const [success, SetSuccess] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/allUsersInSub")
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [refresh]);

  useEffect(() => {
    sellectedStuddent
      ? axios
          .get(`http://localhost:5000/getUserSubjects/${sellectedStuddent}`)
          .then((response) => {
            setSubject(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          })
      : null;
  }, [sellectedStuddent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stdInfo = {
      studentId: sellectedStuddent,
      subjectId: sellectedSubject,
      mark: mark,
    };
    try {
      const res = await axios.patch(
        "http://localhost:5000/assignMarkToStudent",
        stdInfo
      );
      e.target.reset();
      console.log(res.data);
      setRefresh(!refresh);
      setSellectedStuddent("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="" className="bg-white  rounded divide-y divide-gray-100 shadow ">
        <div className="text-white">
          <button
            onClick={() => {
              window.my_modal_7.showModal();
            }}
            className="btn bg-white hover:bg-[#70acc7] shadow-lg hover:shadow-xl border-none "
          >
            Assign Mark
          </button>
        </div>
      </div>
      <dialog id="my_modal_7" className="modal">
        <form onSubmit={handleSubmit} method="dialog" className="modal-box">
          <div className="grid grid-cols-1  gap-4 ">
            <div className="form-control w-full max-w-xs mx-auto">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select A Student
              </label>
              <select
                onChange={(e) => {
                  setSellectedStuddent(e.target.value);
                }}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected="">Select a Student</option>
                {students?.map(({ name, _id }) => {
                  return (
                    <>
                      <option key={_id} value={_id}>
                        {name}
                      </option>
                      ;
                    </>
                  );
                })}
              </select>
            </div>
            {sellectedStuddent && (
              <>
                <div className="form-control w-full max-w-xs mx-auto">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select A Subject
                  </label>
                  <select
                    onChange={(e) => {
                      setSellectedSubject(e.target.value);
                    }}
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected="">Choose a country</option>
                    {subjects?.map(({ name, _id }) => {
                      return (
                        <>
                          <option key={_id} value={_id}>
                            {name}
                          </option>
                          ;
                        </>
                      );
                    })}
                  </select>
                </div>
              </>
            )}
            {sellectedSubject && (
              <>
                <div className="form-control w-full max-w-xs mx-auto">
                  <label className="label">
                    <span className="label-text">Assign Mark</span>
                  </label>
                  <input
                    placeholder="25"
                    onChange={(e) => {
                      setMark(e.target.value);
                    }}
                    type="Number"
                    min={0}
                    name="Mark"
                    required
                    className="input input-sm  border-[#70acc7] w-full max-w-xs"
                  />
                </div>
              </>
            )}
            <div className="form-control w-full max-w-xs mx-auto">
              <button type="submit" className="btn btn-sm btn-primary">
                Assign
              </button>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2">
                  ✕
                </button>
              </form>
            </div>
          </div>
          {/* {serverError && (
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
                  <p className="font-bold">{success}</p>
                  <p className="text-sm">
                    Make sure you know how these changes affect you.
                  </p>
                </div>
              </div>
            </div>
          )} */}
        </form>
      </dialog>
    </>
  );
}

export default AssignMark;
