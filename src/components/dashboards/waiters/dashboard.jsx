import React, { lazy, Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Layout from "../../layout/waiter";

const client = [
  {
    path: "",
    exact: true,
    component: lazy(() => import("../../../views/waiters/status")),
  },
  {
    path: "tables",
    exact: true,
    component: lazy(() => import("../../../views/waiters/tables")),
  },
  {
    path: "charge",
    component: lazy(() => import("../../../views/waiters/charge")),
  },
  {
    path: "daily",
    component: lazy(() => import("../../../views/waiters/daily")),
  },
];

export default function Routers() {
  const { url } = useRouteMatch();
  return (
    <Layout>
      <Suspense fallback={<div>Cargando...</div>}>
        <Switch>
          {client.map((route, id) => (
            <Route exact={route.exact} key={id} path={`${url}/${route.path}`}>
              <route.component />
            </Route>
          ))}
        </Switch>
      </Suspense>
    </Layout>
  );
}
