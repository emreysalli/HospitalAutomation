import React, { useEffect, useMemo } from 'react';
import { socket } from './services/socketServices';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/signInPage/SignIn';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import AdminHomePage from './pages/adminPage/AdminHomePage';
import AdminDashboard from './pages/adminPage/AdminDashboard';
import DoctorDashboard from './pages/adminPage/DoctorDashboard';
import PolyclinicDashboard from './pages/adminPage/PolyclinicDashboard';
import LabTechnicianDashboard from './pages/adminPage/LabTechnicianDashboard';
import StaffDashboard from './pages/adminPage/StaffDashboard';
import PatientDashboard from './pages/adminPage/PatientDashboard';
import Inbox from './pages/adminPage/Inbox';
import { AuthContext } from './contexts/AuthContext';
import LoginScreen from './pages/LoginScreen';
import AdminSignIn from './pages/signInPage/AdminSignIn';
import PatientSignIn from './pages/signInPage/PatientSignIn';
import PatientSignUp from './pages/signInPage/PatientSignUp';
import NoMatch from './pages/NoMatch';
const App = () => {
  const [user, setUser] = React.useState(null);
  const authContext = useMemo(
    () => ({
      login: async (userInfo) => {
        try {
          localStorage.setItem('user', true);
          localStorage.setItem('role', userInfo.role);
          setUser({ role: userInfo.role });
          console.log(userInfo);
        } catch (err) {
          console.error(err);
        }
      },
      logout: async () => {
        try {
          localStorage.removeItem('user');
          localStorage.removeItem('role');
          setUser(null);
        } catch (err) {
          console.error(err);
        }
      },
    }),
    []
  );
  useEffect(() => {
    let u = localStorage.getItem('user');
    let r = localStorage.getItem('role');
    u ? setUser({ role: r }) : setUser(null);
    socket.connectSocket();
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          {user === null ? (
            <>
              <Route path="/" element={<LoginScreen />} />
              <Route path="/signin" element={<SignIn />}>
                <Route path="admin" element={<AdminSignIn />} />
                <Route path="patient" element={<PatientSignIn />} />
                <Route path="patientsignup" element={<PatientSignUp />} />
              </Route>
            </>
          ) : (
            <>
              {user.role === 'admin' ? (
                <Route path="/" element={<AdminHomePage />}>
                  <Route path="admins" element={<AdminDashboard />} />
                  <Route path="doctors" element={<DoctorDashboard />} />
                  <Route path="polyclinics" element={<PolyclinicDashboard />} />
                  <Route
                    path="labtechnicians"
                    element={<LabTechnicianDashboard />}
                  />
                  <Route path="staff" element={<StaffDashboard />} />
                  <Route path="patients" element={<PatientDashboard />} />
                  <Route path="inbox" element={<Inbox />} />
                </Route>
              ) : user.role === 'doctor' ? (
                /* doktor paneli */
                <Route path="/doctor"></Route>
              ) : user.role === 'staff' ? (
                /* hasta kabul personel paneli */
                <Route path="/staff"></Route>
              ) : user.role === 'labtechnician' ? (
                /* laborant paneli */
                <Route path="/labtechnician"></Route>
              ) : user.role === 'labtechnician' ? (
                /* hasta paneli */
                <Route path="/patient"></Route>
              ) : (
                <Route path="*" element={<NoMatch />} />
              )}
            </>
          )}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
