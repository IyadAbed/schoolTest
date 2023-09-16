import React, { useContext } from "react";
import TableOfSubject from "../Component/TableOfSubject";
import { UserContext } from "../Context/UserContext";

function StudentPage() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="overflow-x-auto my-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <TableOfSubject />
    </>
  );
}

export default StudentPage;
