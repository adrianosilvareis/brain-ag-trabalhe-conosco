import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppCulturaProvider } from './context/AppCulturaContext';
import { AppProdutorProvider } from './context/AppProdutorContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import Dashboard from './pages/Dashboard';
import ProdutorList from './pages/ProdutorList';
import ProdutorPage from './pages/ProdutorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/new',
        element: <ProdutorPage />
      },
      {
        path: '/:id',
        element: <ProdutorPage />
      },
      {
        path: '/list',
        element: <ProdutorList />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AppProdutorProvider>
    <AppCulturaProvider>
      <RouterProvider router={router} />
    </AppCulturaProvider>
  </AppProdutorProvider>
);

reportWebVitals();
