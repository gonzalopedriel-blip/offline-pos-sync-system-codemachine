---
name: 'Step 01 - Análisis de Requisitos de Datos'
description: 'Analiza los requisitos de datos del sistema POS offline-first'
---

# Step 1: Análisis de Requisitos de Datos

## STEP GOAL

Analizar los requisitos de datos del sistema POS offline-first y definir las necesidades del modelo de datos.

## INSTRUCTIONS

1. Revisar el contexto inicial (project_name, system_description, core_requirements, data_entities_scope, sync_constraints)
2. Identificar todas las operaciones que el sistema debe manejar (CRUD + eventos)
3. Definir los requisitos de cada entidad (propiedades, relaciones, restricciones)
4. Considerar escenarios de uso offline (operaciones sin conexión, reconexión)
5. Documentar los requisitos de metadatos para sincronización

## CONTEXT

- **Project:** {project_name}
- **System:** {system_description}
- **Core Requirements:** {core_requirements}
- **Data Scope:** {data_entities_scope}
- **Constraints:** {sync_constraints}

## ANALYSIS AREAS

### Entidades Identificadas
- Productos (catálogo, precios, categorías)
- Clientes (datos, historial de compras)
- Ventas (transacciones, líneas de venta, totales)
- Stock (inventario, movimientos)

### Requisitos de Metadatos
- Identificador único global
- Versionado (incremental o timestamp)
- Timestamp de última modificación
- Device ID (dispositivo origen)
- Estado de sincronización

### Escenarios Offline
- Operaciones durante desconexión prolongada
- Sincronización al恢复 conexión
- Conflictos con otros dispositivos

## COMPLETION CRITERIA

- Lista de entidades claramente definida
- Propiedades de cada entidad identificadas
- Requisitos de metadatos documentados
- Escenarios offline considerados

## OUTPUT

Documentar el análisis en formato estructurado. Este contenido se usará en el siguiente paso para diseñar el modelo de entidades.