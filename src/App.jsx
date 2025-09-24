import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import './styles/common.css'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
