import mongoose from 'mongoose';
/*

*/
// Definición del esquema de productos
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Electronics', 'Clothing', 'Food', 'Other'], // Categorías predefinidas
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    }
}, 
{
    versionKey: false
});

// Creación del modelo basado en el esquema
const Product = mongoose.model('Product', productSchema);

export { Product };
