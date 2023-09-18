import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";

function TableOfSubject() {
  const { user } = useContext(UserContext);
  const [subjects, setSubjects] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getUserSubjects/${user?._id}`)
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [user]);

  return (
    <>
      <div className="flex flex-col mt-24">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Pass Mark
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Mark Obtained
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subjects?.map((subject) => (
                    <tr
                      key={subject._id}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        {subject.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {subject.minMark}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {subject.students.find((s) => s.student === user._id)
                          ?.Mark || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TableOfSubject;
