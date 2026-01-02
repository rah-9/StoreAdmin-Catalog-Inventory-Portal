import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CataloguePage from './pages/CataloguePage';
import CategoryProductsPage from './pages/CategoryProductsPage';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/catalogue" element={<CataloguePage />} />
                <Route path="/catalogue/:category" element={<CategoryProductsPage />} />
            </Route>
        </Routes>
    );
}

export default App;
