---
name: 'Events Architect Workflow'
description: 'Diseña el sistema de eventos como componente central del workflow'
---

# Events Architect - Workflow

## CONTEXT

**From arch-state:** Modelo de datos local con entidades y metadatos

**From arch-sync:** Flujo de sincronización, estrategias de resolución de conflictos

**Core Requirements:**
- consistencia eventual: Los datos se sincronizan cuando hay conexión
- offline-first: El sistema debe funcionar completamente sin conexión

## GOAL

Diseñar un sistema de eventos robusto y persistente como fuente de verdad, incluyendo:
- Estructura completa del evento
- Cola de eventos persistente
- Pipeline de procesamiento
- Estados del evento
- Mecanismos de idempotencia
- Permitir reconstrucción completa del estado desde eventos sin depender del backend

## INSTRUCTIONS (All Steps)

1. Diseñar estructura del evento
2. Diseñar pipeline de procesamiento
3. Definir estados del evento y transiciones
4. Diseñar estructura de almacenamiento del event store (IndexedDB/SQLite)
5. Definir cómo se persisten los eventos (tabla/colección, índices)
6. Especificar cómo se recuperan eventos por entidad (entity_id)
7. Definir cómo se procesan eventos (consumer loop, polling o triggers)
8. Especificar cómo se aplican eventos al estado local
9. Definir cómo se manejan eventos fallidos (retry, dead-letter)
10. Diseñar mecanismo de reconstrucción de estado desde eventos (event replay)
11. Definir cuándo se usa snapshot vs replay completo
12. Especificar cómo se mantiene consistencia durante replay
13. Definir tipos de eventos (create, update, delete, transaction)
14. Especificar qué eventos son inmutables
15. Definir estructura de payload por tipo de evento

## STEPS OVERVIEW

| Step | Purpose |
|------|---------|
| 1 | Diseño de estructura del evento |
| 2 | Pipeline de procesamiento |
| 3 | Estados del evento y transiciones |

## SUCCESS CRITERIA

- Estructura de evento claramente definida y consistente
- IDs únicos globales correctamente implementados
- Orden de eventos garantizado o justificado
- Idempotencia asegurada en cliente y backend
- Pipeline completo de vida del evento definido
- Estados del evento bien especificados

## AVOID (Failure Indicators)

- Eventos sin identificador único global
- Falta de estados de evento
- No definir pipeline completo
- No garantizar orden o asumir orden implícito
- No contemplar duplicados
- Eventos dependientes del backend para validación
- Diseño que no permite reconstruir el estado

## OUTPUT FORMAT (MANDATORY)

### 1. Event Store Design
- Tecnología (IndexedDB / SQLite)
- Estructura de almacenamiento

### 2. Event Structure
```json
{
  "event_id": "uuid",
  "entity": "product",
  "entity_id": "uuid",
  "type": "update",
  "payload": {},
  "timestamp": "iso",
  "device_id": "device-1",
  "status": "pending"
}
```

## FINAL OUTPUT

Write final output to `.codemachine/artifacts/arch-events-output.md`