/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from 'pages/dashboard';
import NoMatchDashboard from './pages/dashboard/no-match-dashboard';
const Home = React.lazy(() => import(/*webpackPrefetch:true */ 'pages/home'));
const RoleManage = React.lazy(
  () => import(/*webpackPrefetch:true */ 'pages/role-manage'),
);
const ResourceManage = React.lazy(
  () => import(/*webpackPrefetch:true */ 'pages/resource-manage'),
);
const UserManage = React.lazy(
  () => import(/*webpackPrefetch:true */ 'pages/user-manage'),
);
const RoleList = React.lazy(
  () => import(/*webpackPrefetch:true */ 'pages/role-list'),
);
const SuperOrgManagement = React.lazy(
  () =>
    import(
      /*webpackPrefetch:true*/ 'pages/org-management/super-org-management'
    ),
);
const CommonOrgManagement = React.lazy(
  () =>
    import(
      /*webpackPrefetch:true*/ 'pages/org-management/common-org-management'
    ),
);
const AddNewDirectory = React.lazy(
  () => import(/*webpackPrefetch:true*/ 'pages/add-new-directory'),
);

// const DirectoryBinding = React.lazy(() => /*webpackPrefetch:true*/ 'pages/')

function AuthenticatedApp() {
  return (
    <Dashboard>
      <React.Suspense fallback={<div>页面加载中...</div>}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/role-manage">
            <RoleManage />
          </Route>
          <Route path="/resource-manage">
            <ResourceManage />
          </Route>
          <Route path="/user-manage">
            <UserManage />
          </Route>
          <Route path="/role-list">
            <RoleList />
          </Route>
          <Route path="/super-org-management">
            <SuperOrgManagement />
          </Route>
          <Route path="/common-org-management">
            <CommonOrgManagement />
          </Route>
          <Route path="/add-new-directory">
            <AddNewDirectory />
          </Route>
          <Route>
            <NoMatchDashboard />
          </Route>
        </Switch>
      </React.Suspense>
    </Dashboard>
  );
}

export default AuthenticatedApp;
