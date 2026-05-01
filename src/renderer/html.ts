import type { StyleObject } from './types'

const VOID_TAGS = new Set(['br', 'hr', 'img'])

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function serializeStyles(styleObject: StyleObject): string {
  return Object.entries(styleObject)
    .map(([key, value]) => `${toKebabCase(key)}:${value}`)
    .join(';')
}

export function element(
  tagName: string,
  content: string,
  attributes: Record<string, string | undefined> = {},
): string {
  const serializedAttributes = Object.entries(attributes)
    .filter(([, value]) => value && value.length > 0)
    .map(([key, value]) => ` ${key}="${escapeHtml(value ?? '')}"`)
    .join('')

  if (VOID_TAGS.has(tagName)) {
    return `<${tagName}${serializedAttributes} />`
  }

  return `<${tagName}${serializedAttributes}>${content}</${tagName}>`
}

export function stripHtmlTags(value: string): string {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function sanitizeUrl(value?: string): string | undefined {
  if (!value) {
    return undefined
  }

  try {
    const parsed = new URL(value)
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString()
    }
  } catch {
    return undefined
  }

  return undefined
}

function toKebabCase(value: string): string {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}
