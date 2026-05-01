import type {
  BlockContent,
  Content,
  DefinitionContent,
  Heading,
  Image,
  Link,
  List,
  ListContent,
  ListItem,
  Nodes,
  PhrasingContent,
  Root,
  Table,
  TableCell,
  TableContent,
} from 'mdast'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { getTemplate } from '../templates'
import { element, escapeHtml, sanitizeUrl, serializeStyles, stripHtmlTags } from './html'
import type { RenderOptions, RenderResult, TemplateDefinition } from './types'

export function renderMarkdown(
  markdown: string,
  options: RenderOptions,
): RenderResult {
  const template = getTemplate(options.templateId)
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown) as Root
  const articleContent = renderRoot(tree, template, options)
  const rootAttributes = {
    'data-wechat-template': template.id,
    style: serializeStyles(template.componentStyleMap.root),
  }

  return {
    previewHtml: element('section', articleContent, rootAttributes),
    clipboardHtml: element('section', articleContent, rootAttributes),
  }
}

function renderRoot(
  tree: Root,
  template: TemplateDefinition,
  options: RenderOptions,
): string {
  let hasSeenH1 = false
  let hasRenderedLeadParagraph = false

  return tree.children
    .map((node) => {
      if (node.type === 'heading' && node.depth === 1) {
        hasSeenH1 = true
        return renderHeading(node, template, options)
      }

      if (
        node.type === 'paragraph' &&
        hasSeenH1 &&
        !hasRenderedLeadParagraph &&
        !containsStandaloneFigure(node.children)
      ) {
        hasRenderedLeadParagraph = true
        return element('p', renderInlineNodes(node.children, template, options), {
          style: serializeStyles(template.componentStyleMap.leadParagraph),
        })
      }

      return renderBlockNode(node, template, options)
    })
    .join('')
}

function renderBlockNode(
  node: Root['children'][number],
  template: TemplateDefinition,
  options: RenderOptions,
): string {
  switch (node.type) {
    case 'heading':
      return renderHeading(node, template, options)
    case 'paragraph':
      return element('p', renderInlineNodes(node.children, template, options), {
        style: serializeStyles(template.componentStyleMap.paragraph),
      })
    case 'blockquote':
      return element(
        'blockquote',
        node.children.map((child) => renderBlockNode(child, template, options)).join(''),
        { style: serializeStyles(template.componentStyleMap.blockquote) },
      )
    case 'list':
      return renderList(node, template, options)
    case 'code':
      return element(
        'pre',
        element('code', escapeHtml(node.value), {
          style: serializeStyles(template.componentStyleMap.codeBlock),
        }),
        { style: 'margin:0 0 22px' },
      )
    case 'thematicBreak':
      return element('hr', '', { style: serializeStyles(template.componentStyleMap.hr) })
    case 'table':
      return renderTable(node, template, options)
    case 'html': {
      const fallbackText = options.sanitize ? stripHtmlTags(node.value) : node.value
      if (!fallbackText) {
        return ''
      }

      return element('p', escapeHtml(fallbackText), {
        style: serializeStyles(template.componentStyleMap.paragraph),
      })
    }
    case 'definition':
      return ''
    default:
      return renderUnknownBlock(node, template, options)
  }
}

function renderUnknownBlock(
  node: Content,
  template: TemplateDefinition,
  options: RenderOptions,
): string {
  if ('children' in node && Array.isArray(node.children)) {
    const phrasingChildren = node.children.filter(isPhrasingContent)
    if (phrasingChildren.length > 0) {
      return element('p', renderInlineNodes(phrasingChildren, template, options), {
        style: serializeStyles(template.componentStyleMap.paragraph),
      })
    }
  }

  return ''
}

function renderHeading(
  node: Heading,
  template: TemplateDefinition,
  options: RenderOptions,
): string {
  const level = Math.min(node.depth, 3)
  const tagName = `h${level}`
  const styleMap =
    level === 1
      ? template.componentStyleMap.heading1
      : level === 2
        ? template.componentStyleMap.heading2
        : template.componentStyleMap.heading3

  return element(tagName, renderInlineNodes(node.children, template, options), {
    style: serializeStyles(styleMap),
  })
}

function renderList(
  node: List,
  template: TemplateDefinition,
  options: RenderOptions,
): string {
  const tagName = node.ordered ? 'ol' : 'ul'
  const items = node.children
    .map((item) => renderListItem(item, template, options))
    .join('')

  return element(tagName, items, {
    style: serializeStyles(template.componentStyleMap.list),
  })
}

function renderListItem(
  node: ListItem,
  template: TemplateDefinition,
  options: RenderOptions,
): string {
  const content = node.children
    .map((child) => {
      if (child.type === 'paragraph') {
        return renderInlineNodes(child.children, template, options)
      }

      return renderBlockNode(child, template, options)
    })
    .join('')

  return element('li', content, {
    style: serializeStyles(template.componentStyleMap.listItem),
  })
}

function renderInlineNodes(
  nodes: PhrasingContent[],
  template: TemplateDefinition,
  options: RenderOptions,
): string {
  return nodes.map((node) => renderInlineNode(node, template, options)).join('')
}

function renderInlineNode(
  node: PhrasingContent,
  template: TemplateDefinition,
  options: RenderOptions,
): string {
  switch (node.type) {
    case 'text':
      return escapeHtml(node.value)
    case 'strong':
      return element('strong', renderInlineNodes(node.children, template, options), {
        style: serializeStyles(template.componentStyleMap.strong),
      })
    case 'emphasis':
      return element('em', renderInlineNodes(node.children, template, options), {
        style: serializeStyles(template.componentStyleMap.emphasis),
      })
    case 'delete':
      return element('del', renderInlineNodes(node.children, template, options), {
        style: serializeStyles(template.componentStyleMap.delete),
      })
    case 'inlineCode':
      return element('code', escapeHtml(node.value), {
        style: serializeStyles(template.componentStyleMap.inlineCode),
      })
    case 'link':
      return renderLink(node, template, options)
    case 'image':
      return renderImage(node, template)
    case 'break':
      return '<br />'
    case 'html': {
      const fallbackText = options.sanitize ? stripHtmlTags(node.value) : node.value
      return fallbackText ? escapeHtml(fallbackText) : ''
    }
    default:
      return ''
  }
}

function renderLink(
  node: Link,
  template: TemplateDefinition,
  options: RenderOptions,
): string {
  const safeUrl = options.sanitize ? sanitizeUrl(node.url) : node.url
  const text = renderInlineNodes(node.children, template, options)

  if (!safeUrl) {
    return text
  }

  return element('a', text, {
    href: safeUrl,
    style: serializeStyles(template.componentStyleMap.link),
    target: '_blank',
    rel: 'noopener noreferrer',
  })
}

function renderImage(node: Image, template: TemplateDefinition): string {
  const safeUrl = sanitizeUrl(node.url)

  if (!safeUrl) {
    return ''
  }

  const altText = node.alt ?? ''
  const image = element('img', '', {
    src: safeUrl,
    alt: altText,
    style: serializeStyles(template.componentStyleMap.image),
  })
  const caption = node.alt
    ? element('figcaption', escapeHtml(node.alt), {
        style: serializeStyles(template.componentStyleMap.figcaption),
      })
    : ''

  return element('figure', `${image}${caption}`, {
    style: serializeStyles(template.componentStyleMap.figure),
  })
}

function renderTable(
  node: Table,
  template: TemplateDefinition,
  options: RenderOptions,
): string {
  const [headerRow, ...bodyRows] = node.children

  const head = headerRow
    ? element(
        'thead',
        element(
          'tr',
          headerRow.children
            .map((cell) => renderTableCell(cell, true, template, options))
            .join(''),
        ),
      )
    : ''

  const body = element(
    'tbody',
    bodyRows
      .map((row) =>
        element(
          'tr',
          row.children
            .map((cell) => renderTableCell(cell, false, template, options))
            .join(''),
        ),
      )
      .join(''),
  )

  return element('table', `${head}${body}`, {
    style: serializeStyles(template.componentStyleMap.table),
  })
}

function renderTableCell(
  node: TableCell,
  isHeader: boolean,
  template: TemplateDefinition,
  options: RenderOptions,
): string {
  const tagName = isHeader ? 'th' : 'td'
  const style = isHeader
    ? template.componentStyleMap.tableHeadCell
    : template.componentStyleMap.tableCell

  return element(tagName, renderTableCellContent(node.children, template, options), {
    style: serializeStyles(style),
  })
}

function renderTableCellContent(
  nodes: TableCell['children'],
  template: TemplateDefinition,
  options: RenderOptions,
): string {
  return nodes
    .map((node) => (isPhrasingContent(node) ? renderInlineNode(node, template, options) : ''))
    .join('')
}

function isPhrasingContent(
  node: Nodes | BlockContent | DefinitionContent | ListContent | TableContent,
): node is PhrasingContent {
  return [
    'break',
    'delete',
    'emphasis',
    'html',
    'image',
    'inlineCode',
    'link',
    'linkReference',
    'strong',
    'text',
  ].includes(node.type)
}

function containsStandaloneFigure(nodes: PhrasingContent[]): boolean {
  return nodes.some((node) => node.type === 'image')
}
