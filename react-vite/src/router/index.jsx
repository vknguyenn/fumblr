import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage/HomePage';
import ManagePosts from '../components/ManagePosts/ManagePosts';
import Layout from './Layout';
import LikedPosts from '../components/LikedPosts/LikedPosts';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "manage",
        element: <ManagePosts />
      },
      {
        path: "likes",
        element: <LikedPosts />
      },
    ],
  },
]);