function Payroll() {
  return (
    <div className="content-card">
      <h2>Payroll</h2>
      <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
        Manage employee salaries and payroll processing.
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginTop: '30px'
      }}>
        <div style={{
          padding: '20px',
          background: 'var(--surface-alt)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Payroll</div>
          <div style={{ fontSize: '24px', fontWeight: '600', marginTop: '8px' }}>$125,000</div>
        </div>
        <div style={{
          padding: '20px',
          background: 'var(--surface-alt)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pending Approvals</div>
          <div style={{ fontSize: '24px', fontWeight: '600', marginTop: '8px' }}>3</div>
        </div>
        <div style={{
          padding: '20px',
          background: 'var(--surface-alt)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Next Payday</div>
          <div style={{ fontSize: '24px', fontWeight: '600', marginTop: '8px' }}>Jan 31</div>
        </div>
      </div>
    </div>
  )
}

export default Payroll
