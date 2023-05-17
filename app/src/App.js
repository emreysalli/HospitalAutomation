import React, { useEffect, useMemo } from 'react';
import { socket } from './services/socketServices';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
import DoctorSignIn from './pages/signInPage/DoctorSignIn';
import PatientSignIn from './pages/signInPage/PatientSignIn';
import PatientSignUp from './pages/signInPage/PatientSignUp';
import NoMatch from './pages/NoMatch';
import DoctorHomePage from './pages/doctorPage/DoctorHomePage';
import WelcomePage from './components/WelcomePage';
import PatientHomePage from './pages/patientPage/PatientHomePage';
import AccountInfoDashboard from './pages/patientPage/AccountInfoDashboard';
import MakeAppointmentDashboard from './pages/patientPage/MakeAppointmentDashboard';
import AppointmentsDashboard from './pages/patientPage/AppointmentsDashboard';
import PastAppointmentsDashboard from './pages/patientPage/PastAppointmentsDashboard';
import AnalysisResultsDashboard from './pages/patientPage/AnalysisResultsDashboard';
import PrescriptionsDashboard from './pages/patientPage/PrescriptionsDashboard';
import DoctorAccountInfoDashboard from './pages/doctorPage/DoctorAccountInfoDashboard';
import DoctorAppointmentsDashboard from './pages/doctorPage/DoctorAppointmentsDashboard';
import PatientExaminationDashboard from './pages/doctorPage/PatientExaminationDashboard';
import PatientAnalysisResultDashboard from './pages/doctorPage/PatientAnalysisResultDashboard';
import StaffSignIn from './pages/signInPage/StaffSignIn';
import LabTechnicianSignIn from './pages/signInPage/LabTechnicianSignIn';
import LabTechnicianHomePage from './pages/labTechnicianPage/LabTechnicianHomePage';
import LabTechnicianAccountInfoDashboard from './pages/labTechnicianPage/LabTechnicianAccountInfoDashboard';
import LTPatientAnalysisResultDashboard from './pages/labTechnicianPage/LTPatientAnalysisResultDashboard';
import StaffHomePage from './pages/staffPage/StaffHomePage';
import StaffAccountInfoDashboard from './pages/staffPage/StaffAccountInfoDashboard';
import PatientAdmissionPage from './pages/staffPage/PatientAdmissionPage';
import { SnackbarProvider } from 'notistack';
const theme = createTheme({
  palette: {
    background: {
      default: '#F5F5F5',
    },
  },
});

const App = () => {
  const [user, setUser] = React.useState(null);
  const authContext = useMemo(
    () => ({
      login: async (userInfo) => {
        try {
          localStorage.setItem('user', true);
          localStorage.setItem('role', userInfo.role);
          localStorage.setItem('id', userInfo.id);
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
          localStorage.removeItem('id');
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
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        autoHideDuration={4000}
      >
        <AuthContext.Provider value={authContext}>
          <CssBaseline />
          <BrowserRouter>
            <ResponsiveAppBar />
            <Routes>
              {user === null ? (
                <>
                  <Route path="/" element={<LoginScreen />} />
                  <Route path="/signin" element={<SignIn />}>
                    <Route path="admin" element={<AdminSignIn />} />
                    <Route path="patient" element={<PatientSignIn />} />
                    <Route path="doctor" element={<DoctorSignIn />} />
                    <Route path="patientsignup" element={<PatientSignUp />} />
                    <Route path="staff" element={<StaffSignIn />} />
                    <Route
                      path="labtechnician"
                      element={<LabTechnicianSignIn />}
                    />
                  </Route>
                </>
              ) : (
                <>
                  {user.role === 'admin' ? (
                    <Route path="/" element={<AdminHomePage />}>
                      <Route path="" element={<WelcomePage />} />
                      <Route path="admins" element={<AdminDashboard />} />
                      <Route path="doctors" element={<DoctorDashboard />} />
                      <Route
                        path="polyclinics"
                        element={<PolyclinicDashboard />}
                      />
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
                    <Route path="/" element={<DoctorHomePage />}>
                      <Route path="" element={<WelcomePage />} />
                      <Route
                        path="account-info"
                        element={<DoctorAccountInfoDashboard />}
                      />
                      <Route
                        path="appointments"
                        element={<DoctorAppointmentsDashboard />}
                      />
                      <Route
                        path="patient-examination"
                        element={<PatientExaminationDashboard />}
                      />
                      <Route
                        path="patient-analysis-results"
                        element={<PatientAnalysisResultDashboard />}
                      />
                      <Route path="inbox" element={<Inbox />} />
                    </Route>
                  ) : user.role === 'staff' ? (
                    /* hasta kabul personel paneli */
                    <Route path="/" element={<StaffHomePage />}>
                      <Route path="" element={<WelcomePage />} />
                      <Route
                        path="account-info"
                        element={<StaffAccountInfoDashboard />}
                      />
                      <Route
                        path="patient-admission"
                        element={<PatientAdmissionPage />}
                      />
                      <Route path="inbox" element={<Inbox />} />
                    </Route>
                  ) : user.role === 'labtechnician' ? (
                    /* laborant paneli */
                    <Route path="/" element={<LabTechnicianHomePage />}>
                      <Route path="" element={<WelcomePage />} />
                      <Route
                        path="account-info"
                        element={<LabTechnicianAccountInfoDashboard />}
                      />
                      <Route
                        path="patient-analysis-results"
                        element={<LTPatientAnalysisResultDashboard />}
                      />
                      <Route path="inbox" element={<Inbox />} />
                    </Route>
                  ) : user.role === 'patient' ? (
                    /* hasta paneli */
                    <Route path="/" element={<PatientHomePage />}>
                      <Route path="" element={<WelcomePage />} />
                      <Route
                        path="account-info"
                        element={<AccountInfoDashboard />}
                      />
                      <Route
                        path="make-appointment"
                        element={<MakeAppointmentDashboard />}
                      />
                      <Route
                        path="appointments"
                        element={<AppointmentsDashboard />}
                      />
                      <Route
                        path="past-appointments"
                        element={<PastAppointmentsDashboard />}
                      />
                      <Route
                        path="analysis-results"
                        element={<AnalysisResultsDashboard />}
                      />
                      <Route
                        path="prescriptions"
                        element={<PrescriptionsDashboard />}
                      />
                      <Route path="inbox" element={<Inbox />} />
                    </Route>
                  ) : (
                    <Route path="*" element={<NoMatch />} />
                  )}
                </>
              )}
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
