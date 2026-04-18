---
name: 'Developer Workflow'
description: 'Implementa el sistema completo basado en las arquitecturas definidas'
---

# Developer - Workflow

## CONTEXT

**From arch-state:** Modelo de datos local con entidades, esquemas y metadatos

**From arch-events:** Estructura de eventos, pipeline, estados

## GOAL

Implementar el sistema completo de forma incremental y verificable:
1. Base de datos local (IndexedDB o SQLite)
2. Sistema de eventos (cola persistente, estados, pipeline)
3. Motor de sincronización (envío incremental, retry, idempotencia)
4. Integración con Supabase
- Generar una implementación funcional mínima (MVP) lista para ejecución

## INSTRUCTIONS (All Steps)

1. Implementar base de datos local con modelo de entidades
2. Implementar sistema de eventos
3. Implementar motor de sincronización
4. Integrar con backend (Supabase)
5. Implementar código real y funcional (no pseudocódigo)
6. Usar JavaScript/TypeScript para frontend (browser/Electron)
7. Incluir ejemplos de uso de cada módulo
8. Definir estructura de carpetas completa del proyecto
9. Separar módulos claramente:
   - /db (base de datos local)
   - /events (event system)
   - /sync (sync engine)
   - /api (comunicación backend)
10. Definir interfaces entre módulos (qué expone cada uno)
11. Validar cada etapa antes de avanzar (ej: DB funciona antes de eventos)
12. Incluir pequeños ejemplos de ejecución o test por módulo
13. Especificar integración concreta con Supabase (endpoints, tablas, auth si aplica)
14. Definir cómo se envían y reciben eventos desde el backend

## STEPS OVERVIEW

| Step | Purpose |
|------|---------|
| 1 | Implementar base de datos local |
| 2 | Implementar sistema de eventos |
| 3 | Implementar motor de sincronización |
| 4 | Integración con Supabase |

## SUCCESS CRITERIA

- Código respeta la arquitectura definida
- Sistema de eventos implementado correctamente
- Sync engine funcional con retry e idempotencia
- Separación clara de módulos (db, events, sync, api)
- Código listo para extender (no monolítico)
- Manejo básico de errores implementado

## AVOID (Failure Indicators)

- Código que ignora el modelo de eventos
- Sync basado en estado completo
- Lógica mezclada (sin separación de módulos)
- Implementación tipo CRUD tradicional
- Falta de idempotencia o retry
- Código difícil de mantener o escalar

## OUTPUT FORMAT (MANDATORY)

### 1. Project Structure

/db
/events
/sync
/api

### 2. Database Implementation
- Código de inicialización
- Ejemplo de uso

### 3. Event System Implementation
- Definición de evento
- Cola persistente
- Ejemplo de enqueue/process

### 4. Sync Engine Implementation
- Función de sync
- Manejo de retry
- Ejemplo real

### 5. Backend Integration (Supabase)
- Cómo se envían eventos
- Cómo se reciben

### 6. Usage Example
- Flujo completo: crear → evento → sync

## FINAL OUTPUT

Write final output to `.codemachine/artifacts/dev-impl-output.md`