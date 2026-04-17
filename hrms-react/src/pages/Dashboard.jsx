import { useStore } from "../context/StoreContext";

function Dashboard() {
  const { employees, attendance } = useStore();

  // Calculate real stats
  const totalEmployees = employees.length;

  // Calculate attendance rate from attendance records
  const presentCount = attendance.filter((a) => a.status === "Present").length;
  const attendanceRate =
    totalEmployees > 0
      ? Math.round((presentCount / attendance.length) * 100)
      : 0;

  // Pending leave: count of employees with "On Leave" status in their profile
  const pendingLeave = employees.filter(
    (emp) => emp.status === "On Leave",
  ).length;

  // New hires this month (employees created in current month)
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const newHires = employees.filter((emp) => {
    const createdDate = new Date(emp.createdAt);
    return (
      createdDate.getMonth() === currentMonth &&
      createdDate.getFullYear() === currentYear
    );
  }).length;

  return (
    <div className="content-card">
      <h2>Welcome to HRMS Dashboard</h2>
      <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
        Select a menu item from the sidebar to get started.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          trend="↑ 12%"
        />
        <StatCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          trend="↑ 4%"
        />
        <StatCard title="Pending Leave" value={pendingLeave} trend="↓ 2" />
        <StatCard title="New Hires" value={newHires} trend="This month" />
      </div>
    </div>
  );
}

function StatCard({ title, value, trend }) {
  return (
    <div
      style={{
        padding: "20px",
        background: "var(--surface-alt)",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "28px",
          fontWeight: "600",
          color: "var(--text-main)",
          marginTop: "8px",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "12px",
          color: trend.includes("↑") ? "#16a34a" : "var(--text-muted)",
          marginTop: "4px",
        }}
      >
        {trend}
      </div>
    </div>
  );
}

export default Dashboard;
