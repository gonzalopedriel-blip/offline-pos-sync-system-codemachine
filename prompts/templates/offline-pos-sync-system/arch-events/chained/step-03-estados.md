---
name: 'Step 03 - Estados del Evento y Transiciones'
description: 'Define estados del evento y diagrama de transiciones'
---

# Step 3: Estados del Evento y Transiciones

## STEP GOAL

Definir los estados del evento y el diagrama de transiciones para el ciclo de vida completo.

## INSTRUCTIONS

1. Definir estados del evento (pending, sent, confirmed, failed)
2. Crear diagrama de transiciones
3. Especificar condiciones de transición
4. Definir acciones en cada estado
5. Documentar idempotencia y deduplicación

## INPUT FROM STEP 2

Pipeline de procesamiento diseñado.

## EVENT STATES

### Estados del Evento

| Estado | Descripción | siguiente |
|--------|-------------|-----------|
| `created` | Evento creado, en validación | validated / failed |
| `validated` | Evento validado, listo para enqueue | enqueued / failed |
| `enqueued` | En cola local, esperando envío | sending / failed |
| `sending` | En proceso de envío al backend | confirmed / pending / failed |
| `confirmed` | Recibido y procesado por backend | (final) |
| `failed` | Falló permanentemente | (final - requiere intervención) |

### Diagrama de Transiciones

```
created → validated → enqueued → sending → confirmed
                              ↓           ↓
                            retry      pending
                              ↓           ↓
                           failed      (reintento)
```

### Condiciones de Transición

```javascript
// created → validated
if (estructuraValida && camposRequeridosOK) {
  nextState = 'validated';
}

// validated → enqueued
if (persistidoEnColaLocal) {
  nextState = 'enqueued';
}

// enqueued → sending
if (conexionDetectada && eventosPendientes > 0) {
  nextState = 'sending';
}

// sending → confirmed
if (backendAckRecibido) {
  nextState = 'confirmed';
}

// sending → pending (retry)
if (timeout || errorRecuperable) {
  nextState = 'pending';
  retryCount++;
}

// sending → failed
if (maxRetriesExcedido || errorNoRecuperable) {
  nextState = 'failed';
}
```

### Idempotencia

**En Cliente:**
- Generar event_id basado en: entity_id + operation + timestamp + device_id
- Antes de crear evento, verificar si ya existe en cola local

**En Backend:**
- Verificar event_id en tabla de eventos procesados
- Si existe, retornar éxito sin reprocesar

```javascript
// Cliente - generar event_id idempotente
function generateEventId(entityId, operation, timestamp, deviceId) {
  return sha256(`${entityId}:${operation}:${timestamp}:${deviceId}`);
}

// Backend - verificar idempotencia
function isIdempotent(eventId) {
  const existente = db.events.find({ id: eventId });
  return existente !== null;
}
```

### Deduplicación
- Mantener índice de event_ids procesados
- Limpiar eventos old confirmed periódicamente
- Manejar ventana de deduplicación (ej: 24 horas)

## COMPLETION CRITERIA

- Estados claramente definidos
- Transiciones documentadas
- Idempotencia asegurada
- Deduplicación especificada

## FINAL OUTPUT

Guardar en `.codemachine/artifacts/arch-events-output.md`