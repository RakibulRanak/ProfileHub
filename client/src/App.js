import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from "./components/generic/footer";
import MyNavbar from "./components/generic/navbar";
import ProtectedRoute from "./components/generic/protectedRoutes";
import NotFound from "./pages/404";
import Landing from "./pages/landing";
import Profile from "./pages/profile";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";


import ChangeEmail from "./pages/changeEmail";
import ResetPassword from "./pages/resetPassword";




function App() {
  return (
    <Router>
      <MyNavbar/>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/user/:id" component={Profile}/>
        <ProtectedRoute exact path="/changeemail" component={ChangeEmail}/>
        <Route exact path="/resetpassword/:token" component={ResetPassword}/>
        <Route path="*" component={NotFound} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
