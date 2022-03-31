import React, { lazy, Suspense } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Layout from "../../layout/client";

const client = [
  {
    path: "",
    exact: true,
    component: lazy(() => import("../../../views/client/tables")),
  },
  {
    path: "dishes",
    component: lazy(() => import("../../../views/client/dishes")),
  },
  {
    path: "order",
    component: lazy(() => import("../../../views/client/order")),
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
