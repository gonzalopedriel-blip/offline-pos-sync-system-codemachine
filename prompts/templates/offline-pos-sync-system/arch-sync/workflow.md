---
name: 'Sync Architect Workflow'
description: 'Diseña el mecanismo de sincronización bidireccional y estrategias de resolución de conflictos'
---

# Sync Architect - Workflow

## CONTEXT

**From arch-state:** Modelo de datos local con entidades, esquemas y metadatos de sincronización

**Sync Constraints:**
- Desconexión prolongada (días)
- Múltiples dispositivos operando en paralelo
- Conflictos concurrentes en los mismos datos

**Core Requirements:**
- consistencia eventual: Los datos se sincronizan cuando hay conexión
- offline-first: El sistema debe funcionar completamente sin conexión
- resolución de conflictos: Manejo de conflictos cuando hay cambios simultáneos

## GOAL

Diseñar un sistema de sincronización bidireccional completo basado en eventos, incluyendo:
- Flujo de sincronización (offline → enqueue → reconexión → sync → reconciliación)
- Estructura de cola de eventos persistente
- Estrategias de resolución de conflictos diferenciadas por tipo de dato
- Mecanismos de retry con backoff
- Manejo de reconexión y fallos de red

## INSTRUCTIONS (All Steps)

1. Analizar el modelo de datos y requisitos de sincronización
2. Diseñar el flujo de sincronización completo
3. Definir estrategias de resolución de conflictos
4. Especificar mecanismos de retry y manejo de fallos
5. Definir estructura exacta de evento (event_id, entity_id, type, payload, timestamp, device_id)
6. Especificar mecanismo de ordenamiento de eventos (por timestamp, logical clock, o vector clock)
7. Definir estrategia de deduplicación e idempotencia (event_id como clave única)
8. Diseñar cómo se garantiza que los eventos se apliquen en el orden correcto
9. Definir protocolo de sincronización cliente-servidor paso a paso (push local → confirmación → pull remoto → reconciliación)
10. Especificar cómo se identifican los cambios (cursor, last_sync, checkpoints)
11. Definir qué pasa si la sincronización se interrumpe a mitad
12. Definir estrategias específicas por entidad:
   - productos: (ej: last-write-wins o merge)
   - stock: (event-based, nunca overwrite)
   - ventas: (append-only, nunca modificar)
13. Especificar qué datos son inmutables vs mutables

## STEPS OVERVIEW

| Step | Purpose |
|------|---------|
| 1 | Análisis de requisitos de sincronización |
| 2 | Diseño del flujo de sincronización |
| 3 | Estrategias de resolución de conflictos |

## SUCCESS CRITERIA

- Flujo de sincronización completo y detallado paso a paso
- Uso explícito de cola de eventos persistente
- Idempotencia claramente definida
- Estrategias de conflicto diferenciadas según tipo de dato
- Manejo de reconexión y fallos de red contemplado
- Sincronización incremental implementada (no basada en estado completo)

## AVOID (Failure Indicators)

- Sincronización basada en estado completo
- Ausencia de cola de eventos
- No definir idempotencia
- Uso de "last-write-wins" como única estrategia
- No considerar múltiples dispositivos
- No contemplar fallos de red o reconexión
- Dependencia fuerte del backend para resolver conflictos

## OUTPUT FORMAT (MANDATORY)

### 1. Sync Architecture Overview
- Descripción del flujo completo

### 2. Event Structure
Ejemplo JSON:
```json
{
  "event_id": "uuid",
  "entity": "product",
  "entity_id": "uuid",
  "type": "update",
  "payload": {},
  "timestamp": "iso",
  "device_id": "device-1"
}
```

## FINAL OUTPUT

Write final output to `.codemachine/artifacts/arch-sync-output.md`