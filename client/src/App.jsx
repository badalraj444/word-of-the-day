import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddWord from './pages/AddWord'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
      </Routes>
      <Routes>
        <Route path='/add-word' element={<AddWord/>} />
      </Routes>
      {/* <Navbar/> */}
    </>
  )
}

export default App
