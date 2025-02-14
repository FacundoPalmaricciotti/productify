import axios from "axios";

const BASE_URL_API = "http://localhost:3001/api/products";

const getAllProducts = async () => {
    try {
        const response = await axios.get(BASE_URL_API);
        const products = response.data.map(product => ({
            ...product,
            id: product._id 
        }));
        console.log("📡 Datos recibidos de la API:", products);
        return products;
    } catch (error) {
        console.error("❌ Error obteniendo productos:", error);
        return [];
    }
};


const createProduct = async (productData) => {
    try {
        const response = await axios.post(BASE_URL_API, productData);
        console.log("✅ Producto creado:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error creando producto:", error.response?.data || error.message);
    }
};


const updateProduct = async (id, productData) => {
    try {
        const response = await axios.patch(`${BASE_URL_API}/${id}`, productData);
        console.log("✅ Producto actualizado:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error actualizando producto:", error.response?.data || error.message);
    }
};


const deleteProduct = async (id) => {
    if (!id) {
        console.error("❌ No se puede eliminar: ID indefinido.");
        return;
    }

    try {
        console.log(`🗑 Enviando DELETE a: ${BASE_URL_API}/${id}`);
        await axios.delete(`${BASE_URL_API}/${id}`);
        console.log("✅ Producto eliminado con éxito.");
    } catch (error) {
        console.error("❌ Error eliminando producto:", error.response?.data || error.message);
    }
};

export { getAllProducts, createProduct, updateProduct, deleteProduct };
