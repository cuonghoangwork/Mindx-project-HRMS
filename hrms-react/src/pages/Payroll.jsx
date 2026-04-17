import { useStore } from "../context/StoreContext";

function Payroll() {
  const { departments } = useStore();

  // Calculate total budget from all departments
  const totalPayroll = departments.reduce((sum, dept) => sum + dept.budget, 0);

  const formatBudget = (amount) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount}`;
  };

  return (
    <div className="content-card">
      <h2>Payroll</h2>
      <p style={{ color: "var(--text-muted)", marginTop: "12px" }}>
        Manage employee salaries and payroll processing.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            padding: "20px",
            background: "var(--surface-alt)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Total Payroll
          </div>
          <div
            style={{ fontSize: "24px", fontWeight: "600", marginTop: "8px" }}
          >
            {formatBudget(totalPayroll)}
          </div>
        </div>
        <div
          style={{
            padding: "20px",
            background: "var(--surface-alt)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Pending Approvals
          </div>
          <div
            style={{ fontSize: "24px", fontWeight: "600", marginTop: "8px" }}
          >
            3
          </div>
        </div>
        <div
          style={{
            padding: "20px",
            background: "var(--surface-alt)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Next Payday
          </div>
          <div
            style={{ fontSize: "24px", fontWeight: "600", marginTop: "8px" }}
          >
            Jan 31
          </div>
        </div>
      </div>

      {/* Department Budget Breakdown */}
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ marginBottom: "16px" }}>Department Budgets</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          {departments.map((dept) => (
            <div
              key={dept.id}
              style={{
                padding: "16px",
                background: "var(--surface-alt)",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                {dept.name}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginTop: "4px",
                  color: "var(--primary)",
                }}
              >
                {formatBudget(dept.budget)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Payroll;
