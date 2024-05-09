import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage/LoginPage";
import CyberBugs from "./page/HomePage/CyberBugs";
import SignupPage from "./page/SignupPage/SignupPage";
import CreateProject from "./page/CreateProject/CreateProject";
import HomeTemplate from "./page/HomeTemplate/HomeTemplate";
import Spinner from "./components/Spinner/Spinner";
import ProjectManager from "./page/ProjectManager/ProjectManager";
import ProjectDetail from "./page/ProjectDetail/ProjectDetail";
import CreateTask from "./page/CreateTask/CreateTask";
import UserManager from "./page/UserManager/UserManager";

function App() {
  return (
    <>
      <Spinner />
      <BrowserRouter>
        <Routes>

          <Route path="/signup" element={<SignupPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomeTemplate />}>
            <Route index element={<CyberBugs />} />
            <Route path="/createproject" element={<CreateProject />} />
            <Route path="/project" element={<ProjectManager />} />
            <Route path="/project-detail/:id" element={<ProjectDetail />} />
            <Route path="/createtask" element={<CreateTask />} />
            <Route path="usermanager" element={<UserManager />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
