import ReactDOM from 'react-dom/client';
import { AppCulturaProvider } from './context/AppCulturaContext';
import { AppProdutorProvider } from './context/AppProdutorContext';
import './index.css';
import ProdutoPage from './pages/ProdutorPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AppProdutorProvider>
    <AppCulturaProvider>
      <ProdutoPage />
    </AppCulturaProvider>
  </AppProdutorProvider>
);

reportWebVitals();
