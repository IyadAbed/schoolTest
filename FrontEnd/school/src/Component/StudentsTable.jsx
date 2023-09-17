import { AiOutlineDelete } from "react-icons/ai";
import { IoRefreshSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSolidMessageSquareEdit } from "react-icons/bi";

export default function StudentsTable({ refresh, setRefresh }) {
  const [users, setUsers] = useState([]);
  console.log(users);
  const [userUpdate, setUserUpdate] = useState({
    _id: "",
    name: "",
    email: "",
    Active: Boolean,
  });
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  // get all quotes
  useEffect(() => {
    axios
      .get("http://localhost:5000/allUsers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [refresh]);

  const handleDelete = (id) => {
    Swal.fire({
      title: `Are you sure to delete this User ?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` User was Deleted Successfully`, "", "success");

        axios
          .patch("http://localhost:5000/deleteUser/" + id)
          .then((response) => {
            console.log(response.data);
            setRefresh(!refresh);
          })

          .catch((error) => console.log(error.message));
      } else Swal.fire("Cancel", "", "error");
    });
  };

  const handleUnDelete = (id) => {
    Swal.fire({
      title: `Are you sure to Return this User ?`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire(` User was returned Successfully`, "", "success");

        axios
          .patch("http://localhost:5000/returnUser/" + id)
          .then((response) => {
            console.log(response.data);
            setRefresh(!refresh);
          })

          .catch((error) => console.log(error.message));
      } else Swal.fire("Cancel", "", "error");
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "Active") {
      setUserUpdate((prev) => ({
        ...prev,
        Active: value,
      }));
    } else {
      setUserUpdate((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmitUpdate = async (event) => {
    try {
      event.preventDefault();

      const data = await axios.patch(
        `http://localhost:5000/updateUser/${userUpdate._id}`,
        userUpdate
      );
      notifySuccess("User updated success");
      setRefresh(!refresh);

      console.log("added success", data.data);
    } catch (err) {
      console.log(err);
      notifyError(err.message);
    }
  };

  const tableRows = users.map((users) => {
    return (
      <tr key={users._id} className="border-b ">
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
        >
          {users.name}
        </th>
        <td className="px-4 py-3">{users.email}</td>
        <td className="px-4 py-3">{users.Active ? "Active" : "Not Active"}</td>
        <td className="px-4 py-3">
          {users.isDeleted ? "Deleted" : "Not Deleted"}
        </td>

        <td className="px-4 py-3 flex items-center justify-start gap-2 flex-row-reverse">
          <div
            id=""
            className="bg-white  rounded divide-y divide-gray-100 shadow "
          >
            <div className="tooltip tooltip-info text-white" data-tip="Edit">
              <button
                onClick={() => {
                  window.my_modal_3.showModal();
                  setUserUpdate((prev) => ({
                    ...prev,
                    _id: users._id,
                    name: users.name,
                    email: users.email,
                    Active: users.Active,
                  }));
                }}
                className="btn bg-white hover:bg-info shadow-lg hover:shadow-xl border-none "
              >
                <BiSolidMessageSquareEdit className="text-neutral text-[18px]" />
              </button>
            </div>
          </div>
          <div
            id=""
            className="bg-white  rounded divide-y divide-gray-100 shadow "
          >
            {users.isDeleted ? (
              <>
                <div
                  className="tooltip tooltip-success text-white"
                  data-tip="Restore"
                >
                  <button
                    onClick={() => handleUnDelete(users._id)}
                    className="btn bg-white hover:bg-green-200 shadow-lg hover:shadow-xl border-none "
                  >
                    <IoRefreshSharp className="text-green-500 text-[18px]" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div
                  className="tooltip tooltip-error text-white"
                  data-tip="Delete"
                >
                  <button
                    onClick={() => handleDelete(users._id)}
                    className="btn bg-white hover:bg-red-200 shadow-lg hover:shadow-xl border-none "
                  >
                    <AiOutlineDelete className="text-red-500 text-[18px]" />
                  </button>
                </div>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  });

  console.log(userUpdate);
  return (
    <section className="w-full  mt-5 ">
      <div className="">
        {/* Start coding here */}
        <h1 className="text-[30px] font-bold py-3">User's</h1>
        <div className="bg-white  relative shadow-md sm:rounded-2xl  max-h-[300px]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 table-zebra ">
              <thead className="text-xs text-white uppercase bg-[#70acc7]">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    UserName
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Active
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Deleted
                  </th>

                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.length === 0 ? (
                  <div className="p-3 text-lg">There are no User's</div>
                ) : (
                  tableRows
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <form
          onSubmit={handleSubmitUpdate}
          method="dialog"
          className="modal-box"
        >
          <div className="grid grid-cols-1  gap-4 ">
            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Type here"
                className="input input-sm  border-[#70acc7] w-full max-w-xs"
                value={userUpdate.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text">User Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Type here"
                className="input input-sm  border-[#70acc7] w-full max-w-xs"
                value={userUpdate.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                <span className="label-text">
                  Activation Status:{" "}
                  {userUpdate.Active ? "Active" : "Not Active"}
                </span>
              </label>
              <select
                className="select select-bordered"
                name="Active"
                value={userUpdate.Active} // Set the selected value from state
                onChange={handleChange} // Handle activation status change
              >
                <option value={true}>Activate</option>
                <option value={false}>Deactivate</option>
              </select>
            </div>

            <div className="form-control w-full max-w-xs mx-auto">
              <button type="submit" className="btn btn-sm btn-primary">
                update
              </button>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2">
                  ✕
                </button>
              </form>
            </div>
          </div>
        </form>
      </dialog>
    </section>
  );
}
