import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {ROUTES} from "./constants/routes";


const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));

const  App = () => {
  return (
    <Router>
      <Suspense fallback={<p>Loading....</p>}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
