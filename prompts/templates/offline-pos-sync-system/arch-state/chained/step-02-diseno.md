---
name: 'Step 02 - Diseño del Modelo de Entidades'
description: 'Diseña el modelo de entidades con esquemas detallados'
---

# Step 2: Diseño del Modelo de Entidades

## STEP GOAL

Diseñar el modelo de entidades completo con esquemas detallados incluyendo metadatos de sincronización.

## INSTRUCTIONS

1. Crear esquema para cada entidad (productos, clientes, ventas, stock)
2. Incluir siempre metadatos de sincronización:
   - id: UUID único global
   - version: número de versión
   - created_at: timestamp de creación
   - updated_at: timestamp de última modificación
   - device_id: identificador del dispositivo
   - sync_status: estado de sincronización
3. Definir relaciones entre entidades
4. Justificar decisiones de diseño
5. Considerar límites de IndexedDB/SQLite local

## INPUT FROM STEP 1

Análisis de requisitos de datos completado.

## SCHEMA DESIGN

### Entidad: Producto
```json
{
  "id": "uuid",
  "sku": "string",
  "nombre": "string",
  "descripcion": "string",
  "precio": "decimal",
  "categoria_id": "uuid",
  "stock": "integer",
  "imagen_url": "string",
  "activo": "boolean",
  // Metadatos de sincronización
  "version": "integer",
  "created_at": "timestamp",
  "updated_at": "timestamp",
  "device_id": "string",
  "sync_status": "pending|synced|conflict"
}
```

### Entidad: Cliente
```json
{
  "id": "uuid",
  "nombre": "string",
  "email": "string",
  "telefono": "string",
  "direccion": "string",
  "nit": "string",
  // Metadatos de sincronización
  "version": "integer",
  "created_at": "timestamp",
  "updated_at": "timestamp",
  "device_id": "string",
  "sync_status": "pending|synced|conflict"
}
```

### Entidad: Venta
```json
{
  "id": "uuid",
  "cliente_id": "uuid|null",
  "fecha": "timestamp",
  "total": "decimal",
  "estado": "pending|completed|cancelled",
  "metodo_pago": "string",
  "lineas": [
    {
      "producto_id": "uuid",
      "cantidad": "integer",
      "precio_unitario": "decimal",
      "subtotal": "decimal"
    }
  ],
  // Metadatos de sincronización
  "version": "integer",
  "created_at": "timestamp",
  "updated_at": "timestamp",
  "device_id": "string",
  "sync_status": "pending|synced|conflict"
}
```

### Entidad: Stock
```json
{
  "id": "uuid",
  "producto_id": "uuid",
  "cantidad": "integer",
  "ubicacion": "string",
  "ultimo_movimiento": "timestamp",
  // Metadatos de sincronización
  "version": "integer",
  "created_at": "timestamp",
  "updated_at": "timestamp",
  "device_id": "string",
  "sync_status": "pending|synced|conflict"
}
```

## COMPLETION CRITERIA

- Esquemas completos para todas las entidades
- Metadatos de sincronización en cada entidad
- Identificadores UUID definidos
- Relaciones documentadas
- Justificación de decisiones técnicas

## OUTPUT

Modelo de entidades completo con esquemas JSON y documentación técnica.