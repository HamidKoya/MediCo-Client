import {Routes,Route} from 'react-router-dom'

import Home from './pages/Home'
import Signup from './pages/Signup'
import UserOtp from './pages/UserOtp'
import Login from './pages/Login'
import Sample from './pages/Sample'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/userotp' element={<UserOtp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/sample' element={<Sample/>}/>
    </Routes>
  )
}

export default App
