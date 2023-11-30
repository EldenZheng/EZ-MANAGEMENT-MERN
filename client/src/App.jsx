import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import AddUser from './AddUser'
// import UpdateUser from './UpdateUser'
// import Register from './Register'
import Login from './Login'
// import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/Home' element={<Home />}></Route>
          <Route path='/AddUser' element={<AddUser />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
