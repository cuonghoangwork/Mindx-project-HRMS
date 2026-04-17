import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

function ViewEmployee() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { employees, updateEmployee } = useStore()
  
  const employee = employees.find(emp => emp.id === parseInt(id))
  
  if (!employee) {
    return (
      <div className="content-card">
        <h2>Employee Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
          The employee you are looking for does not exist.
        </p>
        <button 
          className="btn btn-primary" 
          style={{ marginTop: '20px' }}
          onClick={() => navigate('/employees')}
        >
          Back to Employees
        </button>
      </div>
    )
  }

  return (
    <div className="content-card">
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '30px' }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7152f3, #9b7bff)',
          display: 'grid',
          placeItems: 'center',
          fontSize: '48px',
          fontWeight: '600',
          color: 'white'
        }}>
          {employee.name.split(' ').map(n => n[0]).join('')}
        </div>
        
        <div style={{ flex: 1 }}>
          <h2>{employee.name}</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
            {employee.designation} • {employee.department}
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            marginTop: '16px',
            flexWrap: 'wrap'
          }}>
            <span className={`tag tag-${getStatusColor(employee.status)}`}>
              {employee.status}
            </span>
            <span className="tag tag-purple">{employee.type}</span>
          </div>
        </div>
        
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/employees')}
        >
          Back
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '24px',
        marginTop: '32px',
        paddingTop: '32px',
        borderTop: '1px solid var(--border)'
      }}>
        <InfoItem label="Employee ID" value={employee.employeeId} />
        <InfoItem label="Department" value={employee.department} />
        <InfoItem label="Designation" value={employee.designation} />
        <InfoItem label="Employment Type" value={employee.type} />
        <InfoItem label="Status" value={employee.status} />
      </div>
    </div>
  )
}

function InfoItem({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: '16px', fontWeight: '500', color: 'var(--text-main)', marginTop: '4px' }}>
        {value}
      </div>
    </div>
  )
}

function getStatusColor(status) {
  switch (status) {
    case 'Active': return 'green'
    case 'On Leave': return 'purple'
    case 'Terminated': return 'red'
    default: return 'green'
  }
}

export default ViewEmployee
