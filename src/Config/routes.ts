import HomeFeed from "../Pages/HomeFeed";
import ExploreFeed from "../Pages/ExploreFeed";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Register2 from "../Pages/Register2";
import IRoute from "../Interfaces/route";
import ForgotPassword from "../Pages/ForgotPassword";
import ChangePassword from "../Pages/ChangePassword";
import ProfilePage from "../Pages/Profile";
import ProfilePage1 from "../Pages/Profile1";

import ResetPasswordPage from "../Pages/ResetPassword";
import SharePost from "../Pages/Share";
import PostPage from "../Pages/PostPage";


const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: HomeFeed,
        protected: true
    },
    {
        path: '/login',
        exact: true,
        component: Login,
        protected: false
    },
    {
        path: '/reset',
        exact: true,
        component: ForgotPassword,
        protected: false
    },
    {
        path: '/reset-password',
        exact: true,
        component: ResetPasswordPage,
        protected: false
    },
    {
        path: '/register',
        exact: true,
        component: Register,
        protected: false
    },
    {
        path: '/create-account',
        exact: true,
        component: Register2,
        protected: true
    },
    {
        path: '/change-password',
        exact: true,
        component: ChangePassword,
        protected: true
    },
    {
        path: '/explore',
        exact: true,
        component: ExploreFeed,
        protected: true
    },
    {
        path: '/share',
        exact: true,
        component: SharePost,
        protected: true
    },
    {
        path: '/profile',
        exact: true,
        component: ProfilePage,
        protected: true
    },
    {
        path: '/profile/:uid',
        exact: true,
        component: ProfilePage1,
        protected: true
    },
    {
        path: '/post/:postId',
        exact: true,
        component: PostPage,
        protected: true
    },

] 

export default routes;