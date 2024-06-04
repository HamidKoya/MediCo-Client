import { Routes, Route } from "react-router-dom";

import UserRoutes from "./routes/userRoutes/UserRoutes";
import DoctorRoutes from "./routes/doctorRoutes/DoctorRoutes";
import AdminRoutes from "./routes/adminRoutes/AdminRoutes";
import VideoRoutes from "./routes/videoRoutes/VideoRoutes";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
      <Route path="/doctor/*" element={<DoctorRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/video/*" element={<VideoRoutes />} />
    </Routes>
  );
}

export default App;
