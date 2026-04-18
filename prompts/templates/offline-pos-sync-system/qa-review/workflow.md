---
name: 'QA Reviewer Workflow'
description: 'Valida la implementación contra las arquitecturas definidas'
type: 'module'
---

# QA Reviewer - Workflow

## CONTEXT

**From dev-impl:** Código implementado

**From arch-state:** Modelo de datos esperado

**From arch-sync:** Flujo de sincronización esperado

**From arch-events:** Sistema de eventos esperado

**Core Requirements:**
- offline-first: El sistema debe funcionar completamente sin conexión
- multi-dispositivo: Múltiples dispositivos pueden operar simultáneamente
- consistencia eventual: Los datos se sincronizan cuando hay conexión

## GOAL

Validar la implementación contra las arquitecturas definidas, detectando inconsistencias y proponiendo correcciones.

## VALIDATION CRITERIA

**Pass Conditions (continue forward):**
- Modelo de datos incluye metadata de sincronización
- Sistema de eventos cumple estructura, orden e idempotencia
- Motor de sincronización implementa envío incremental, retry, idempotencia
- No hay inconsistencias entre arquitectura y código
- Escenarios offline/online evaluados correctamente

**Fail Conditions (loop back):**
- Faltan metadatos de sincronización en modelo
- Sistema de eventos incompleto o sin idempotencia
- Sync basado en estado completo (no incremental)
- Problemas de consistencia detectados
- Riesgos de pérdida de datos identificados
- Eventos aplicados fuera de orden
- Duplicación de eventos no controlada
- Falta de consistencia tras reconexión

## INSTRUCTIONS (All Steps)

1. Validar modelo de datos contra arch-state
2. Validar sistema de eventos contra arch-events
3. Validar sync engine contra arch-sync
4. Generar reporte de validación
5. Simular escenarios reales:
   - dispositivo offline por varios días
   - múltiples dispositivos modificando el mismo dato
   - reconexión con eventos acumulados
6. Evaluar comportamiento del sistema en cada escenario
7. Verificar que el sistema funciona end-to-end:
   - crear dato → generar evento → sync → reconciliación
8. Detectar si hay pérdida, duplicación o inconsistencia de datos
9. Evaluar edge cases:
   - eventos duplicados
   - eventos fuera de orden
   - sync interrumpido
   - conflictos simultáneos

## STEPS OVERVIEW

| Step | Purpose |
|------|---------|
| 1 | Validación de modelo de datos |
| 2 | Validación de sistema de eventos |
| 3 | Validación de sync engine |
| 4 | Reporte de validación |

## ⚠️ DIRECTIVE WRITING (CRITICAL)

**You MUST write to `.codemachine/memory/directive.json` at the end of your execution.**

**If validation PASSES (no issues found):**
```json
{
  "action": "stop",
  "reason": "Validación completa: Todas las verificaciones pasaron. Sistema listo para uso."
}
```

**If validation FAILS (issues found):**
```json
{
  "action": "loop",
  "reason": "Validación fallida: [especificar issues encontrados]. Dev-impl debe corregir.",
  "target": "dev-impl"
}
```

**Rules:**
- Especificar los issues encontrados en el reason
- Máximo 3 iteracciones de loop
- Si após 3 iteraciones aún hay issues, continuar (no bloquear forever)
- Priorizar detección de problemas críticos de datos sobre errores menores

## SUCCESS CRITERIA

- Validación completa contra arquitectura
- Detección de problemas reales (no superficiales)
- Verificación de idempotencia y orden de eventos
- Escenarios offline/online correctamente evaluados
- Identificación de riesgos de consistencia

## AVOID (Failure Indicators)

- Revisión superficial tipo linting
- No validar contra arquitectura definida
- No detectar problemas de sincronización
- No simular escenarios reales
- Ignorar conflictos o duplicación de eventos
- No identificar riesgos de datos

## OUTPUT FORMAT (MANDATORY)

### 1. Validation Summary
- PASS / FAIL

### 2. Issues Found
- Lista clara de problemas detectados

### 3. Severity
- Critical / Major / Minor

### 4. Scenario Testing Results
- Resultado de cada escenario simulado

### 5. Consistency Check
- ¿Hay pérdida o duplicación de datos?

### 6. Recommendations
- Acciones concretas para corregir

## FINAL OUTPUT

Write final output to `.codemachine/artifacts/qa-review-output.md`