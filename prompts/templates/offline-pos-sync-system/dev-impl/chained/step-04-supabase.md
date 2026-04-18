---
name: 'Step 04 - Integración con Supabase'
description: 'Implementa la integración con el backend de Supabase'
---

# Step 4: Integración con Supabase

## STEP GOAL

Implementar la integración con Supabase como backend del sistema POS.

## INSTRUCTIONS

1. Configurar cliente de Supabase
2. Implementar API layer
3. Definir estructura de tablas en Supabase
4. Implementar funciones de sincronización
5. Documentar schema de base de datos

## CONTEXT

**From arch-sync:** Estrategias de resolución de conflictos
**From arch-events:** Estructura de eventos, idempotencia

## IMPLEMENTATION

### Configuración de Supabase

```javascript
// supabase.js - Cliente e integración con Supabase

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// API Layer
export class SupabaseAPI {
  constructor(supabase) {
    this.supabase = supabase;
  }

  // Enviar evento
  async postEvent(event) {
    const { data, error } = await this.supabase
      .from('eventos')
      .upsert({
        id: event.id,
        type: event.type,
        entity: event.entity,
        entity_id: event.entity_id,
        payload: event.payload,
        timestamp: event.timestamp,
        device_id: event.device_id,
        version: event.version
      }, { onConflict: 'id' })
      .select();
    
    if (error) throw error;
    return data;
  }

  // Obtener cambios desde timestamp
  async getChanges(since) {
    const { data, error } = await this.supabase
      .from('eventos')
      .select('*')
      .gte('timestamp', since)
      .order('timestamp', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  // Sincronizar estado completo
  async getFullState(entity) {
    const { data, error } = await this.supabase
      .from(entity)
      .select('*')
      .eq('sync_status', 'synced')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
}
```

### Schema de Base de Datos en Supabase

```sql
-- Tabla de eventos (fuente de verdad)
CREATE TABLE eventos (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- create, update, delete
  entity TEXT NOT NULL, -- producto, cliente, venta, stock
  entity_id UUID NOT NULL,
  payload JSONB,
  timestamp TIMESTAMPTZ NOT NULL,
  device_id TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_eventos_entity_timestamp ON eventos(entity, timestamp);
CREATE INDEX idx_eventos_entity_id ON eventos(entity_id);
CREATE INDEX idx_eventos_device ON eventos(device_id);

-- Tablas de entidades (cache/lectura)
CREATE TABLE productos (
  id UUID PRIMARY KEY,
  sku TEXT UNIQUE,
  nombre TEXT,
  descripcion TEXT,
  precio DECIMAL(10,2),
  categoria_id UUID,
  stock INTEGER,
  version INTEGER DEFAULT 1,
  updated_at TIMESTAMPTZ,
  sync_status TEXT DEFAULT 'pending'
);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER productos_updated_at
  BEFORE UPDATE ON productos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

## COMPLETION CRITERIA

- Cliente de Supabase configurado
- API layer implementada
- Schema de base de datos definido
- Funciones de sincronización implementadas

## FINAL OUTPUT

Guardar en `.codemachine/artifacts/dev-impl-output.md`