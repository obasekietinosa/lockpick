import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { AppLayout } from './components/AppLayout';
import ConfigurePage from './pages/ConfigurePage';
import JoinPage from './pages/JoinPage';
import LandingPage from './pages/LandingPage';
import PinSetupPage from './pages/PinSetupPage';
import PlayPage from './pages/PlayPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'configure', element: <ConfigurePage /> },
      { path: 'join', element: <JoinPage /> },
      { path: 'pins', element: <PinSetupPage /> },
      { path: 'play', element: <PlayPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
