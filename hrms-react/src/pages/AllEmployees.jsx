import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import EmployeeModal from "../components/EmployeeModal";
import FilterModal from "../components/FilterModal";
import SearchBar from "../components/SearchBar";

const EMPLOYEES_PER_PAGE = 10;

function AllEmployees() {
  const {
    employees,
    removeEmployee,
    modals,
    openModal,
    closeModal,
    filters,
    setSearchFilter,
    clearFilters,
  } = useStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  // Filter employees with all criteria
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      !filters.search ||
      emp.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      emp.department.toLowerCase().includes(filters.search.toLowerCase());

    // Department filter (comma-separated list)
    const matchesDepartment =
      !filters.department ||
      filters.department === "" ||
      filters.department.split(",").includes(emp.department);

    // Type filter
    const matchesType =
      !filters.type || filters.type === "all" || emp.type === filters.type;

    return matchesSearch && matchesDepartment && matchesType;
  });

  // Sort employees by name
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (sortOrder === "asc") {
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    } else {
      return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedEmployees.length / EMPLOYEES_PER_PAGE);
  const startIndex = (currentPage - 1) * EMPLOYEES_PER_PAGE;
  const paginatedEmployees = sortedEmployees.slice(
    startIndex,
    startIndex + EMPLOYEES_PER_PAGE,
  );

  const hasActiveFilters = filters.department || filters.type !== "all";

  const handleSearch = (value) => {
    setSearchFilter(value);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      removeEmployee(id);
    }
  };

  return (
    <div className="content-card">
      <div className="toolbar">
        <SearchBar
          value={filters.search}
          onSearch={handleSearch}
          placeholder="Search by department, name..."
        />
        <Link to="/employees/add" className="btn btn-primary">
          + Add Employee
        </Link>
        <button
          className="btn btn-secondary"
          onClick={() => openModal("filter")}
          style={{
            position: "relative",
            borderColor: hasActiveFilters ? "var(--primary)" : undefined,
            color: hasActiveFilters ? "var(--primary)" : undefined,
          }}
        >
          Filter
          {hasActiveFilters && (
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                width: "8px",
                height: "8px",
                background: "var(--primary)",
                borderRadius: "50%",
              }}
            />
          )}
        </button>
        {hasActiveFilters && (
          <button
            className="btn btn-secondary"
            onClick={clearFilters}
            style={{ padding: "12px 16px" }}
            title="Clear all filters"
          >
            ✕ Clear
          </button>
        )}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              style={{ cursor: "pointer", userSelect: "none" }}
              title="Click to sort A-Z or Z-A"
            >
              Employee Name{" "}
              <span style={{ color: "var(--primary)", fontSize: "12px" }}>
                {sortOrder === "asc" ? "▲" : "▼"}
              </span>
            </th>
            <th>Employee ID</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #7152f3, #9b7bff)",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    {employee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  {employee.name}
                </div>
              </td>
              <td>{employee.employeeId}</td>
              <td>{employee.department}</td>
              <td>{employee.designation}</td>
              <td>{employee.type}</td>
              <td>
                <span className={`tag tag-${getStatusColor(employee.status)}`}>
                  {employee.status}
                </span>
              </td>
              <td>
                <Link
                  to={`/employees/${employee.id}`}
                  className="btn btn-secondary"
                  style={{ padding: "8px 16px", fontSize: "12px" }}
                >
                  View
                </Link>
                <button
                  className="btn btn-secondary"
                  style={{
                    padding: "8px 16px",
                    fontSize: "12px",
                    marginLeft: "8px",
                  }}
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredEmployees.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "var(--text-muted)",
          }}
        >
          No employees found matching your search.
        </div>
      )}

      {totalPages > 0 && (
        <div className="pagination">
          <div className="pagination-info">
            Showing {startIndex + 1}-
            {Math.min(startIndex + EMPLOYEES_PER_PAGE, sortedEmployees.length)}{" "}
            of {sortedEmployees.length} employees
            {sortedEmployees.length !== employees.length && (
              <span style={{ color: "var(--text-muted)", marginLeft: "8px" }}>
                (filtered from {employees.length})
              </span>
            )}
          </div>
          <div className="pagination-controls">
            <button
              className="page-btn"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="page-btn"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              ›
            </button>
          </div>
        </div>
      )}

      {modals.filter && <FilterModal onClose={() => closeModal("filter")} />}
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "Active":
      return "green";
    case "On Leave":
      return "purple";
    case "Terminated":
      return "red";
    default:
      return "green";
  }
}

export default AllEmployees;
