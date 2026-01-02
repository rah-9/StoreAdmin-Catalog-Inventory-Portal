import api, { createAbortController } from './api';
import { Product, ProductsResponse, Category } from '../types';

const INITIAL_LIMIT = 20;

// Store abort controllers for cancellable requests
let searchAbortController: AbortController | null = null;

export const productService = {
    // Get paginated products
    async getProducts(limit: number = INITIAL_LIMIT, skip: number = 0): Promise<ProductsResponse> {
        const response = await api.get<ProductsResponse>('/products', {
            params: { limit, skip },
        });
        return response.data;
    },

    // Get single product by ID
    async getProduct(id: number): Promise<Product> {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    },

    // Search products with abort support
    async searchProducts(query: string, limit: number = INITIAL_LIMIT, skip: number = 0): Promise<ProductsResponse> {
        // Cancel previous search request
        if (searchAbortController) {
            searchAbortController.abort();
        }

        searchAbortController = createAbortController();

        const response = await api.get<ProductsResponse>('/products/search', {
            params: { q: query, limit, skip },
            signal: searchAbortController.signal,
        });

        return response.data;
    },

    // Get all categories
    async getCategories(): Promise<Category[]> {
        const response = await api.get<Category[]>('/products/categories');
        return response.data;
    },

    // Get products by category
    async getProductsByCategory(
        categorySlug: string,
        limit: number = INITIAL_LIMIT,
        skip: number = 0
    ): Promise<ProductsResponse> {
        const response = await api.get<ProductsResponse>(`/products/category/${categorySlug}`, {
            params: { limit, skip },
        });
        return response.data;
    },

    // Get similar products (same category, excluding current product)
    async getSimilarProducts(product: Product, limit: number = 6): Promise<Product[]> {
        const response = await productService.getProductsByCategory(product.category, limit + 1, 0);
        return response.products.filter(p => p.id !== product.id).slice(0, limit);
    },
};

export default productService;
