import { Route, Switch } from "react-router";
import StartPage from "./components/StartPage/StartPage";

import "./App.css";
import OrderPage from "./components/OrderPage/OrderPage";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/aptapta" component={StartPage} />
        <Route exact path="/" component={StartPage} />
        <Route path="/order" component={OrderPage} />
      </Switch>
    </div>
  );
};

export default App;
