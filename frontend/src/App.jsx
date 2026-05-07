import {
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

import Tasks from "./pages/Tasks";

import Projects from "./pages/Projects";

import Team from "./pages/Team";

const App = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/tasks"
        element={<Tasks />}
      />

      <Route
        path="/projects"
        element={<Projects />}
      />

      <Route
        path="/team"
        element={<Team />}
      />

    </Routes>
  );
};

export default App;