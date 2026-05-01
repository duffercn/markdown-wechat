import { flagshipTemplate, templatesCatalog } from './presets'
import type { TemplateDefinition } from '../renderer/types'

export const templates: TemplateDefinition[] = templatesCatalog

export function getTemplate(templateId: string): TemplateDefinition {
  return templates.find((template) => template.id === templateId) ?? flagshipTemplate
}
