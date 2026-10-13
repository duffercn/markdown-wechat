import type { TemplateDefinition, TemplateTokens } from '../renderer/types'

const sansBody =
  "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Source Han Sans SC', 'Noto Sans CJK SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
const serifBody =
  "'Source Han Serif SC', 'Noto Serif SC', 'Noto Serif CJK SC', 'Songti SC', 'STSong', serif"
const editorialSerif =
  "'Source Han Serif SC', 'Noto Serif CJK SC', 'Songti SC', 'STSong', 'Iowan Old Style', 'Palatino Linotype', serif"
const refinedSans =
  "'PingFang SC', 'Hiragino Sans GB', 'Source Han Sans SC', 'Noto Sans CJK SC', 'Microsoft YaHei', 'SF Pro Display', 'Helvetica Neue', sans-serif"
const mono =
  "'JetBrains Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace"

type ThemeOptions = {
  id: string
  name: string
  description: string
  tone: string
  accent: string
  text: string
  muted: string
  border: string
  quote: string
  code: string
  tableHead: string
  bodyFont?: string
  headingFont?: string
  root?: Record<string, string>
  paragraph?: Record<string, string>
  lead?: Record<string, string>
  h1?: Record<string, string>
  h2?: Record<string, string>
  h3?: Record<string, string>
  blockquote?: Record<string, string>
  list?: Record<string, string>
  listItem?: Record<string, string>
  link?: Record<string, string>
  strong?: Record<string, string>
  codeBlock?: Record<string, string>
  hr?: Record<string, string>
  figure?: Record<string, string>
  figcaption?: Record<string, string>
  table?: Record<string, string>
}

function createTheme(options: ThemeOptions): TemplateDefinition {
  const tokens: TemplateTokens = {
    bodyFontFamily: options.bodyFont ?? serifBody,
    headingFontFamily: options.headingFont ?? options.bodyFont ?? serifBody,
    monoFontFamily: mono,
    textColor: options.text,
    mutedTextColor: options.muted,
    accentColor: options.accent,
    borderColor: options.border,
    surfaceColor: '#fffdf9',
    codeBackground: options.code,
    quoteBackground: options.quote,
    tableHeaderBackground: options.tableHead,
  }

  return {
    id: options.id,
    name: options.name,
    description: options.description,
    tone: options.tone,
    featured: true,
    tokens,
    componentStyleMap: {
      root: {
        color: tokens.textColor,
        fontFamily: tokens.bodyFontFamily,
        fontSize: '15px',
        lineHeight: '1.78',
        letterSpacing: '0.01em',
        wordBreak: 'break-word',
        ...options.root,
      },
      paragraph: {
        margin: '0 0 15px',
        color: tokens.textColor,
        ...options.paragraph,
      },
      leadParagraph: {
        margin: '0 0 20px',
        color: tokens.mutedTextColor,
        fontSize: '16px',
        lineHeight: '1.86',
        ...options.lead,
      },
      heading1: {
        margin: '4px 0 18px',
        color: '#211b17',
        fontSize: '29px',
        lineHeight: '1.38',
        fontWeight: '700',
        fontFamily: tokens.headingFontFamily,
        ...options.h1,
      },
      heading2: {
        margin: '34px 0 14px',
        color: '#2b221c',
        fontSize: '21px',
        lineHeight: '1.42',
        fontWeight: '700',
        fontFamily: tokens.headingFontFamily,
        ...options.h2,
      },
      heading3: {
        margin: '24px 0 10px',
        color: tokens.accentColor,
        fontSize: '16px',
        lineHeight: '1.42',
        fontWeight: '700',
        fontFamily: sansBody,
        letterSpacing: '0.04em',
        ...options.h3,
      },
      blockquote: {
        margin: '22px 0',
        padding: '14px 16px',
        borderLeft: 'none',
        background: tokens.quoteBackground,
        color: tokens.mutedTextColor,
        borderRadius: '14px',
        boxShadow: `inset 0 0 0 1px ${tokens.borderColor}`,
        ...options.blockquote,
      },
      list: {
        margin: '0 0 16px 20px',
        padding: '0',
        ...options.list,
      },
      listItem: {
        margin: '0 0 9px',
        ...options.listItem,
      },
      link: {
        color: tokens.accentColor,
        textDecoration: 'none',
        borderBottom: `1px solid ${tokens.accentColor}44`,
        ...options.link,
      },
      strong: {
        fontWeight: '700',
        color: tokens.accentColor,
        ...options.strong,
      },
      emphasis: {
        fontStyle: 'italic',
      },
      delete: {
        textDecoration: 'line-through',
        color: '#a79b91',
      },
      inlineCode: {
        padding: '2px 6px',
        borderRadius: '4px',
        background: tokens.codeBackground,
        color: tokens.accentColor,
        fontSize: '0.9em',
        fontFamily: mono,
      },
      codeBlock: {
        margin: '0 0 20px',
        padding: '14px 15px',
        borderRadius: '14px',
        background: tokens.codeBackground,
        color: '#4b4037',
        fontSize: '13px',
        lineHeight: '1.68',
        overflowX: 'auto',
        fontFamily: mono,
        boxShadow: `inset 0 0 0 1px ${tokens.borderColor}`,
        ...options.codeBlock,
      },
      hr: {
        margin: '28px auto',
        width: '68px',
        borderTop: `1px solid ${tokens.borderColor}`,
        ...options.hr,
      },
      figure: {
        margin: '26px 0',
        ...options.figure,
      },
      image: {
        display: 'block',
        width: '100%',
        margin: '0 auto',
        borderRadius: '10px',
      },
      figcaption: {
        margin: '10px 0 0',
        textAlign: 'center',
        color: '#8a7c70',
        fontSize: '12px',
        letterSpacing: '0.04em',
        ...options.figcaption,
      },
      table: {
        width: '100%',
        margin: '0 0 22px',
        borderCollapse: 'collapse',
        fontSize: '13px',
        ...options.table,
      },
      tableHeadCell: {
        padding: '10px 10px',
        border: `1px solid ${tokens.borderColor}`,
        background: tokens.tableHeaderBackground,
        color: '#3b3028',
        textAlign: 'left',
        fontWeight: '700',
      },
      tableCell: {
        padding: '10px 10px',
        border: `1px solid ${tokens.borderColor}`,
        color: '#54493f',
        textAlign: 'left',
        verticalAlign: 'top',
      },
    },
  }
}

export const narrativeTemplate = createTheme({
  id: 'narrative',
  name: '故事心情',
  description: '适合散文、日记感、人物故事和带情绪流动的长文表达。',
  tone: '散文 / 心情 / 讲故事',
  accent: '#4b5563',
  text: '#1f2937',
  muted: '#6b7280',
  border: '#e5e7eb',
  quote: '#fafafa',
  code: '#f5f5f5',
  tableHead: '#f8fafc',
  bodyFont: serifBody,
  headingFont: editorialSerif,
  root: {
    lineHeight: '1.82',
  },
  lead: {
    textAlign: 'center',
    paddingBottom: '16px',
    borderBottom: '1px solid #e5e7eb',
    lineHeight: '1.9',
  },
  h1: {
    textAlign: 'center',
    letterSpacing: '0.02em',
    lineHeight: '1.46',
  },
  h2: {
    paddingBottom: '9px',
    borderBottom: '1px solid #e5e7eb',
  },
  h3: {
    letterSpacing: '0.08em',
  },
  blockquote: {
    textAlign: 'center',
    lineHeight: '1.86',
  },
  listItem: {
    margin: '0 0 11px',
  },
  figcaption: {
    fontStyle: 'italic',
  },
})

export const letterTemplate = createTheme({
  id: 'letter',
  name: '商业评论',
  description: '适合观点表达、商业观察、品牌评论和结构化评论文章。',
  tone: '评论 / 判断 / 商业观察',
  accent: '#111827',
  text: '#111827',
  muted: '#6b7280',
  border: '#e5e7eb',
  quote: '#f8fafc',
  code: '#f5f7fa',
  tableHead: '#f8fafc',
  bodyFont: refinedSans,
  headingFont: refinedSans,
  root: {
    lineHeight: '1.74',
    letterSpacing: '0.005em',
  },
  paragraph: {
    margin: '0 0 14px',
  },
  lead: {
    color: '#526070',
    fontSize: '16px',
    lineHeight: '1.74',
    paddingBottom: '14px',
    borderBottom: '1px solid #e5e7eb',
  },
  h1: {
    fontSize: '30px',
    lineHeight: '1.3',
    letterSpacing: '-0.02em',
  },
  h2: {
    color: '#111827',
    marginTop: '34px',
    paddingLeft: '10px',
    borderLeft: '4px solid #9ca3af',
  },
  h3: {
    color: '#374151',
    letterSpacing: '0.08em',
    fontSize: '15px',
  },
  blockquote: {
    background: '#f7fafc',
    lineHeight: '1.76',
  },
  hr: {
    width: '100%',
    borderTop: '1px solid #e5e7eb',
  },
  list: {
    marginLeft: '18px',
  },
  listItem: {
    margin: '0 0 8px',
  },
  figcaption: {
    color: '#66707d',
  },
  strong: {
    color: '#111827',
  },
})

export const salonTemplate = createTheme({
  id: 'salon',
  name: '教程拆解',
  description: '适合教程、方法论、流程说明和结构清晰的知识型内容。',
  tone: '教程 / 步骤 / 清晰拆解',
  accent: '#374151',
  text: '#1f2937',
  muted: '#6b7280',
  border: '#e5e7eb',
  quote: '#f9fafb',
  code: '#f5f5f5',
  tableHead: '#f8fafc',
  bodyFont: sansBody,
  headingFont: refinedSans,
  root: {
    lineHeight: '1.68',
    letterSpacing: '0',
  },
  paragraph: {
    margin: '0 0 14px',
  },
  lead: {
    color: '#4e5f5c',
    fontSize: '16px',
    lineHeight: '1.68',
    padding: '0 0 12px',
    borderBottom: '1px solid #e5e7eb',
  },
  h1: {
    fontSize: '28px',
    lineHeight: '1.26',
    letterSpacing: '-0.02em',
  },
  h2: {
    borderLeft: '4px solid #9ca3af',
    paddingLeft: '10px',
    marginTop: '34px',
  },
  h3: {
    color: '#374151',
    fontSize: '15px',
    letterSpacing: '0.08em',
  },
  blockquote: {
    background: '#f4fbfa',
    lineHeight: '1.72',
  },
  strong: {
    color: '#111827',
  },
  codeBlock: {
    background: '#f5f5f5',
  },
  hr: {
    width: '100%',
    borderTop: '1px solid #e5e7eb',
  },
  listItem: {
    margin: '0 0 8px',
  },
  figcaption: {
    color: '#6b7280',
  },
})

export const flagshipTemplate = narrativeTemplate

export const templatesCatalog: TemplateDefinition[] = [
  narrativeTemplate,
  letterTemplate,
  salonTemplate,
]
