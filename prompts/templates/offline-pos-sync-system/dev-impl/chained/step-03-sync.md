---
name: 'Step 03 - Motor de Sincronización'
description: 'Implementa el motor de sincronización con retry e idempotencia'
---

# Step 3: Motor de Sincronización

## STEP GOAL

Implementar el motor de sincronización con envío incremental, retry con backoff, y manejo de conflictos.

## INSTRUCTIONS

1. Implementar detector de conectividad
2. Crear proceso de sincronización incremental
3. Implementar retry con backoff exponencial
4. Manejar resolución de conflictos
5. Integrar con sistema de eventos

## CONTEXT

**From arch-sync:** Flujo de sincronización, estrategias de resolución de conflictos
**From arch-events:** Pipeline de procesamiento, estados

## IMPLEMENTATION

### Sync Engine

```javascript
// sync.js - Motor de sincronización

class SyncEngine {
  constructor(db, events, api) {
    this.db = db;
    this.events = events;
    this.api = api;
    this.isOnline = navigator.onLine;
    this.retryDelays = [1000, 2000, 4000, 8000, 16000, 60000]; // Backoff
  }

  // Inicializar listeners de conectividad
  init() {
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
  }

  async handleOnline() {
    this.isOnline = true;
    await this.sync();
  }

  async handleOffline() {
    this.isOnline = false;
    console.log('Sin conexión - operando offline');
  }

  // Sincronización incremental
  async sync() {
    if (!this.isOnline) return;

    const pendingEvents = await this.events.getPendingEvents();
    
    for (const event of pendingEvents) {
      try {
        await this.sendEvent(event);
      } catch (error) {
        await this.handleSyncError(event, error);
      }
    }

    // Recibir cambios del backend
    await this.receiveChanges();
  }

  // Enviar evento individual
  async sendEvent(event) {
    await this.events.updateEventStatus(event.id, 'sending');
    
    const response = await this.api.post('/events', event);
    
    if (response.success) {
      await this.events.updateEventStatus(event.id, 'confirmed');
    } else if (response.conflict) {
      await this.handleConflict(event, response.conflict_data);
    } else {
      throw new Error(response.message || 'Error desconocido');
    }
  }

  // Retry con backoff
  async handleSyncError(event, error) {
    const maxRetries = this.retryDelays.length;
    
    if (event.retry_count < maxRetries) {
      const delay = this.retryDelays[event.retry_count];
      await this.events.updateEventStatus(event.id, 'enqueued');
      setTimeout(() => this.sendEvent(event), delay);
    } else {
      await this.events.updateEventStatus(event.id, 'failed', error.message);
    }
  }

  // Recibir cambios del backend
  async receiveChanges() {
    const lastSync = await this.getLastSyncTimestamp();
    const changes = await this.api.get(`/changes?since=${lastSync}`);
    
    for (const change of changes) {
      await this.applyChange(change);
    }
    
    await this.updateLastSyncTimestamp();
  }

  // Aplicar cambio recibido
  async applyChange(change) {
    // Verificar conflicto antes de aplicar
    const local = await this.db.get(change.entity, change.entity_id);
    
    if (local && local.version >= change.version) {
      // Ya tenemos versión igual o más reciente
      return;
    }
    
    if (local && local.version < change.version && this.hasConflict(local, change)) {
      await this.resolveConflict(local, change);
    } else {
      // Aplicar directamente
      await this.db.put(change.entity, change.data);
    }
  }
}
```

## COMPLETION CRITERIA

- Motor de sincronización funcional
- Retry con backoff implementado
- Idempotencia en sync
- Resolución de conflictos implementada

## OUTPUT

Implementar motor de sincronización.