// offline-pos-sync-system Workflow - Main Agents
// ========================================
{
  id: 'arch-state',
  name: 'State Architect',
  description: 'Diseña la arquitectura de datos local y modelo de entidades para el sistema POS offline-first',
  promptPath: path.join(promptsDir, 'offline-pos-sync-system', 'arch-state', 'workflow.md'),
  chainedPromptsPath: [
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-state', 'chained', 'step-01-analisis.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-state', 'chained', 'step-02-diseno.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-state', 'chained', 'step-03-documentacion.md'),
  ],
  engine: 'opencode',
},
{
  id: 'arch-sync',
  name: 'Sync Architect',
  description: 'Diseña el mecanismo de sincronización bidireccional, estrategias de resolución de conflictos y gestión de cola de sincronización',
  promptPath: path.join(promptsDir, 'offline-pos-sync-system', 'arch-sync', 'workflow.md'),
  chainedPromptsPath: [
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-sync', 'chained', 'step-01-analisis.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-sync', 'chained', 'step-02-flujo.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-sync', 'chained', 'step-03-conflictos.md'),
  ],
  engine: 'opencode',
},
{
  id: 'arch-events',
  name: 'Events Architect',
  description: 'Diseña el sistema de eventos como componente central del workflow',
  promptPath: path.join(promptsDir, 'offline-pos-sync-system', 'arch-events', 'workflow.md'),
  chainedPromptsPath: [
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-events', 'chained', 'step-01-estructura.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-events', 'chained', 'step-02-pipeline.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-events', 'chained', 'step-03-estados.md'),
  ],
  engine: 'opencode',
},
{
  id: 'dev-impl',
  name: 'Developer',
  description: 'Implementa el sistema completo basado en las arquitecturas definidas',
  promptPath: path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'workflow.md'),
  chainedPromptsPath: [
    path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'chained', 'step-01-db.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'chained', 'step-02-eventos.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'chained', 'step-03-sync.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'chained', 'step-04-supabase.md'),
  ],
  engine: 'opencode',
},
=======
const path = require('node:path');
const promptsDir = path.join(__dirname, '..', 'prompts', 'templates');

// ========================================
// offline-pos-sync-system Workflow - Main Agents
// ========================================
module.exports = [
  {
    id: 'arch-state',
    name: 'State Architect',
    description: 'Diseña la arquitectura de datos local y modelo de entidades para el sistema POS offline-first',
    promptPath: path.join(promptsDir, 'offline-pos-sync-system', 'arch-state', 'workflow.md'),
    chainedPromptsPath: [
      path.join(promptsDir, 'offline-pos-sync-system', 'arch-state', 'chained', 'step-01-analisis.md'),
      path.join(promptsDir, 'offline-pos-sync-system', 'arch-state', 'chained', 'step-02-diseno.md'),
      path.join(promptsDir, 'offline-pos-sync-system', 'arch-state', 'chained', 'step-03-documentacion.md'),
    ],
    engine: 'opencode',
  },
  {
    id: 'arch-sync',
    name: 'Sync Architect',
    description: 'Diseña el mecanismo de sincronización bidireccional, estrategias de resolución de conflictos y gestión de cola de sincronización',
    promptPath: path.join(promptsDir, 'offline-pos-sync-system', 'arch-sync', 'workflow.md'),
    chainedPromptsPath: [
      path.join(promptsDir, 'offline-pos-sync-system', 'arch-sync', 'chained', 'step-01-analisis.md'),
      path.join(promptsDir, 'offline-pos-sync-system', 'arch-sync', 'chained', 'step-02-flujo.md'),
      path.join(promptsDir, 'offline-pos-sync-system', 'arch-sync', 'chained', 'step-03-conflictos.md'),
    ],
    engine: 'opencode',
  },
  {
    id: 'arch-events',
    name: 'Events Architect',
    description: 'Diseña el sistema de eventos como componente central del workflow',
    promptPath: path.join(promptsDir, 'offline-pos-sync-system', 'arch-events', 'workflow.md'),
    chainedPromptsPath: [
      path.join(promptsDir, 'offline-pos-sync-system', 'arch-events', 'chained', 'step-01-estructura.md'),
      path.join(promptsDir, 'offline-pos-sync-system', 'arch-events', 'chained', 'step-02-pipeline.md'),
      path.join(promptsDir, 'offline-pos-sync-system', 'arch-events', 'chained', 'step-03-estados.md'),
    ],
    engine: 'opencode',
  },
  {
    id: 'dev-impl',
    name: 'Developer',
    description: 'Implementa el sistema completo basado en las arquitecturas definidas',
    promptPath: path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'workflow.md'),
    chainedPromptsPath: [
      path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'chained', 'step-01-db.md'),
      path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'chained', 'step-02-eventos.md'),
      path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'chained', 'step-03-sync.md'),
      path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'chained', 'step-04-supabase.md'),
    ],
    engine: 'opencode',
  },
];========================================
// offline-pos-sync-system Workflow - Main Agents
// ========================================
{
  id: 'arch-state',
  name: 'State Architect',
  description: 'Diseña la arquitectura de datos local y modelo de entidades para el sistema POS offline-first',
  promptPath: path.join(promptsDir, 'offline-pos-sync-system', 'arch-state', 'workflow.md'),
  chainedPromptsPath: [
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-state', 'chained', 'step-01-analisis.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-state', 'chained', 'step-02-diseno.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-state', 'chained', 'step-03-documentacion.md'),
  ],
  engine: 'opencode',
},
{
  id: 'arch-sync',
  name: 'Sync Architect',
  description: 'Diseña el mecanismo de sincronización bidireccional, estrategias de resolución de conflictos y gestión de cola de sincronización',
  promptPath: path.join(promptsDir, 'offline-pos-sync-system', 'arch-sync', 'workflow.md'),
  chainedPromptsPath: [
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-sync', 'chained', 'step-01-analisis.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-sync', 'chained', 'step-02-flujo.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-sync', 'chained', 'step-03-conflictos.md'),
  ],
  engine: 'opencode',
},
{
  id: 'arch-events',
  name: 'Events Architect',
  description: 'Diseña el sistema de eventos como componente central del workflow',
  promptPath: path.join(promptsDir, 'offline-pos-sync-system', 'arch-events', 'workflow.md'),
  chainedPromptsPath: [
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-events', 'chained', 'step-01-estructura.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-events', 'chained', 'step-02-pipeline.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'arch-events', 'chained', 'step-03-estados.md'),
  ],
  engine: 'opencode',
},
{
  id: 'dev-impl',
  name: 'Developer',
  description: 'Implementa el sistema completo basado en las arquitecturas definidas',
  promptPath: path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'workflow.md'),
  chainedPromptsPath: [
    path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'chained', 'step-01-db.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'chained', 'step-02-eventos.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'chained', 'step-03-sync.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'dev-impl', 'chained', 'step-04-supabase.md'),
  ],
  engine: 'opencode',
},