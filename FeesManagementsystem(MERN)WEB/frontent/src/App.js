import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./component/homepage";
import LoginScreen from "./component/student_component/loginscreen";
import SignupScreen from "./component/student_component/singUpscreen";
import Studentdashboard from "./component/student_component/stu_dashboard";
import Adminsignup from "./component/Admin_component/adm_reg";
import Adminlogin from "./component/Admin_component/adm_login";
import Admindashboard from "./component/Admin_component/adm_dashboard";
import Addfees from "./component/Admin_component/addfees";
import StudentList from "./component/Admin_component/stu_list";
import Payment from "./component/student_component/payment";
import Payment2 from "./component/student_component/payment2";
import UploadPage from "./component/Admin_component/uploadpage";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stu_login" element={<LoginScreen />} />
          <Route path="/stu_signup" element={<SignupScreen />} />
          <Route path="/stu_dashboard" element={<Studentdashboard/>} />
          <Route path="/adm_signup" element={<Adminsignup />} />
          <Route path="/adm_login" element={<Adminlogin />} />
          <Route path="/adm_dashboard" element={<Admindashboard/>} />
          <Route path="/addfees" element={<Addfees />} />
          <Route path="/stu_list" element={<StudentList />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment2" element={<Payment2 />} />
          <Route path="/uploadpage" element={<UploadPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
