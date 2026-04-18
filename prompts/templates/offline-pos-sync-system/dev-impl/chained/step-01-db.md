---
name: 'Step 01 - Base de Datos Local'
description: 'Implementa la base de datos local con modelo de entidades'
---

# Step 1: Base de Datos Local

## STEP GOAL

Implementar la base de datos local utilizando IndexedDB o SQLite según el entorno.

## INSTRUCTIONS

1. Configurar IndexedDB/SQLite para el entorno
2. Crear stores/tablas para cada entidad
3. Implementar modelo de entidades con metadatos de sincronización
4. Crear índices para búsquedas eficientes
5. Implementar operaciones CRUD básicas

## CONTEXT

**From arch-state:** Esquemas de entidades (productos, clientes, ventas, stock) con metadatos

## IMPLEMENTATION

### Configuración de IndexedDB

```javascript
// db.js - Módulo de base de datos local

const DB_NAME = 'offline-pos';
const DB_VERSION = 1;

class LocalDatabase {
  constructor() {
    this.db = null;
  }

  async init() {
    this.db = await indexedDB.open(DB_NAME, DB_VERSION);
    
    // Crear stores para cada entidad
    this.db.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Productos
      if (!db.objectStoreNames.contains('productos')) {
        const store = db.createObjectStore('productos', { keyPath: 'id' });
        store.createIndex('sku', 'sku', { unique: true });
        store.createIndex('categoria', 'categoria_id', { unique: false });
        store.createIndex('sync_status', 'sync_status', { unique: false });
      }
      
      // Clientes
      if (!db.objectStoreNames.contains('clientes')) {
        const store = db.createObjectStore('clientes', { keyPath: 'id' });
        store.createIndex('email', 'email', { unique: false });
      }
      
      // Ventas
      if (!db.objectStoreNames.contains('ventas')) {
        const store = db.createObjectStore('ventas', { keyPath: 'id' });
        store.createIndex('fecha', 'fecha', { unique: false });
        store.createIndex('cliente', 'cliente_id', { unique: false });
      }
      
      // Stock
      if (!db.objectStoreNames.contains('stock')) {
        const store = db.createObjectStore('stock', { keyPath: 'id' });
        store.createIndex('producto', 'producto_id', { unique: true });
      }
    };
  }

  // CRUD para Productos
  async createProducto(producto) {
    return await this.db.transaction('productos', 'readwrite')
      .objectStore('productos')
      .add(producto);
  }

  async getProducto(id) {
    return await this.db.transaction('productos', 'readonly')
      .objectStore('productos')
      .get(id);
  }

  async updateProducto(producto) {
    return await this.db.transaction('productos', 'readwrite')
      .objectStore('productos')
      .put(producto);
  }

  async deleteProducto(id) {
    return await this.db.transaction('productos', 'readwrite')
      .objectStore('productos')
      .delete(id);
  }
}
```

### Modelo de Entidades con Metadatos

```javascript
// Entidad Producto con metadatos de sincronización
function createProducto(data) {
  return {
    id: generateUUID(),
    sku: data.sku,
    nombre: data.nombre,
    precio: data.precio,
    version: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    device_id: getDeviceId(),
    sync_status: 'pending'
  };
}
```

## COMPLETION CRITERIA

- Base de datos local funcional
- Operaciones CRUD implementadas
- Metadatos de sincronización incluidos
- Índices creados para búsquedas eficientes

## OUTPUT

Implementar base de datos local.