import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./views/login";
import SingIn from "./views/singIn";
import ClientDashboard from "./components/dashboards/client/dahsboard";
import WaiterDashboard from "./components/dashboards/waiters/dashboard";
import ChefDashboard from "./components/dashboards/chef/dashboard";
import AdminDashboard from "./components/dashboards/admin/dashboard";
import { useSelector } from "react-redux";
import PublicHome from "./views/public_home/public";
import img from "./images/restaurant.jpg";
import img2 from "./images/img-login.jpg";
export default function Routers() {
  return (
    <Router>
      <Switch>
        <Route path={"/"} exact={true}>
          <PublicHome />
        </Route>
        <Route path={"/login"} exact={true}>
          <div
            style={{ backgroundImage: `url(${img2})` }}
            className="dashboard-background-img"
          ></div>
          <Login />
        </Route>
        <Route path={"/singIn"} exact={true}>
          <div
            style={{ backgroundImage: `url(${img2})` }}
            className="dashboard-background-img"
          ></div>
          <SingIn />
        </Route>
        <PrivateRoute path={"/dashboard"}>
          <div
            style={{ backgroundImage: `url(${img})` }}
            className="dashboard-background-img"
          ></div>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useSelector((state) => state.authReducer.token);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    ></Route>
  );
}

function Dashboard() {
  const rol = useSelector((state) => state.authReducer.rol);

  if (rol.toLowerCase() === "cliente") {
    return <ClientDashboard />;
  }
  if (rol.toLowerCase() === "administrador") {
    return <AdminDashboard />;
  }
  if (rol.toLowerCase() === "cocinero") {
    return <ChefDashboard />;
  }
  if (rol.toLowerCase() === "mesero") {
    return <WaiterDashboard />;
  }
}
