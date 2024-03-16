import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage/LoginPage";
import CyberBugs from "./page/HomePage/CyberBugs";
import SignupPage from "./page/SignupPage/SignupPage";
import CreateProject from "./page/HomePage/CreateProject/CreateProject";
import SidebarCyberBugs from "./page/HomePage/SidebarCyberBugs";
import HomeTemplate from "./page/HomeTemplate/HomeTemplate";
import Spinner from "./components/Spinner/Spinner";
import ModalCyberBugs from "./page/HomePage/TaskDetail/TaskDetail";
import ProjectManager from "./page/HomePage/ProjectManager/ProjectManager";
import CreateIssue from "./page/HomePage/CreateTask/CreateTask";
import CreateTask from "./page/HomePage/CreateTask/CreateTask";

function App() {
  return (
    <>
      <Spinner />
      <BrowserRouter>
        <Routes>
          <Route path="signup" element={<SignupPage />}/>
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<HomeTemplate />}>
            <Route index element={<CyberBugs />} />
            <Route path="create" element={<CreateProject />} />
            <Route path="project" element={<ProjectManager />} />
            <Route path="creattask" element={<CreateTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
