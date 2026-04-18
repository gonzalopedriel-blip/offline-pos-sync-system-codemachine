---
name: 'Step 01 - Análisis de Requisitos de Sincronización'
description: 'Analiza los requisitos de sincronización basados en el modelo de datos'
---

# Step 1: Análisis de Requisitos de Sincronización

## STEP GOAL

Analizar los requisitos de sincronización del sistema POS offline-first.

## INSTRUCTIONS

1. Revisar el modelo de datos de arch-state (entidades, metadatos, versionado)
2. Identificar necesidades de sincronización para cada entidad
3. Definir requisitos de cola de eventos
4. Considerar escenarios de sync (offline prolongado, multi-dispositivo)
5. Documentar restricciones de sincronización

## CONTEXT

- **Modelo de datos:** {arch_state_output}
- **Sync Constraints:** {sync_constraints}
- **Core Requirements:** {core_requirements}

## ANALYSIS AREAS

### Tipos de Sincronización
- **Sincronización incremental:** Solo enviar cambios, no estado completo
- **Sincronización bidireccional:** Cliente ↔ Backend
- **Sincronización eventual:** No es inmediata, pero es consistente

### Requisitos de la Cola de Eventos
- Persistente en almacenamiento local
- Ordenada por timestamp
- Resistente a fallos (no perder eventos)
- Capaz de manejar múltiples dispositivos

### Conflictos a Considerar
- Mismo dato modificado en múltiples dispositivos
- Operaciones concurrentes en la misma entidad
- Eliminaciones vs modificaciones simultáneas
- Datos borrados en un dispositivo, modificados en otro

## COMPLETION CRITERIA

- Requisitos de sincronización documentados
- Tipos de conflicto identificados
- Necesidades de cola de eventos especificadas
- Restricciones de red consideradas

## OUTPUT

Documentar análisis de requisitos de sincronización.