import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Done from "./views/Done";
import Landing from "./views/Landing";
import Loans from "./views/Loans";
import Profile from "./views/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Transactions from "./views/Transactions";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={Landing} path="/" />
        <PrivateRoute exact component={Loans} path="/loans" />
        <PrivateRoute exact component={Profile} path="/account" />
        <PrivateRoute exact component={Transactions} path="/transactions" />
        <Route exact component={Done} path="/done" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
