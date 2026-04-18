import { controller, resolveStep, resolveModule, separator } from './helpers.js';

export default {
  name: 'Offline POS Sync System',
  autonomousMode: false,
  specification: false,

  steps: [
    resolveStep('arch-state', {
      agentName: 'State Architect',
      interactive: true,
    }),
    resolveStep('arch-sync', {
      agentName: 'Sync Architect',
      interactive: true,
    }),
    resolveStep('arch-events', {
      agentName: 'Events Architect',
      interactive: true,
    }),
    resolveStep('dev-impl', {
      agentName: 'Developer',
      interactive: true,
    }),
    resolveModule('qa-review', {
      agentName: 'QA Reviewer',
      loopSteps: 1,
      loopMaxIterations: 3,
      interactive: true,
    }),
  ],
};