import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddWord from './pages/AddWord'
import HomePage from './pages/HomePage'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
      </Routes>
      <Routes>
        <Route path='/add-a-word' element={<AddWord/>} />
      </Routes>
    </>
  )
}

export default App
