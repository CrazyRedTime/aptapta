import { Redirect, Route, Switch } from "react-router";
import StartPage from './components/StartPage/StartPage';

import './App.css';
import OrderPage from "./components/OrderPage/OrderPage";



const App = () => {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/aptapta">
          <Redirect to="/"/>
        </Route>
        <Route exact path="/" component={StartPage} />
        <Route path="/orderPage" component={OrderPage} />
      </Switch>
    </div>
  );
}

export default App;
