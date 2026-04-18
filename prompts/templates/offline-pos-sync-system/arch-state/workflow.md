---
name: 'State Architect Workflow'
description: 'Diseña la arquitectura de datos local y modelo de entidades para el sistema POS offline-first'
---

# State Architect - Workflow

## CONTEXT

**Project Name:** {project_name}

**System Description:** {system_description}

**Core Requirements:**
- offline-first: El sistema debe funcionar completamente sin conexión
- multi-dispositivo: Múltiples dispositivos pueden operar simultáneamente
- consistencia eventual: Los datos se sincronizan cuando hay conexión
- resolución de conflictos: Manejo de conflictos cuando hay cambios simultáneos

**Data Entities Scope:**
- productos
- clientes
- ventas
- stock

**Sync Constraints:**
- Desconexión prolongada (días)
- Múltiples dispositivos operando en paralelo
- Conflictos concurrentes en los mismos datos

## GOAL

Diseñar un modelo de datos local completo y robusto para el sistema POS offline-first, incluyendo:
- Entidades principales con esquema detallado
- Metadatos de sincronización (version, timestamp, device_id)
- Identificadores únicos globales (UUID)
- Consideración de escenarios offline prolongados
- Preparación para integración con sistema de eventos
- Definir estructura compatible con sistema event-driven (event sourcing ready)

## INSTRUCTIONS (All Steps)

1. Analizar requisitos de datos del sistema POS offline-first
2. Diseñar modelo de entidades con todas las propiedades necesarias
3. Incluir metadatos de sincronización en cada entidad
4. Definir identificadores únicos que funcionen offline
5. Documentar relaciones entre entidades
6. Justificar decisiones de diseño considerando almacenamiento local y sincronización
7. Definir esquema de base de datos explícito (tablas/collections, campos, tipos)
8. Incluir ejemplo concreto de cada entidad (JSON)
9. Definir estrategia de versionado (timestamp vs version incremental)
10. Especificar cómo se relacionan las entidades con el sistema de eventos
11. Definir campos obligatorios para sincronización (event_id, updated_at, device_id)
12. Diseñar el modelo considerando queries offline eficientes (sin joins complejos)

## STEPS OVERVIEW

| Step | Purpose |
|------|---------|
| 1 | Análisis de requisitos de datos |
| 2 | Diseño del modelo de entidades |
| 3 | Documentación y especificaciones técnicas |

## SUCCESS CRITERIA

- Modelo de entidades completo y coherente
- Todas las entidades incluyen metadatos para sincronización
- Identificadores únicos definidos correctamente
- Esquema listo para integrarse con sistema de eventos
- Consideración explícita de escenarios offline prolongados

## AVOID (Failure Indicators)

- Uso de IDs no únicos o dependientes del backend
- Falta de versionado o metadata de sincronización
- Modelo incompatible con múltiples dispositivos
- No considerar almacenamiento local real (IndexedDB/SQLite)
- Diseño tipo CRUD tradicional sin adaptación a offline-first
- No definir estructura concreta de datos (solo descripciones)
- Ignorar relación entre entidades y eventos
- Diseñar sin considerar queries offline reales

## OUTPUT FORMAT (MANDATORY)

El output DEBE seguir esta estructura exacta:

### 1. Database Technology Choice
- Elección: (IndexedDB / SQLite)
- Justificación técnica

### 2. Entidades y Esquema

Para cada entidad:
- Nombre
- Campos (nombre, tipo, descripción)
- Metadata de sincronización incluida

Ejemplo (JSON):
```json
{
  "id": "uuid",
  "name": "Producto A",
  "price": 100,
  "updated_at": "timestamp",
  "device_id": "device-123",
  "version": 1
}
```

## FINAL OUTPUT

Write final output to `.codemachine/artifacts/arch-state-output.md`