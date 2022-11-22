import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import { ProtectedRoutes } from "./helpers/protected.routes";
import { IsUserLoggedIn } from "./helpers/isUserLoggedIn";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./store/user/user.selector";
import Spinner from "./components/spinner/spinner.component";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const NotFound = lazy(() => import("./pages/not-found"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const UserPost = lazy(() => import("./pages/post-page"));


const App = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <Suspense fallback={<Spinner></Spinner>}>
      <Routes>
        <Route exact path="" element={<Login />} />
        <Route exact path="/" element={<IsUserLoggedIn user={user} />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        </Route>
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.POST} element={<UserPost />} />
        <Route exact path="/" element={<ProtectedRoutes user={user} />}>
          <Route exact path={ROUTES.DASHBOARD} element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
