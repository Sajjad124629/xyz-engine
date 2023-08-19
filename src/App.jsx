import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Result from './pages/resultPage/Result'
import HomePage from './pages/homePage/HomePage'


function App() {

  return (
    <>
     <div >
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/result' element={<Result/>}></Route>
       </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
