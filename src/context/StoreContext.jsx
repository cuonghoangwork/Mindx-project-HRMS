import { createContext, useContext, useState, useCallback } from "react";

const StoreContext = createContext(null);

// Initial mock data for employees
const initialEmployees = [
  {
    id: 1,
    name: "John Doe",
    employeeId: "EMP001",
    department: "Engineering",
    designation: "Software Engineer",
    type: "Full-time",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    employeeId: "EMP002",
    department: "Design",
    designation: "UI Designer",
    type: "Full-time",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    employeeId: "EMP003",
    department: "Marketing",
    designation: "Marketing Manager",
    type: "Full-time",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Alice Brown",
    employeeId: "EMP004",
    department: "Finance",
    designation: "HR Specialist",
    type: "Part-time",
    status: "Active",
  },
  {
    id: 5,
    name: "Mike Wilson",
    employeeId: "EMP005",
    department: "Sales",
    designation: "Sales Manager",
    type: "Contract",
    status: "Active",
  },
  {
    id: 6,
    name: "Sarah Lee",
    employeeId: "EMP006",
    department: "IT",
    designation: "DevOps Engineer",
    type: "Part-time",
    status: "Active",
  },
  {
    id: 7,
    name: "Tom Davis",
    employeeId: "EMP007",
    department: "Management",
    designation: "Product Manager",
    type: "Full-time",
    status: "Active",
  },
  {
    id: 8,
    name: "Lisa Chen",
    employeeId: "EMP008",
    department: "Design",
    designation: "UX Designer",
    type: "Contract",
    status: "On Leave",
  },
];

export function StoreProvider({ children }) {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modals, setModals] = useState({
    employee: false,
    filter: false,
    job: false,
    holiday: false,
  });
  const [filters, setFilters] = useState({
    department: "",
    search: "",
    type: "all",
  });
  const [activePage, setActivePage] = useState("Dashboard");

  // Employee actions
  const addEmployee = useCallback((employee) => {
    setEmployees((prev) => [...prev, { ...employee, id: Date.now() }]);
  }, []);

  const removeEmployee = useCallback((id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  }, []);

  const updateEmployee = useCallback((id, updates) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updates } : emp)),
    );
  }, []);

  const selectEmployee = useCallback((employee) => {
    setSelectedEmployee(employee);
  }, []);

  // Modal actions
  const openModal = useCallback((modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  }, []);

  const closeModal = useCallback((modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  }, []);

  const closeAllModals = useCallback(() => {
    setModals({
      employee: false,
      filter: false,
      job: false,
      holiday: false,
    });
  }, []);

  // Filter actions
  const setSearchFilter = useCallback((search) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const setDepartmentFilter = useCallback((department) => {
    setFilters((prev) => ({ ...prev, department }));
  }, []);

  const setTypeFilter = useCallback((type) => {
    setFilters((prev) => ({ ...prev, type }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ department: "", search: "", type: "all" });
  }, []);

  const value = {
    // State
    employees,
    selectedEmployee,
    modals,
    filters,
    activePage,

    // Actions
    addEmployee,
    removeEmployee,
    updateEmployee,
    selectEmployee,
    openModal,
    closeModal,
    closeAllModals,
    setSearchFilter,
    setDepartmentFilter,
    setTypeFilter,
    clearFilters,
    setActivePage,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
