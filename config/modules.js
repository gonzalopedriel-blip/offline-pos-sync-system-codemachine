const path = require('node:path');
const promptsDir = path.join(__dirname, '..', 'prompts', 'templates');

// ========================================
// offline-pos-sync-system Workflow - Modules
// ========================================
{
  id: 'qa-review',
  name: 'QA Reviewer',
  description: 'Valida la implementación contra las arquitecturas definidas',
  promptPath: path.join(promptsDir, 'offline-pos-sync-system', 'qa-review', 'workflow.md'),
  chainedPromptsPath: [
    path.join(promptsDir, 'offline-pos-sync-system', 'qa-review', 'chained', 'step-01-modelo.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'qa-review', 'chained', 'step-02-eventos.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'qa-review', 'chained', 'step-03-sync.md'),
    path.join(promptsDir, 'offline-pos-sync-system', 'qa-review', 'chained', 'step-04-reporte.md'),
  ],
  behavior: {
    type: 'loop',
    action: 'stepBack',
  },
  loopSteps: 1,
  loopMaxIterations: 3,
  engine: 'opencode',
},