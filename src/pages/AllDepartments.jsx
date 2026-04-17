import { Link } from 'react-router-dom'

function AllDepartments() {
  const departments = [
    { id: 1, name: 'Engineering', manager: 'John Smith', employees: 24, budget: '$500K' },
    { id: 2, name: 'Design', manager: 'Sarah Lee', employees: 12, budget: '$200K' },
    { id: 3, name: 'Marketing', manager: 'Mike Johnson', employees: 8, budget: '$150K' },
    { id: 4, name: 'HR', manager: 'Lisa Brown', employees: 6, budget: '$100K' },
    { id: 5, name: 'Sales', manager: 'Tom Wilson', employees: 15, budget: '$300K' },
  ]

  return (
    <div className="content-card">
      <div className="toolbar">
        <h2 style={{ flex: 1 }}>All Departments</h2>
        <button className="btn btn-primary">+ Add Department</button>
      </div>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>Department</th>
            <th>Manager</th>
            <th>Employees</th>
            <th>Budget</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(dept => (
            <tr key={dept.id}>
              <td>
                <div style={{ fontWeight: '500' }}>{dept.name}</div>
              </td>
              <td>{dept.manager}</td>
              <td>{dept.employees}</td>
              <td>{dept.budget}</td>
              <td>
                <Link 
                  to={`/departments/${dept.id}`}
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '12px' }}
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllDepartments
