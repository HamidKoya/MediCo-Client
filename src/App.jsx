import {Routes,Route} from 'react-router-dom'

import Home from './pages/user/Home'
import Signup from './pages/user/Signup'
import UserOtp from './pages/user/UserOtp'
import Login from './pages/user/Login'
import ForgotPassword from './pages/user/ForgotPassword'
import ResetPassword from './pages/user/ResetPassword'
import Profile from './pages/user/Profile'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/userotp' element={<UserOtp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/resetpassword/:id/:token' element={<ResetPassword/>}/>
      <Route path='/profile' element={<Profile/>}/>

    </Routes>
  )
}

export default App
