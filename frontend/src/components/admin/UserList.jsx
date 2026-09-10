import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { Users as UsersIcon, Phone, MapPin, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Sidebar from "./Sidebar";
import { getUsers } from "../../actions/userAction";
import { EmptyState, TableRowSkeleton, Button } from "../ui";
import { BRAND } from "../../constants/brand";

export default function UserList() {
  const { users = [], loading = true } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  // Fetch on mount so /admin/users works directly, not only after visiting
  // the Dashboard (which happened to dispatch the same getUsers action).
  useEffect(() => {
    dispatch(getUsers);
  }, [dispatch]);

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
      head: [["#", "Name", "Phone", "Address"]],
      body: users.map((user, index) => [
        index + 1,
        user.name || "-",
        user.phone || "-",
        user.address || "-",
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
        { label: "Name", field: "name", sort: "asc" },
        { label: "Phone", field: "Phone", sort: "asc" },
        { label: "Address", field: "Address", sort: "asc" },
      ],
      rows: [],
    };

    users.forEach((user, index) => {
      data.rows.push({
        id: index + 1,
        name: user.name,
        Phone: user.phone,
        Address: user.address,
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
                  <TableRowSkeleton key={i} columns={4} />
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
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
                      <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {user.phone || "N/A"}
                    </p>
                    <p className="mt-1 flex items-start gap-1.5 text-sm text-ink-500">
                      <MapPin className="h-3.5 w-3.5 shrink-0 translate-y-0.5" aria-hidden="true" />
                      <span>{user.address || "N/A"}</span>
                    </p>
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
