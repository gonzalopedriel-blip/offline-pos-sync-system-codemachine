---
name: 'Step 02 - Diseño del Flujo de Sincronización'
description: 'Diseña el flujo completo de sincronización basado en eventos'
---

# Step 2: Diseño del Flujo de Sincronización

## STEP GOAL

Diseñar el flujo completo de sincronización incluyendo cola de eventos, proceso de sync, y manejo de reconexión.

## INSTRUCTIONS

1. Diseñar la estructura de la cola de eventos persistente
2. Definir el flujo de sincronización paso a paso:
   - Offline: Enqueue eventos localmente
   - Detección de conexión: Iniciar proceso de sync
   - Envío incremental: Solo eventos pendientes
   - Reconciliación: Manejar conflictos
   - Confirmación: Actualizar estados
3. Especificar manejo de reconexión
4. Definir estrategias de retry con backoff
5. Documentar proceso de recuperación ante fallos

## INPUT FROM STEP 1

Análisis de requisitos de sincronización completado.

## FLOW DESIGN

### Flujo de Sincronización

```
[Estado Offline]
    ↓ (operación local)
[Enqueue Evento]
    ↓ (persistir en cola)
[Cola de Eventos]
    ↓ (detectar conexión)
[Detección de Conexión]
    ↓ (iniciar sync)
[Proceso de Sync]
    ├── [Envío Incremental]
    │   └── eventos no enviados → backend
    ├── [Recibir Cambios]
    │   └── cambios del backend → local
    └── [Reconciliación]
        └── detectar y resolver conflictos
    ↓ (confirmar)
[Actualizar Estados]
    ↓
[Sync Completado]
```

### Cola de Eventos Estructura
```json
{
  "id": "event-uuid",
  "type": "create|update|delete",
  "entity": "producto|cliente|venta|stock",
  "entity_id": "uuid",
  "payload": {},
  "timestamp": "ISO8601",
  "device_id": "string",
  "version": "integer",
  "status": "pending|sent|confirmed|failed",
  "retry_count": "integer",
  "error": "string|null"
}
```

### Mecanismos de Retry
- Backoff exponencial: 1s, 2s, 4s, 8s, 16s, máximo 60s
- Máximo de reintentos: 5
- After max retries: marcar como failed para revisión manual

## COMPLETION CRITERIA

- Flujo de sincronización completo y detallado
- Estructura de cola de eventos definida
- Estrategias de retry especificadas
- Manejo de reconexión documentado

## OUTPUT

Diseñar flujo de sincronización completo.