import { Outlet } from 'react-router-dom'
import SideMenu from './SideMenu'
import Header from './Header'

function Layout() {
  return (
    <div className="app-layout">
      <SideMenu />
      <main className="main-content">
        <Header />
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
