---
name: 'Step 02 - Sistema de Eventos'
description: 'Implementa el sistema de eventos con cola persistente y pipeline'
---

# Step 2: Sistema de Eventos

## STEP GOAL

Implementar el sistema de eventos con cola persistente, estados, y pipeline de procesamiento.

## INSTRUCTIONS

1. Implementar store de eventos en IndexedDB
2. Crear generador de eventos con ID único
3. Implementar máquina de estados del evento
4. Crear pipeline de procesamiento
5. Implementar idempotencia

## CONTEXT

**From arch-events:** Estructura de eventos, pipeline, estados, idempotencia

## IMPLEMENTATION

### Store de Eventos

```javascript
// events.js - Módulo de eventos

const EVENTS_STORE = 'eventos';

class EventsManager {
  constructor(db) {
    this.db = db;
  }

  // Crear evento
  async createEvent(type, entity, entityId, payload) {
    const event = {
      id: generateEventId(entityId, type, Date.now(), getDeviceId()),
      type: type, // create, update, delete
      entity: entity,
      entity_id: entityId,
      payload: payload,
      timestamp: new Date().toISOString(),
      device_id: getDeviceId(),
      version: 1,
      status: 'created', // created, validated, enqueued, sending, confirmed, failed
      retry_count: 0,
      error: null
    };
    
    await this.db.put(EVENTS_STORE, event);
    return event;
  }

  // Actualizar estado del evento
  async updateEventStatus(eventId, status, error = null) {
    const event = await this.db.get(EVENTS_STORE, eventId);
    if (event) {
      event.status = status;
      event.retry_count = event.retry_count || 0;
      if (error) event.error = error;
      if (status === 'sending') event.retry_count++;
      await this.db.put(EVENTS_STORE, event);
    }
    return event;
  }

  // Obtener eventos pendientes
  async getPendingEvents() {
    return await this.db.getAllFromIndex(EVENTS_STORE, 'status', 'enqueued');
  }

  // Verificar idempotencia
  async isIdempotent(eventId) {
    const existente = await this.db.get(EVENTS_STORE, eventId);
    return existente !== null && existente.status === 'confirmed';
  }
}
```

### Generación de ID de Evento Idempotente

```javascript
function generateEventId(entityId, operation, timestamp, deviceId) {
  // ID basado en contenido para evitar duplicados
  const content = `${entityId}:${operation}:${timestamp}:${deviceId}`;
  return sha256(content).substring(0, 32);
}
```

## COMPLETION CRITERIA

- Sistema de eventos funcional
- Cola persistente implementada
- Estados del evento implementados
- Idempotencia implementada

## OUTPUT

Implementar sistema de eventos.