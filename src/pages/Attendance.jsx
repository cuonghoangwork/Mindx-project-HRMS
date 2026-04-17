function Attendance() {
  return (
    <div className="content-card">
      <h2>Attendance</h2>
      <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
        Track employee attendance and time records.
      </p>
      
      <div style={{ marginTop: '30px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>2024-01-15</td>
              <td>09:00 AM</td>
              <td>06:00 PM</td>
              <td><span className="tag tag-green">Present</span></td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>2024-01-15</td>
              <td>09:15 AM</td>
              <td>06:30 PM</td>
              <td><span className="tag tag-green">Present</span></td>
            </tr>
            <tr>
              <td>Bob Johnson</td>
              <td>2024-01-15</td>
              <td>—</td>
              <td>—</td>
              <td><span className="tag tag-purple">On Leave</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Attendance
