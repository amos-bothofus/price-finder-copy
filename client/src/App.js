import { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/auth/login/Login'
import MainApp from './components/mainAppCon/MainApp'

function App() {
  const [auth, setAuth] = useState({ auth: false });
  const setAuthentication = (flage) => {
    setAuth((pre) => ({ ...pre, auth: flage }));
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <MainApp auth={auth} />} />
        <Route
          path="/login"
          exact
          render={() => <Login setAuthentication={setAuthentication} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
