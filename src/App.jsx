import {Routes,Route} from 'react-router-dom'

import Home from './pages/user/Home'
import Signup from './pages/user/Signup'
import UserOtp from './pages/user/UserOtp'
import Login from './pages/user/Login'
import ForgotPassword from './pages/user/ForgotPassword'
import ResetPassword from './pages/user/ResetPassword'
import Profile from './pages/user/Profile'

import UsersList from './pages/admin/UsersList'
import Dashboard from './pages/admin/Dashboard'
import Appointments from './pages/admin/Appointments'
import Doctors from './pages/admin/Doctors'
import Specialties from './pages/admin/Specialties'
import VerifyDoctors from './pages/admin/VerifyDoctors'
import AdminLogin from './pages/admin/AdminLogin'

import Doctor from './pages/doctor/Doctor'
import LoginDoctor from './pages/doctor/LoginDoctor'
import SignupDoctor from './pages/doctor/SignupDoctor'
import OtpDoctor from './pages/doctor/OtpDoctor'
import DashboardDoctor from './pages/doctor/DashboardDoctor'
import DoctorForgotPassword from './pages/doctor/DoctorForgotPassword'
import ResetPasswordDoctor from './pages/doctor/ResetPasswordDoctor'

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


      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path='/admin/dashboard' element={<Dashboard/>}/>
      <Route path='/admin/appointments' element={<Appointments/>}/>
      <Route path='/admin/users' element={<UsersList/>}/>
      <Route path='/admin/doctors' element={<Doctors/>}/>
      <Route path='/admin/verifydoctors' element={<VerifyDoctors/>}/>
      <Route path='/admin/specialties' element={<Specialties/>}/>


      <Route path='/doctor' element={<Doctor/>}/>
      <Route path='/doctor/login' element={<LoginDoctor/>}/>
      <Route path='/doctor/signup' element={<SignupDoctor/>}/>
      <Route path='/doctor/otp' element={<OtpDoctor/>}/>
      <Route path='/doctor/dashboard' element={<DashboardDoctor/>}/>
      <Route path='/doctor/forgotpassword' element={<DoctorForgotPassword/>}/>
      <Route path='/doctor/resetpassword/:id/:token' element={<ResetPasswordDoctor/>}/>
      

    </Routes>
  )
}

export default App
