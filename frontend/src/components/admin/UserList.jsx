import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { Users as UsersIcon, Phone, MapPin, FileDown, Calendar } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Sidebar from "./Sidebar";
import { getUsers, updateUser } from "../../actions/userAction";
import { clearUserUpdated } from "../../slices/userSlice";
import { EmptyState, TableRowSkeleton, Button } from "../ui";
import { BRAND } from "../../constants/brand";

export default function UserList() {
  const { users = [], loading = true, isUserUpdated } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserUpdated) {
        dispatch(clearUserUpdated());
    }
    dispatch(getUsers);
  }, [dispatch, isUserUpdated]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleContactChange = (id, currentStatus) => {
    dispatch(updateUser(id, { contacted: !currentStatus }));
  };

  const handleProcessChange = (id, newProcess) => {
    dispatch(updateUser(id, { process: newProcess }));
  };

  const downloadUsersPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setTextColor(184, 31, 66);
    doc.text(BRAND.name, 14, 18);

    doc.setFontSize(10);
    doc.setTextColor(90, 90, 90);
    doc.text("Registered Leads / User List", 14, 25);
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 30);

    autoTable(doc, {
      startY: 36,
      head: [["#", "Date", "Name", "Phone", "Address", "Contacted", "Process"]],
      body: users.map((user, index) => [
        index + 1,
        formatDate(user.createdAt),
        user.name || "-",
        user.phone || "-",
        user.address || "-",
        user.contacted ? "Yes" : "No",
        user.process || "Pending",
      ]),
      headStyles: { fillColor: [184, 31, 66] },
      styles: { fontSize: 9, cellPadding: 3 },
      alternateRowStyles: { fillColor: [248, 239, 220] },
    });

    doc.save(`SM_Crackers_Users_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const setUsers = () => {
    const data = {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Date", field: "date", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Phone", field: "Phone", sort: "asc" },
        { label: "Address", field: "Address", sort: "asc" },
        { label: "Contacted", field: "contacted", sort: "asc" },
        { label: "Process", field: "process", sort: "asc" },
      ],
      rows: [],
    };

    users.forEach((user, index) => {
      data.rows.push({
        id: index + 1,
        date: (
          <span className="text-xs font-medium text-ink-600 whitespace-nowrap">
            {formatDate(user.createdAt)}
          </span>
        ),
        name: user.name,
        Phone: user.phone || "-",
        Address: user.address || "-",
        contacted: (
          <button 
            onClick={() => handleContactChange(user._id, user.contacted)}
            className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors shadow-sm ${
              user.contacted 
                ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                : 'bg-red-100 text-red-800 hover:bg-red-200'
            }`}
            title="Click to toggle contacted status"
          >
            {user.contacted ? '✓ Yes' : '✕ No'}
          </button>
        ),
        process: (
          <select
            value={user.process || "Pending"}
            onChange={(e) => handleProcessChange(user._id, e.target.value)}
            className={`text-xs font-semibold rounded-lg px-2.5 py-1 border cursor-pointer outline-none transition-colors shadow-sm ${
              user.process === "Completed"
                ? "bg-emerald-50 text-emerald-800 border-emerald-300 focus:ring-1 focus:ring-emerald-400"
                : user.process === "In Progress"
                ? "bg-blue-50 text-blue-800 border-blue-300 focus:ring-1 focus:ring-blue-400"
                : user.process === "Cancelled"
                ? "bg-stone-100 text-stone-700 border-stone-300 focus:ring-1 focus:ring-stone-400"
                : "bg-amber-50 text-amber-800 border-amber-300 focus:ring-1 focus:ring-amber-400"
            }`}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        )
      });
    });

    return data;
  };

  return (
    <div className="min-h-screen bg-paper-50">
      <Sidebar />

      <main className="p-4 sm:p-6 md:ml-64 lg:p-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink-900">User List</h1>
            <p className="text-sm text-ink-500">
              {loading ? "Loading users…" : `${users.length} registered lead${users.length === 1 ? "" : "s"}`}
            </p>
          </div>
          {!loading && users.length > 0 && (
            <Button variant="gold" size="sm" icon={FileDown} onClick={downloadUsersPDF}>
              Download All Users (PDF)
            </Button>
          )}
        </div>

        {loading ? (
          <div className="card-surface overflow-hidden">
            <table className="w-full">
              <tbody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <TableRowSkeleton key={i} columns={5} />
                ))}
              </tbody>
            </table>
          </div>
        ) : users.length === 0 ? (
          <EmptyState
            icon={UsersIcon}
            title="No users found"
            description="Registered leads will appear here once customers sign up."
          />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block">
              <div className="card-surface overflow-hidden p-3 md:p-5">
                <div className="overflow-x-auto">
                  <MDBDataTable data={setUsers()} bordered striped hover className="text-sm md:text-base" />
                </div>
              </div>
            </div>

            {/* Mobile card fallback */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {users.map((user, index) => (
                <div key={user._id || index} className="card-surface flex items-start gap-3 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-crimson-700">
                    <UsersIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink-900">{user.name}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
                      <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{formatDate(user.createdAt)}</span>
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
                      <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {user.phone || "N/A"}
                    </p>
                    <p className="mt-1 flex items-start gap-1.5 text-sm text-ink-500">
                      <MapPin className="h-3.5 w-3.5 shrink-0 translate-y-0.5" aria-hidden="true" />
                      <span>{user.address || "N/A"}</span>
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-paper-200">
                       <button 
                         onClick={() => handleContactChange(user._id, user.contacted)}
                         className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                           user.contacted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                         }`}
                       >
                         Contacted: {user.contacted ? 'Yes' : 'No'}
                       </button>
                       <div className="flex items-center gap-1.5">
                         <span className="text-xs text-ink-500 font-medium">Process:</span>
                         <select
                           value={user.process || "Pending"}
                           onChange={(e) => handleProcessChange(user._id, e.target.value)}
                           className={`text-xs font-semibold rounded-lg px-2 py-1 border cursor-pointer outline-none ${
                             user.process === "Completed"
                               ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                               : user.process === "In Progress"
                               ? "bg-blue-50 text-blue-800 border-blue-300"
                               : user.process === "Cancelled"
                               ? "bg-stone-100 text-stone-700 border-stone-300"
                               : "bg-amber-50 text-amber-800 border-amber-300"
                           }`}
                         >
                           <option value="Pending">Pending</option>
                           <option value="In Progress">In Progress</option>
                           <option value="Completed">Completed</option>
                           <option value="Cancelled">Cancelled</option>
                         </select>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
