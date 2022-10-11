import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import { ProtectedRoutes } from "./helpers/protected.routes";
import { IsUserLoggedIn } from "./helpers/isUserLoggedIn";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./store/user/user.selector";
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const NotFound = lazy(() => import("./pages/not-found"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));

const App = () => {
  const user = useSelector(selectCurrentUser);
  return (
    //<UserContext.Provider value={user}>
    <Suspense fallback={<p>Loading....</p>}>
      <Routes>
        <Route exact path="/" element={<IsUserLoggedIn user={user} />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        </Route>
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route exact path="/" element={<ProtectedRoutes user={user} />}>
          <Route exact path={ROUTES.DASHBOARD} element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    //</UserContext.Provider>
  );
};

export default App;
