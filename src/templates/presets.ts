import type { TemplateDefinition, TemplateTokens } from '../renderer/types'

const sansBody =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
const serifBody =
  "'Source Han Serif SC', 'Noto Serif SC', 'Songti SC', 'STSong', serif"
const mono =
  "'JetBrains Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace"

type TemplatePresetOptions = {
  id: string
  name: string
  description?: string
  tone?: string
  featured?: boolean
  accentColor: string
  textColor?: string
  mutedTextColor?: string
  borderColor?: string
  quoteBackground?: string
  codeBackground?: string
  tableHeaderBackground?: string
  bodyFontFamily?: string
  headingFontFamily?: string
  rootStyle?: Record<string, string>
  paragraphSpacing?: string
  leadParagraphStyle?: Record<string, string>
  heading1Size?: string
  heading1Style?: Record<string, string>
  heading2Size?: string
  heading3Size?: string
  heading3Style?: Record<string, string>
  heading2Style?: Record<string, string>
  blockquoteStyle?: Record<string, string>
  hrStyle?: Record<string, string>
  linkStyle?: Record<string, string>
  listStyle?: Record<string, string>
  listItemStyle?: Record<string, string>
  figureStyle?: Record<string, string>
  figcaptionStyle?: Record<string, string>
  strongStyle?: Record<string, string>
  tableStyle?: Record<string, string>
  tableHeadCellStyle?: Record<string, string>
  tableCellStyle?: Record<string, string>
}

function buildTemplate(options: TemplatePresetOptions): TemplateDefinition {
  const tokens: TemplateTokens = {
    bodyFontFamily: options.bodyFontFamily ?? sansBody,
    headingFontFamily: options.headingFontFamily ?? options.bodyFontFamily ?? sansBody,
    monoFontFamily: mono,
    textColor: options.textColor ?? '#1f2937',
    mutedTextColor: options.mutedTextColor ?? '#667085',
    accentColor: options.accentColor,
    borderColor: options.borderColor ?? '#dbe3ee',
    surfaceColor: '#ffffff',
    codeBackground: options.codeBackground ?? '#f5f7fb',
    quoteBackground: options.quoteBackground ?? '#f8fafc',
    tableHeaderBackground: options.tableHeaderBackground ?? '#f8fafc',
  }

  return {
    id: options.id,
    name: options.name,
    description: options.description,
    tone: options.tone,
    featured: options.featured ?? false,
    tokens,
    componentStyleMap: {
      root: {
        color: tokens.textColor,
        fontFamily: tokens.bodyFontFamily,
        fontSize: '15px',
        lineHeight: '1.78',
        wordBreak: 'break-word',
        ...options.rootStyle,
      },
      paragraph: {
        margin: `0 0 ${options.paragraphSpacing ?? '16px'}`,
        color: tokens.textColor,
      },
      leadParagraph: {
        margin: `0 0 ${options.paragraphSpacing ?? '18px'}`,
        color: tokens.mutedTextColor,
        fontSize: '16px',
        lineHeight: '1.9',
        ...options.leadParagraphStyle,
      },
      heading1: {
        margin: '0 0 18px',
        color: '#111827',
        fontSize: options.heading1Size ?? '26px',
        lineHeight: '1.32',
        fontWeight: '700',
        fontFamily: tokens.headingFontFamily,
        ...options.heading1Style,
      },
      heading2: {
        margin: '30px 0 14px',
        color: '#111827',
        fontSize: options.heading2Size ?? '21px',
        lineHeight: '1.38',
        fontWeight: '700',
        fontFamily: tokens.headingFontFamily,
        ...options.heading2Style,
      },
      heading3: {
        margin: '24px 0 12px',
        color: '#1f2937',
        fontSize: options.heading3Size ?? '18px',
        lineHeight: '1.42',
        fontWeight: '700',
        fontFamily: tokens.headingFontFamily,
        ...options.heading3Style,
      },
      blockquote: {
        margin: '20px 0',
        padding: '12px 14px',
        borderLeft: `3px solid ${tokens.accentColor}`,
        background: tokens.quoteBackground,
        color: tokens.mutedTextColor,
        ...options.blockquoteStyle,
      },
      list: {
        margin: '0 0 16px 22px',
        padding: '0',
        ...options.listStyle,
      },
      listItem: {
        margin: '0 0 8px',
        ...options.listItemStyle,
      },
      link: {
        color: tokens.accentColor,
        textDecoration: 'none',
        borderBottom: `1px solid ${tokens.accentColor}33`,
        ...options.linkStyle,
      },
      strong: {
        fontWeight: '700',
        color: '#111827',
        ...options.strongStyle,
      },
      emphasis: {
        fontStyle: 'italic',
      },
      delete: {
        textDecoration: 'line-through',
        color: '#94a3b8',
      },
      inlineCode: {
        padding: '2px 6px',
        borderRadius: '4px',
        background: tokens.codeBackground,
        color: tokens.accentColor,
        fontSize: '0.92em',
        fontFamily: tokens.monoFontFamily,
      },
      codeBlock: {
        margin: '0 0 20px',
        padding: '14px 16px',
        borderRadius: '12px',
        background: tokens.codeBackground,
        color: '#334155',
        fontSize: '13px',
        lineHeight: '1.7',
        overflowX: 'auto',
        fontFamily: tokens.monoFontFamily,
      },
      hr: {
        margin: '26px 0',
        borderTop: `1px solid ${tokens.borderColor}`,
        ...options.hrStyle,
      },
      image: {
        display: 'block',
        width: '100%',
        margin: '0 auto',
        borderRadius: '8px',
      },
      figure: {
        margin: '24px 0',
        ...options.figureStyle,
      },
      figcaption: {
        margin: '8px 0 0',
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '12px',
        ...options.figcaptionStyle,
      },
      table: {
        width: '100%',
        margin: '0 0 20px',
        borderCollapse: 'collapse',
        fontSize: '13px',
        ...options.tableStyle,
      },
      tableHeadCell: {
        padding: '10px 10px',
        border: `1px solid ${tokens.borderColor}`,
        background: tokens.tableHeaderBackground,
        color: '#111827',
        textAlign: 'left',
        fontWeight: '700',
        ...options.tableHeadCellStyle,
      },
      tableCell: {
        padding: '10px 10px',
        border: `1px solid ${tokens.borderColor}`,
        color: '#334155',
        textAlign: 'left',
        verticalAlign: 'top',
        ...options.tableCellStyle,
      },
    },
  }
}

export const defaultTemplate = buildTemplate({
  id: 'minimal',
  name: '极简文章',
  description: '适合大多数内容型文章，克制、清爽、稳定。',
  tone: '通用 / 克制 / 清爽',
  featured: true,
  accentColor: '#2563eb',
  rootStyle: {
    lineHeight: '1.82',
  },
  leadParagraphStyle: {
    color: '#475569',
    fontSize: '17px',
    paddingBottom: '14px',
    borderBottom: '1px solid #e2e8f0',
  },
  heading1Style: {
    fontSize: '28px',
    lineHeight: '1.34',
    letterSpacing: '-0.035em',
  },
  heading2Style: {
    borderBottom: '1px solid #dbeafe',
    paddingBottom: '8px',
    marginTop: '34px',
  },
  heading3Style: {
    fontSize: '17px',
    color: '#1e3a8a',
  },
  blockquoteStyle: {
    borderLeft: 'none',
    borderRadius: '12px',
    boxShadow: 'inset 0 0 0 1px #dbeafe',
    padding: '14px 16px',
  },
  hrStyle: {
    borderTop: '1px solid #e2e8f0',
  },
  listItemStyle: {
    margin: '0 0 10px',
  },
  figcaptionStyle: {
    letterSpacing: '0.01em',
  },
})

export const emotionalTemplate = buildTemplate({
  id: 'emotion',
  name: '情感手记',
  description: '适合观点、情绪、人物故事，阅读节奏更柔和。',
  tone: '柔和 / 叙事 / 留白',
  featured: true,
  accentColor: '#d9465f',
  textColor: '#374151',
  mutedTextColor: '#7c6f7d',
  borderColor: '#f2d8e0',
  quoteBackground: '#fff4f7',
  tableHeaderBackground: '#fff7f9',
  bodyFontFamily: serifBody,
  headingFontFamily: serifBody,
  paragraphSpacing: '18px',
  rootStyle: {
    lineHeight: '1.9',
  },
  leadParagraphStyle: {
    color: '#8b5e6b',
    fontSize: '17px',
    textAlign: 'center',
  },
  heading1Style: {
    textAlign: 'center',
    letterSpacing: '0.02em',
    fontSize: '29px',
    lineHeight: '1.45',
  },
  heading2Style: {
    textAlign: 'center',
    color: '#be3453',
    marginTop: '36px',
  },
  heading3Style: {
    color: '#9f1239',
    fontSize: '17px',
  },
  blockquoteStyle: {
    borderLeft: 'none',
    borderRadius: '12px',
    padding: '14px 16px',
    textAlign: 'center',
    lineHeight: '1.95',
  },
  hrStyle: {
    borderTop: '1px dashed #f0b6c3',
  },
  listStyle: {
    marginLeft: '20px',
  },
  listItemStyle: {
    margin: '0 0 12px',
  },
  figureStyle: {
    margin: '30px 0',
  },
  figcaptionStyle: {
    fontStyle: 'italic',
    color: '#be3453',
  },
  strongStyle: {
    color: '#be3453',
  },
})

export const businessTemplate = buildTemplate({
  id: 'business',
  name: '商务简报',
  description: '适合汇报、复盘、行业观察，结构感更强。',
  tone: '结构化 / 专业 / 信息密度高',
  featured: true,
  accentColor: '#0f766e',
  borderColor: '#d7e5e2',
  quoteBackground: '#f2fbfa',
  tableHeaderBackground: '#f0faf9',
  rootStyle: {
    lineHeight: '1.74',
  },
  leadParagraphStyle: {
    color: '#4b5563',
    fontWeight: '500',
    padding: '0 0 12px',
    borderBottom: '1px solid #d7e5e2',
  },
  heading1Style: {
    letterSpacing: '-0.02em',
    fontSize: '27px',
  },
  heading2Style: {
    borderLeft: '4px solid #0f766e',
    paddingLeft: '10px',
    marginTop: '34px',
  },
  heading3Style: {
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    fontSize: '15px',
    color: '#0f766e',
  },
  blockquoteStyle: {
    borderLeft: 'none',
    borderRadius: '10px',
    boxShadow: 'inset 0 0 0 1px #c7ece5',
    background: '#f7fcfb',
  },
  hrStyle: {
    borderTop: '1px solid #cfe2de',
  },
  listItemStyle: {
    margin: '0 0 9px',
  },
  tableHeadCellStyle: {
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
    fontSize: '12px',
    color: '#0f766e',
  },
  tableCellStyle: {
    fontSize: '13px',
  },
})

export const noticeTemplate = buildTemplate({
  id: 'notice',
  name: '正式通知',
  description: '适合公告、制度、流程说明，风格正式稳定。',
  tone: '正式 / 对称 / 官方',
  accentColor: '#334155',
  borderColor: '#cbd5e1',
  quoteBackground: '#f8fafc',
  tableHeaderBackground: '#f8fafc',
  heading1Size: '24px',
  leadParagraphStyle: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '15px',
  },
  heading1Style: {
    textAlign: 'center',
  },
  heading2Style: {
    textAlign: 'center',
    borderBottom: '1px solid #cbd5e1',
    paddingBottom: '8px',
  },
  heading3Style: {
    color: '#334155',
  },
  blockquoteStyle: {
    borderLeft: 'none',
    background: '#f8fafc',
    textAlign: 'center',
    boxShadow: 'inset 0 0 0 1px #e2e8f0',
  },
  linkStyle: {
    color: '#334155',
    borderBottom: '1px solid #94a3b8',
  },
  hrStyle: {
    borderTop: '1px solid #94a3b8',
  },
  listStyle: {
    marginLeft: '20px',
  },
})

export const storyTemplate = buildTemplate({
  id: 'story',
  name: '品牌故事',
  description: '适合品牌叙事、人物采访和长文故事。',
  tone: '叙事 / 文艺 / 温和',
  accentColor: '#7c3aed',
  textColor: '#312e81',
  mutedTextColor: '#6b7280',
  borderColor: '#ddd6fe',
  quoteBackground: '#f7f5ff',
  tableHeaderBackground: '#f7f5ff',
  bodyFontFamily: serifBody,
  headingFontFamily: serifBody,
  heading1Size: '28px',
  leadParagraphStyle: {
    color: '#5b4b8a',
    fontSize: '17px',
  },
  heading1Style: {
    letterSpacing: '0.01em',
  },
  heading2Style: {
    borderLeft: '3px solid #7c3aed',
    paddingLeft: '10px',
  },
  blockquoteStyle: {
    borderLeft: 'none',
    fontStyle: 'italic',
    borderRadius: '14px',
  },
  hrStyle: {
    borderTop: '1px dashed #c4b5fd',
  },
  figureStyle: {
    margin: '28px 0',
  },
  figcaptionStyle: {
    color: '#7c3aed',
  },
})

export const techTemplate = buildTemplate({
  id: 'tech',
  name: '科技解读',
  description: '适合技术文章、产品说明和方法拆解。',
  tone: '理性 / 清晰 / 模块化',
  accentColor: '#2563eb',
  borderColor: '#dbeafe',
  quoteBackground: '#f5f9ff',
  codeBackground: '#eff6ff',
  tableHeaderBackground: '#eff6ff',
  rootStyle: {
    letterSpacing: '0.01em',
  },
  leadParagraphStyle: {
    color: '#475569',
  },
  heading2Style: {
    borderBottom: '2px solid #2563eb',
    paddingBottom: '8px',
  },
  heading3Style: {
    color: '#1d4ed8',
    fontSize: '16px',
  },
  blockquoteStyle: {
    borderLeft: 'none',
    boxShadow: 'inset 0 0 0 1px #bfdbfe',
    borderRadius: '10px',
  },
  strongStyle: {
    color: '#1d4ed8',
  },
  tableHeadCellStyle: {
    fontSize: '12px',
  },
})

export const educationTemplate = buildTemplate({
  id: 'education',
  name: '教育笔记',
  description: '适合课程总结、学习笔记和经验分享。',
  tone: '友好 / 清楚 / 易读',
  accentColor: '#16a34a',
  borderColor: '#d9f2df',
  quoteBackground: '#f4fcf6',
  tableHeaderBackground: '#f2fbf5',
  leadParagraphStyle: {
    color: '#4b5563',
  },
  heading2Style: {
    borderLeft: '4px solid #16a34a',
    paddingLeft: '10px',
  },
  heading3Style: {
    color: '#15803d',
  },
  blockquoteStyle: {
    borderLeft: 'none',
    boxShadow: 'inset 0 0 0 1px #ccefd6',
    borderRadius: '10px',
  },
  listItemStyle: {
    margin: '0 0 10px',
  },
  hrStyle: {
    borderTop: '1px dashed #86efac',
  },
})

export const lifestyleTemplate = buildTemplate({
  id: 'lifestyle',
  name: '生活方式',
  description: '适合日常分享、审美内容和轻杂志感文章。',
  tone: '松弛 / 轻盈 / 审美导向',
  accentColor: '#ea580c',
  borderColor: '#fde4d3',
  quoteBackground: '#fff7f1',
  tableHeaderBackground: '#fff7f1',
  bodyFontFamily: serifBody,
  headingFontFamily: sansBody,
  leadParagraphStyle: {
    color: '#9a5b34',
    fontSize: '17px',
  },
  heading1Style: {
    fontWeight: '800',
  },
  heading2Style: {
    color: '#c2410c',
  },
  blockquoteStyle: {
    borderLeft: 'none',
    borderRadius: '16px',
    padding: '16px 18px',
  },
  hrStyle: {
    borderTop: '1px solid #fdba74',
  },
  figcaptionStyle: {
    color: '#c2410c',
  },
})

export const hiringTemplate = buildTemplate({
  id: 'hiring',
  name: '招聘发布',
  description: '适合岗位介绍、招聘需求和团队招募。',
  tone: '直接 / 清楚 / 信息导向',
  accentColor: '#0284c7',
  borderColor: '#d8eef7',
  quoteBackground: '#f2fbff',
  tableHeaderBackground: '#eef9fe',
  leadParagraphStyle: {
    color: '#475569',
    fontWeight: '500',
  },
  heading2Style: {
    background: '#f0f9ff',
    padding: '8px 10px',
    borderRadius: '8px',
  },
  heading3Style: {
    color: '#0369a1',
    fontSize: '16px',
  },
  blockquoteStyle: {
    borderLeft: '3px solid #38bdf8',
  },
  listItemStyle: {
    margin: '0 0 10px',
  },
  tableStyle: {
    borderRadius: '10px',
    overflow: 'hidden',
  },
  tableHeadCellStyle: {
    background: '#e0f2fe',
  },
})

export const eventTemplate = buildTemplate({
  id: 'event',
  name: '活动快讯',
  description: '适合活动预告、回顾和传播型推文。',
  tone: '轻快 / 节奏感 / 宣发导向',
  accentColor: '#db2777',
  borderColor: '#f8d4e6',
  quoteBackground: '#fff5fa',
  tableHeaderBackground: '#fff5fa',
  leadParagraphStyle: {
    color: '#9d174d',
  },
  heading1Style: {
    color: '#9d174d',
  },
  heading2Style: {
    color: '#be185d',
    borderLeft: '4px solid #ec4899',
    paddingLeft: '10px',
  },
  blockquoteStyle: {
    borderLeft: 'none',
    boxShadow: 'inset 0 0 0 1px #f9c2d8',
    borderRadius: '12px',
  },
  hrStyle: {
    borderTop: '1px dashed #f0abcc',
  },
  figcaptionStyle: {
    color: '#be185d',
  },
})

export const templatesCatalog: TemplateDefinition[] = [
  defaultTemplate,
  emotionalTemplate,
  businessTemplate,
  noticeTemplate,
  storyTemplate,
  techTemplate,
  educationTemplate,
  lifestyleTemplate,
  hiringTemplate,
  eventTemplate,
]
