import { environment } from 'src/app/environments/environment';

export const API_URLS = {
  usuarios: {
    postRegistrarUsuario: `${environment.apiUrl}/usuario/registrarUsuario`,
    postLogin: `${environment.apiUrl}/sesion/iniciarSesion`,

  },
  productos: {
    getTodosProductos: `${environment.apiUrl}/productos/todosLosProductos`,
    getProductosXCategoria: (categoriaId: string) => `${environment.apiUrl}/productos/productosPorCategoria/${categoriaId}`,
    postProducto: `${environment.apiUrl}/crearProducto`,
  },
  categorias: {
    getTodasCategorias: `${environment.apiUrl}/categorias/todosLasCategorias`,
    postCategoria: `${environment.apiUrl}/categorias/crearCategoria`,
    putActualizarCategoria: (categoriaId: string) => `${environment.apiUrl}/categorias/actualizarCategoria/${categoriaId}`,
    deleteEliminarCategoria: (categoriaId: string) => `${environment.apiUrl}/categorias/eliminarCategoria/${categoriaId}`
  },
  listaDePrecios: {
    getPrecios: `${environment.apiUrl}/listaDePrecio/precios`,
    getPreciosOrdenadosPorNombre: `${environment.apiUrl}/listaDePrecio/preciosOrdenadosPorNombre`,
    getPreciosOrdenadosPorPrecio: `${environment.apiUrl}/listaDePrecio/preciosOrdenadosPorPrecio`,
    getPreciosPorCategoria: (categoriaId: string) => `${environment.apiUrl}/listaDePrecio/preciosPorCategoria/${categoriaId}`,
    getPreciosOrdenadosPorRango: `${environment.apiUrl}/listaDePrecio/preciosOrdenadosPorRango`,
    getPreciosFiltrados: `${environment.apiUrl}/listaDePrecio/preciosFiltrados`,
  },
};
