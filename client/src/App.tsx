import React, { FC, useEffect, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home/Home';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './redux/actions/auth';
import store from './redux/store';
import PrivateRoute from './routing/PrivateRoute';
import Spinner from './components/Spinner/Spinner';
const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));
const Members = lazy(() => import('./pages/Members/Members'));
const Posts = lazy(() => import('./pages/Post/Posts'));
const SinglePost = lazy(() => import('./pages/Post/Post'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const ProfileForm = lazy(() => import('./pages/ProfileForm/ProfileForm'));

const App: FC = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch<any>(loadUser());
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/members" component={Members} />
          <Route path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/create-profile" component={ProfileForm} />
          <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/posts/:id" component={SinglePost} />
        </Suspense>
      </Switch>
    </>
  );
};

export default App;
