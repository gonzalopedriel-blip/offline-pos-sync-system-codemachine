---
name: 'Step 01 - Validación de Modelo de Datos'
description: 'Valida el modelo de datos contra las especificaciones de arch-state'
---

# Step 1: Validación de Modelo de Datos

## STEP GOAL

Validar que la implementación del modelo de datos cumple con las especificaciones de arch-state.

## INSTRUCTIONS

1. Revisar el código de base de datos implementado
2. Comparar contra el modelo de datos de arch-state
3. Verificar que todas las entidades incluyen metadatos de sincronización
4. Verificar identificadores únicos (UUID)
5. Verificar versionado y timestamps

## CONTEXT

- **From dev-impl:** Código de base de datos implementado
- **From arch-state:** Modelo de datos esperado (entidades, esquemas, metadatos)
- **Core Requirements:** {core_requirements}

## VALIDATION CHECKLIST

### Entidades
- [ ] Productos: tienen id, version, created_at, updated_at, device_id, sync_status
- [ ] Clientes: tienen id, version, created_at, updated_at, device_id, sync_status
- [ ] Ventas: tienen id, version, created_at, updated_at, device_id, sync_status
- [ ] Stock: tienen id, version, created_at, updated_at, device_id, sync_status

### Metadatos de Sincronización
- [ ] Identificador único global (UUID) presente en todas las entidades
- [ ] Versionado incremental presente
- [ ] Timestamps de creación y actualización presentes
- [ ] Device ID para identificar origen de cada registro
- [ ] sync_status para trackear estado de sincronización

### Índices y Performance
- [ ] Índices creados para búsquedas frecuentes
- [ ] Keys únicas para campos como SKU

## OUTPUT

Reporte de validación del modelo de datos con hallazgos.