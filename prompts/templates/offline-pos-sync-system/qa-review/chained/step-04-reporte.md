---
name: 'Step 04 - Reporte de Validación'
description: 'Genera el reporte final de validación con hallazgos y recomendaciones'
---

# Step 4: Reporte de Validación

## STEP GOAL

Generar el reporte final de validación consolidando todos los hallazgos de las etapas anteriores.

## INSTRUCTIONS

1. Consolidar hallazgos de validación de modelo de datos
2. Consolidar hallazgos de validación de sistema de eventos
3. Consolidar hallazgos de validación de sync engine
4. Evaluar riesgos de consistencia y pérdida de datos
5. Proponer recomendaciones y correcciones
6. Determinar si la validación pasa o falla

## INPUT FROM STEPS 1-3

Hallazgos de validación de las tres áreas validadas.

## REPORTE STRUCTURE

### Resumen Ejecutivo
- Total de verificaciones realizadas
- Verificaciones pasadas vs fallidas
- Nivel de cumplimiento general

### Hallazgos por Área

#### Modelo de Datos
- Estado: PASS / FAIL
- Hallazgos (si hay)

#### Sistema de Eventos
- Estado: PASS / FAIL
- Hallazgos (si hay)

#### Sync Engine
- Estado: PASS / FAIL
- Hallazgos (si hay)

### Riesgos Identificados
- Riesgos de consistencia de datos
- Riesgos de pérdida de eventos
- Riesgos de conflictos no resueltos
- Riesgos de desconexión prolongada

### Recomendaciones
- Correcciones necesarias (si hay)
- Mejoras sugeridas
- Pruebas adicionales recomendadas

### Veredicto Final
- **PASS:** Sistema listo para uso
- **FAIL:** Requiere correcciones antes de uso

## ⚠️ DIRECTIVE WRITING (CRITICAL)

Al finalizar, escribir el directive:
- Si PASS: `action: "stop", reason: "Validación completa..."`
- Si FAIL: `action: "loop", reason: "Issues encontrados...", target: "dev-impl"`

## FINAL OUTPUT

Guardar en `.codemachine/artifacts/qa-review-output.md`