export type MarkdownInput = string

export type StyleObject = Record<string, string>

export type TemplateTokens = {
  bodyFontFamily: string
  headingFontFamily: string
  monoFontFamily: string
  textColor: string
  mutedTextColor: string
  accentColor: string
  borderColor: string
  surfaceColor: string
  codeBackground: string
  quoteBackground: string
  tableHeaderBackground: string
}

export type ComponentStyleMap = {
  root: StyleObject
  paragraph: StyleObject
  leadParagraph: StyleObject
  heading1: StyleObject
  heading2: StyleObject
  heading3: StyleObject
  blockquote: StyleObject
  list: StyleObject
  listItem: StyleObject
  link: StyleObject
  strong: StyleObject
  emphasis: StyleObject
  delete: StyleObject
  inlineCode: StyleObject
  codeBlock: StyleObject
  hr: StyleObject
  figure: StyleObject
  image: StyleObject
  figcaption: StyleObject
  table: StyleObject
  tableHeadCell: StyleObject
  tableCell: StyleObject
}

export type TemplateDefinition = {
  id: string
  name: string
  description?: string
  tone?: string
  featured?: boolean
  tokens: TemplateTokens
  componentStyleMap: ComponentStyleMap
}

export type RenderOptions = {
  templateId: string
  sanitize: boolean
  forClipboard: boolean
}

export type RenderResult = {
  previewHtml: string
  clipboardHtml: string
}
