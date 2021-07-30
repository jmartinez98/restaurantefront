import React, {lazy, Suspense} from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
// import Tables from '../../../views/client/tables'
import Layout from '../../layout/chef'
// import Dishes from '../../../views/client/dishes'

const client=[
    {
        path:'',
        exact:true,
        component: lazy(()=>import('../../../views/chef/dishes'))
    }
]


export default function Routers() {
    const { url } = useRouteMatch();
    console.log(url)
    return (
        <Layout>
            <Suspense fallback={<div>Cargando...</div>}>
                <Switch>
                    {client.map((route, id)=>(
                        <Route exact={route.exact} key={id} path={`${url}/${route.path}`}>
                            <route.component/>
                        </Route>
                    ))}
                </Switch>
            </Suspense>
            
        </Layout>
    )
}