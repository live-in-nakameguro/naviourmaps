import React from 'react'; //Reactを読み込んでいる
//画面遷移で使用する{ BrowserRouter, Route, Switch }を'react-router-dom'から読み込んでいる
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Test1 from './views/components/Test1'; //作成したTest1.jsを読み込んでいる
import Test2 from './views/components/Test2'; //作成したTest2.jsを読み込んでいる
import TestApi from './views/components/TestApi'; 
import Login from './views/components/Login'; //作成したLogin.jsを読み込んでいる
import SignUp from './views/components/SignUp'; //作成したSignUp.jsを読み込んでいる
import ResetPassword from './views/components/ResetPassword'; //作成したResetPassword.jsを読み込んでいる

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/ResetPassword" component={ResetPassword} />
          <Route exact path="/" component={Test1} />
          <Route exact path="/Test2" component={Test2} />
          <Route exact path="/TestApi" component={TestApi} />
        </Switch>
      </BrowserRouter>
    );
  };
}

export default App;