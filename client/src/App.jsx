import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import AddWord from './pages/AddWord'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout><HomePage /></Layout>} />
      <Route path='/add-word' element={<Layout><AddWord /></Layout>} />
    </Routes>
  );
}

export default App
