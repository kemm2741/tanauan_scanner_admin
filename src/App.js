import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

// React Router Dom
import { Switch, Route } from "react-router-dom";

// Component Layouts
import Layout from "./component/Layout";

// Solo Routes
import Login from "./Screen/Login/Login";
import CreateQRCode from "./Screen/CreateQRCode/CreateQRCode";

// Pages
import Dashboard from "./pages/Dashboard";
import Vaccines from "./pages/Vaccines";
import ChildrenVaccination from "./pages/ChildrenVaccination";
import Barangays from "./pages/Barangays";
import Admins from "./pages/Admins";
import Branches from "./pages/Branches";
import Profile from "./pages/Profile";
import Map from "./pages/Map";
import Schedule from "./pages/Schedule";

// User Component
import ArchievedUser from "./UserComponent/ArchievedUser";
import ActiveUser from "./UserComponent/ActiveUser";

// RHU Component
import RhuUser from "./pages/RhuUser";
import AddRhuUser from "./pages/AddRhuUser";
import EditRhuUser from "./pages/EditRhuUser";

// Page Not Found
import NotFound from "./pages/NotFound";

// PrivateRoute
import PrivateRoute from "./component/PrivateRoute";

// React State
import AuthState from "./context/auth/AuthState";

const App = () => {
  return (
    <AuthState>
      <CssBaseline />
      <Layout>
        <Switch>
          <PrivateRoute exact path="/">
            <Dashboard />
          </PrivateRoute>

          <PrivateRoute exact path="/schedule">
            <Schedule />
          </PrivateRoute>

          <PrivateRoute path="/vaccines">
            <Vaccines />
          </PrivateRoute>

          <PrivateRoute path="/admins">
            <Admins />
          </PrivateRoute>

          <PrivateRoute path="/children">
            <ChildrenVaccination />
          </PrivateRoute>

          <PrivateRoute path="/barangays">
            <Barangays />
          </PrivateRoute>

          <PrivateRoute path="/branches">
            <Branches />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>

          <PrivateRoute path="/map">
            <Map />
          </PrivateRoute>
          {/* Archieved Users */}

          <PrivateRoute path="/archieve-user">
            <ArchievedUser />
          </PrivateRoute>

          <PrivateRoute path="/active-user">
            <ActiveUser />
          </PrivateRoute>

          {/* ------------------- RHU Routes ---------- */}
          <PrivateRoute path="/rhuUser">
            <RhuUser />
          </PrivateRoute>
          <PrivateRoute path="/addRhuUser">
            <AddRhuUser />
          </PrivateRoute>
          <PrivateRoute path="/editRhuUser/:id">
            <EditRhuUser />
          </PrivateRoute>
          {/* --------------------- Not Private Routes* --------------------- */}
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/createQRCode">
            <CreateQRCode />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </AuthState>
  );
};

export default App;
