import ReactDOM from 'react-dom/client';
import { AppCulturaProvider } from './context/AppCulturaContext';
import { AppProdutorProvider } from './context/AppProdutorContext';
import './index.css';
import ProdutorList from './pages/ProdutorList';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AppProdutorProvider>
    <AppCulturaProvider>
      <ProdutorList />
    </AppCulturaProvider>
  </AppProdutorProvider>
);

reportWebVitals();
