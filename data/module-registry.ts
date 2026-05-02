import { verbModuleConfig } from './modules/verbs/config';

export const MODULE_REGISTRY = [
  verbModuleConfig,
  // Add new modules here — that's all you need to do
];

export type ModuleId = typeof MODULE_REGISTRY[number]['id'];