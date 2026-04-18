---
name: 'Step 01 - Estructura del Evento'
description: 'Diseña la estructura completa del evento con todos los campos necesarios'
---

# Step 1: Estructura del Evento

## STEP GOAL

Diseñar la estructura completa del evento incluyendo todos los campos necesarios para reconstruir el estado.

## INSTRUCTIONS

1. Definir estructura base del evento
2. Incluir campos de identificación (id único global UUID)
3. Definir tipos de eventos (create, update, delete)
4. Incluir payload con datos de la operación
5. Agregar metadatos (timestamp, device_id, version)
6. Documentar cómo los eventos permiten reconstruir el estado

## CONTEXT

- **From arch-state:** Modelo de datos, entidades, esquema
- **From arch-sync:** Estrategias de sincronización
- **Core Requirements:** {core_requirements}

## EVENT STRUCTURE

### Estructura Base del Evento
```json
{
  "id": "uuid-global-unico",
  "type": "create|update|delete",
  "entity": "producto|cliente|venta|stock",
  "entity_id": "uuid",
  "payload": {
    // Datos de la operación
    "before": {}, // Estado anterior (para updates/deletes)
    "after": {},  // Estado nuevo (para creates/updates)
    "changes": [] // Campos modificados
  },
  "timestamp": "ISO8601",
  "device_id": "uuid-del-dispositivo",
  "version": "integer",
  "correlation_id": "uuid-para-relacionar-eventos",
  "causation_id": "uuid-evento-que-origino-este"
}
```

### Generación de ID Único Global
- Usar UUID v4 o UUID v7 (timestamp-based)
- Incluir device_id como parte del namespace si es necesario
- Garantizar que no haya colisiones entre dispositivos

### Tipos de Evento
- **create:** Nueva entidad creada
- **update:** Entidad modificada (incluir cambios)
- **delete:** Entidad eliminada (soft delete para mantener historial)

### Payload por Tipo
```javascript
// Create
{
  "after": { "nombre": "Producto", "precio": 100 }
}

// Update
{
  "before": { "precio": 100 },
  "after": { "precio": 120 },
  "changes": ["precio"]
}

// Delete
{
  "before": { "nombre": "Producto", "activo": true }
}
```

## COMPLETION CRITERIA

- Estructura de evento completa y consistente
- ID único global definido
- Tipos de evento especificados
- Payload claro para cada tipo
- Capacidad de reconstruir estado documentada

## OUTPUT

Documentar estructura del evento.