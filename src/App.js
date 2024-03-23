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
            <Route path="/create" element={<CreateProject />} />
            <Route path="/project" element={<ProjectManager />} />
            <Route path="/detail" element={<ProjectDetail />} />
            <Route path="/creattask" element={<CreateTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
