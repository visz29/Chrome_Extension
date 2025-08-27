import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import DashboardPage from './pages/dashboard'
import Dashbord1 from './pages/Dashbord1'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DashboardPage />
      
    </>
  )
}

export default App
