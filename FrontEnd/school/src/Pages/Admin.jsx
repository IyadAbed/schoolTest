import { useContext } from "react";

// import {QuoteForm} from './QuoteForm';

import StudentsTable from "../Component/StudentsTable";
import { RefreshContext } from "../App";
import AddUser from "../Component/AddUser";
import AddSubject from "../Component/AddSubject";
import AssignSubject from "../Component/AssignSubject";
import AssignMark from "../Component/AssignMark";
export default function Admin() {
  // const [refresh,setRefresh]= useState(true)
  const { refresh, setRefresh } = useContext(RefreshContext);
  return (
    <div>
      <main className="p-4 px-8 h-auto pt-20 mt-8">
        <div className="flex justify-center items-center gap-4">
          <AddUser setRefresh={setRefresh} refresh={refresh} />
          <AddSubject setRefresh={setRefresh} refresh={refresh} />
          <AssignSubject setRefresh={setRefresh} refresh={refresh} />
          <AssignMark setRefresh={setRefresh} refresh={refresh} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 mb-4">
          <StudentsTable setRefresh={setRefresh} refresh={refresh} />
        </div>
      </main>
    </div>
  );
}
