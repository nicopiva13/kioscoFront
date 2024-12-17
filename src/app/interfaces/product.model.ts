export interface Product {
    id_producto: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
    addedToCart?: boolean; // Agrega esta línea,
    quantity: number
}
