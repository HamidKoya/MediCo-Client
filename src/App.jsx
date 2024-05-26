import {Routes,Route} from 'react-router-dom'

import Home from './pages/user/Home'
import Signup from './pages/user/Signup'
import UserOtp from './pages/user/UserOtp'
import Login from './pages/user/Login'
import ForgotPassword from './pages/user/ForgotPassword'
import ResetPassword from './pages/user/ResetPassword'
import Profile from './pages/user/Profile'
import DoctorsList from './pages/user/DoctorsList'
import DoctorDetailsPage from './pages/user/DoctorDetailsPage'
import AppointmentsUser from './pages/user/AppointmentsUser'
import PaymentSuccess from './pages/user/PaymentSuccess'
import ChatPage from './pages/user/ChatPage'
import ConsultationReport from './pages/user/ConsultationReport'
import PrescriptionUser from './pages/user/PrescriptionUser'
import MedicalReportUser from './pages/user/MedicalReportUser'

import UsersList from './pages/admin/UsersList'
import Dashboard from './pages/admin/Dashboard'
import Appointments from './pages/admin/Appointments'
import Doctors from './pages/admin/Doctors'
import Specialties from './pages/admin/Specialties'
import VerifyDoctors from './pages/admin/VerifyDoctors'
import AdminLogin from './pages/admin/AdminLogin'
import VerifyDetails from './pages/admin/VerifyDetails'
import DoctorDetails from './pages/admin/DoctorDetails'

import Doctor from './pages/doctor/Doctor'
import LoginDoctor from './pages/doctor/LoginDoctor'
import SignupDoctor from './pages/doctor/SignupDoctor'
import OtpDoctor from './pages/doctor/OtpDoctor'
import DoctorForgotPassword from './pages/doctor/DoctorForgotPassword'
import ResetPasswordDoctor from './pages/doctor/ResetPasswordDoctor'
import DashboardDoctor from './pages/doctor/DashboardDoctor'
import ProfileDoctor from './pages/doctor/ProfileDoctor'
import SlotsDoctor from './pages/doctor/SlotsDoctor'
import AppointmentsDoctor from './pages/doctor/AppointmentsDoctor'
import ReviewsDoctor from './pages/doctor/ReviewsDoctor'
import ChatPageDoctor from './pages/doctor/ChatPageDoctor'
import Prescription from './pages/doctor/Prescription'
import MedicalReport from './pages/doctor/MedicalReport'

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
      <Route path='/doctors' element={<DoctorsList/>}/>
      <Route path='/doctordetails/:id' element={<DoctorDetailsPage/>}/>
      <Route path='/appointments' element={<AppointmentsUser/>}/>
      <Route path='/success' element={<PaymentSuccess/>}/>
      <Route path='/chatuser' element={<ChatPage/>}/>
      <Route path='/consultationreport' element={<ConsultationReport/>}/>
      <Route path='/prescription' element={<PrescriptionUser/>}/>
      <Route path='/medicalreport' element={<MedicalReportUser/>}/>


      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path='/admin/dashboard' element={<Dashboard/>}/>
      <Route path='/admin/appointments' element={<Appointments/>}/>
      <Route path='/admin/users' element={<UsersList/>}/>
      <Route path='/admin/doctors' element={<Doctors/>}/>
      <Route path='/admin/verifydoctors' element={<VerifyDoctors/>}/>
      <Route path='/admin/specialties' element={<Specialties/>}/>
      <Route path='/admin/verifiedDetails/:id' element={<VerifyDetails/>}/>
      <Route path='/admin/doctordetails/:id' element={<DoctorDetails/>}/>
      


      <Route path='/doctor' element={<Doctor/>}/>
      <Route path='/doctor/login' element={<LoginDoctor/>}/>
      <Route path='/doctor/signup' element={<SignupDoctor/>}/>
      <Route path='/doctor/otp' element={<OtpDoctor/>}/>
      <Route path='/doctor/dashboard' element={<DashboardDoctor/>}/>
      <Route path='/doctor/forgotpassword' element={<DoctorForgotPassword/>}/>
      <Route path='/doctor/resetpassword/:id/:token' element={<ResetPasswordDoctor/>}/>
      <Route path='/doctor/profile' element={<ProfileDoctor/>}/>
      <Route path='/doctor/slots' element={<SlotsDoctor/>}/>
      <Route path='/doctor/appointments' element={<AppointmentsDoctor/>}/>
      <Route path='/doctor/reviews' element={<ReviewsDoctor/>}/>
      <Route path='/doctor/chatpagedoctor' element={<ChatPageDoctor/>}/>
      <Route path='/doctor/prescription' element={<Prescription/>}/>
      <Route path='/doctor/medicalreport' element={<MedicalReport/>}/>


      

    </Routes>
  )
}

export default App
