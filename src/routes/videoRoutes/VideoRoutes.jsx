import React from 'react'
import { Routes,Route } from 'react-router-dom'
import VideoProtect from './VideoProtect'
import VideoPage from '@/pages/doctor/VideoPage'
import PageNotFound from '@/pages/404/PageNotFound'



function VideoRoutes() {
  return (
    <Routes>
        <Route path='/video' element={<VideoProtect><VideoPage/></VideoProtect>}/>
        <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  )
}

export default VideoRoutes
