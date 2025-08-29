import { Route, Routes } from 'react-router-dom'
import './App.css'
import Products from "./pages/Products"
function App() {
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Products />} />
      </Routes>
    </div>
  )
}


export default App
