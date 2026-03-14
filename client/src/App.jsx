import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddWord from './pages/AddWord'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Layout from './components/Layout'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout><HomePage/></Layout>} />
      </Routes>
      <Routes>
        <Route path='/add-word' element={<Layout><AddWord/></Layout>} />
      </Routes>
    </>
  )
}

export default App
