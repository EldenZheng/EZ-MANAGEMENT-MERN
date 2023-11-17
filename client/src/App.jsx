import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
// import CreateUser from './CreateUser'
// import UpdateUser from './UpdateUser'
// import Register from './Register'
import Login from './Login'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/Home' element={<Home />}></Route>
          {/* <Route path='/Register' element={<Register />}></Route>
          <Route path='/create' element={<CreateUser />}></Route>
          <Route path='/update/:id' element={<UpdateUser />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
