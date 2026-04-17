import { useParams, useNavigate } from 'react-router-dom'

function ViewDepartment() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock department data
  const departments = [
    { id: 1, name: 'Engineering', manager: 'John Smith', employees: 24, budget: '$500K', description: 'Responsible for product development and engineering.' },
    { id: 2, name: 'Design', manager: 'Sarah Lee', employees: 12, budget: '$200K', description: 'Creates user experiences and visual designs.' },
    { id: 3, name: 'Marketing', manager: 'Mike Johnson', employees: 8, budget: '$150K', description: 'Handles brand and growth marketing.' },
  ]

  const department = departments.find(d => d.id === parseInt(id))

  if (!department) {
    return (
      <div className="content-card">
        <h2>Department Not Found</h2>
        <button 
          className="btn btn-primary" 
          style={{ marginTop: '20px' }}
          onClick={() => navigate('/departments')}
        >
          Back to Departments
        </button>
      </div>
    )
  }

  return (
    <div className="content-card">
      <button 
        className="btn btn-secondary" 
        style={{ marginBottom: '20px' }}
        onClick={() => navigate('/departments')}
      >
        ← Back
      </button>

      <h2>{department.name}</h2>
      <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
        {department.description}
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '20px',
        marginTop: '30px'
      }}>
        <div style={{
          padding: '20px',
          background: 'var(--surface-alt)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Manager</div>
          <div style={{ fontSize: '18px', fontWeight: '600', marginTop: '8px' }}>
            {department.manager}
          </div>
        </div>
        <div style={{
          padding: '20px',
          background: 'var(--surface-alt)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Team Size</div>
          <div style={{ fontSize: '18px', fontWeight: '600', marginTop: '8px' }}>
            {department.employees} people
          </div>
        </div>
        <div style={{
          padding: '20px',
          background: 'var(--surface-alt)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Budget</div>
          <div style={{ fontSize: '18px', fontWeight: '600', marginTop: '8px' }}>
            {department.budget}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewDepartment
