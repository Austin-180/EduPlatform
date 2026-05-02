import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import GlobalNav from './GlobalNav'

export default function Layout() {
  const location = useLocation()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <GlobalNav />
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </div>
  )
}
