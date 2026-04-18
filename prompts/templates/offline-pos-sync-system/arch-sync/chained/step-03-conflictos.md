---
name: 'Step 03 - Estrategias de Resolución de Conflictos'
description: 'Define estrategias de resolución de conflictos diferenciadas por tipo de dato'
---

# Step 3: Estrategias de Resolución de Conflictos

## STEP GOAL

Diseñar estrategias de resolución de conflictos diferenciadas por tipo de dato y escenario.

## INSTRUCTIONS

1. Categorizar tipos de datos según criticidad
2. Definir estrategias de resolución para cada categoría
3. Especificar lógica de detección de conflictos
4. Documentar proceso de reconciliación
5. Considerar idempotencia para evitar duplicados

## INPUT FROM STEP 2

Flujo de sincronización diseñado.

## CONFLICT RESOLUTION STRATEGIES

### Categoría 1: Datos Simples (meta, descripciones)
- **Estrategia:** Last-Write-Wins basado en timestamp
- **Lógica:** Comparar timestamps, usar el más reciente
- **Ejemplo:** Nombre de producto, descripción

### Categoría 2: Datos Transaccionales (ventas)
- **Estrategia:** Never overwrite, crear evento de reconciliación
- **Lógica:** Si hay conflicto, crear registro de conflicto para revisión
- **Ejemplo:** Ventas completadas, no modificar

### Categoría 3: Datos de Stock (inventario)
- **Estrategia:** Reconciliación basada en eventos
- **Lógica:** Aplicar operaciones en orden, recalcular stock
- **Ejemplo:** stock = stock inicial + entradas - salidas

### Categoría 4: Datos de Cliente
- **Estrategia:** Merge strategy
- **Lógica:** Combinar campos no conflictivos, señalar conflictos
- **Ejemplo:** Cliente con cambios en email y teléfono

### Detección de Conflictos
```javascript
// Pseudo-código
function detectarConflicto(local, remote) {
  if (local.version === remote.version) return false;
  if (local.updated_at === remote.updated_at) return false;
  return true; // Hay conflicto
}
```

### Idempotencia
- Generar event_id único basado en (entity_id + operation + timestamp + device_id)
- Backend verifica event_id antes de procesar
- Si event_id ya existe, ignorar duplicado

## COMPLETION CRITERIA

- Estrategias diferenciadas por tipo de dato
- Lógica de detección de conflictos definida
- Proceso de reconciliación documentado
- Mecanismos de idempotencia especificados

## FINAL OUTPUT

Guardar en `.codemachine/artifacts/arch-sync-output.md`