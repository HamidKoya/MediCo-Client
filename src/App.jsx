import {Routes,Route} from 'react-router-dom'

import Home from './pages/Home'
import Doctor from './pages/Doctor'
import Signup from './pages/Signup'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/doctors' element={<Doctor/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
  )
}

export default App
