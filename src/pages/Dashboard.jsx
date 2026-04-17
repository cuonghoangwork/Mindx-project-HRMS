function Dashboard() {
  return (
    <div className="content-card">
      <h2>Welcome to HRMS Dashboard</h2>
      <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
        Select a menu item from the sidebar to get started.
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginTop: '30px'
      }}>
        <StatCard title="Total Employees" value="48" trend="↑ 12%" />
        <StatCard title="Attendance Rate" value="96%" trend="↑ 4%" />
        <StatCard title="Pending Leave" value="5" trend="↓ 2" />
        <StatCard title="New Hires" value="3" trend="This month" />
      </div>
    </div>
  )
}

function StatCard({ title, value, trend }) {
  return (
    <div style={{
      padding: '20px',
      background: 'var(--surface-alt)',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border)'
    }}>
      <div style={{ 
        fontSize: '12px', 
        color: 'var(--text-muted)', 
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {title}
      </div>
      <div style={{ 
        fontSize: '28px', 
        fontWeight: '600', 
        color: 'var(--text-main)',
        marginTop: '8px'
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: '12px', 
        color: trend.includes('↑') ? '#16a34a' : 'var(--text-muted)',
        marginTop: '4px'
      }}>
        {trend}
      </div>
    </div>
  )
}

export default Dashboard
