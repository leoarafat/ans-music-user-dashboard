import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Error from "../Pages/Error/Error";
import SignIn from "../Pages/Shared/Login/SignIn";
import SignUp from "../Pages/Shared/SignUp/SignUp";
import ForgetPassword from "../Pages/Shared/ForgetPassword/ForgetPassword";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import EmailVarify from "../Pages/Shared/Login/OTPLogin";
import MyUploads from "../Pages/MyUploads/MyUploads";
import DashBoard from "../Pages/DashBoard/DashBoard";
import UploadMusic from "../Pages/UploadMusic/UploadMusic";
import Manage from "../Pages/Manage/Manage";
import Financial from "../Pages/Financial/Financial";
import YoutubeRequest from "../Pages/YoutubeRequest/YoutubeRequest";
import MyProfile from "../Pages/MyProfile/MyProfile";
import Legal from "../Pages/Legal/Legal";
import Help from "../Pages/Help/Help";
import Setting from "../Pages/Setting/Setting";
import VarificationPage from "../Pages/VarificationPage/VarificationPage";
import VarificationRoute from "./VarificationRoute/VarificationRoute";
import Analytice from "../Pages/Analytics/Analytice";
import MyUploadPage from "../Pages/MyUploads/MyUploadPage";
import ViewDetails from "../Pages/MyUploads/ViewDetails/ViewDetails";
import EditDetails from "../Pages/MyProfile/EditDetails";
import UploadEditDetails from "../Pages/MyUploads/UploadEditDetails/UploadEditDetails";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <DashboardLayout></DashboardLayout>,
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: (
          <VarificationRoute>
            <DashBoard></DashBoard>
          </VarificationRoute>
        ),
      },
      {
        path: "/upload",
        element: (
          <VarificationRoute>
            <PrivateRoute>
              <UploadMusic></UploadMusic>
            </PrivateRoute>
          </VarificationRoute>
        ),
      },
      {
        path: "/manage",
        element: (
          <PrivateRoute>
            <Manage></Manage>
          </PrivateRoute>
        ),
      },
      {
        path: "/financial",
        element: (
          <PrivateRoute>
            <Financial></Financial>
          </PrivateRoute>
        ),
      },
      {
        path: "/analytics",
        element: (
          <PrivateRoute>
            <Analytice></Analytice>
          </PrivateRoute>
        ),
      },
      {
        path: "/youtube-request",
        element: (
          <PrivateRoute>
            <YoutubeRequest></YoutubeRequest>
          </PrivateRoute>
        ),
      },
      {
        path: "/legal",
        element: (
          <PrivateRoute>
            <Legal></Legal>
          </PrivateRoute>
        ),
      },
      {
        path: "/help",
        element: (
          <PrivateRoute>
            <Help></Help>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-upload",
        element: (
          <PrivateRoute>
            <MyUploadPage></MyUploadPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-upload/:id",
        element: (
          <PrivateRoute>
            <ViewDetails></ViewDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-upload/correction/:id",
        element: (
          <PrivateRoute>
            <UploadEditDetails></UploadEditDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile-verification",
        element: (
          <PrivateRoute>
            <VarificationPage></VarificationPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <Setting></Setting>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: <SignIn></SignIn>,
  },
  {
    path: "/sign-up",
    element: <SignUp></SignUp>,
  },
  {
    path: "/email-verify",
    element: <EmailVarify></EmailVarify>,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword></ForgetPassword>,
  },
]);

export default router;
