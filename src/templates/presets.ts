import type { TemplateDefinition, TemplateTokens } from '../renderer/types'

const sansBody =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"
const serifBody =
  "'Source Han Serif SC', 'Noto Serif SC', 'Songti SC', 'STSong', serif"
const mono =
  "'JetBrains Mono', 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace"

const flagshipTokens: TemplateTokens = {
  bodyFontFamily: serifBody,
  headingFontFamily: serifBody,
  monoFontFamily: mono,
  textColor: '#2b2622',
  mutedTextColor: '#726458',
  accentColor: '#8d5f45',
  borderColor: '#e5d8cb',
  surfaceColor: '#fffdf9',
  codeBackground: '#f7f1ea',
  quoteBackground: '#faf6f0',
  tableHeaderBackground: '#f8f2ea',
}

export const flagshipTemplate: TemplateDefinition = {
  id: 'flagship',
  name: '叙事刊物',
  description: '偏故事感、心情感和高级杂志气质的一套主打方案。',
  tone: '叙事 / 诗性 / 编辑感',
  featured: true,
  tokens: flagshipTokens,
  componentStyleMap: {
    root: {
      color: flagshipTokens.textColor,
      fontFamily: flagshipTokens.bodyFontFamily,
      fontSize: '15px',
      lineHeight: '1.92',
      letterSpacing: '0.01em',
      wordBreak: 'break-word',
    },
    paragraph: {
      margin: '0 0 18px',
      color: flagshipTokens.textColor,
    },
    leadParagraph: {
      margin: '0 0 24px',
      padding: '0 0 18px',
      color: flagshipTokens.mutedTextColor,
      fontSize: '17px',
      lineHeight: '2',
      textAlign: 'center',
      borderBottom: `1px solid ${flagshipTokens.borderColor}`,
    },
    heading1: {
      margin: '6px 0 22px',
      color: '#1f1a17',
      fontSize: '31px',
      lineHeight: '1.48',
      fontWeight: '700',
      fontFamily: flagshipTokens.headingFontFamily,
      textAlign: 'center',
      letterSpacing: '0.02em',
    },
    heading2: {
      margin: '40px 0 16px',
      padding: '0 0 10px',
      color: '#2b211b',
      fontSize: '22px',
      lineHeight: '1.5',
      fontWeight: '700',
      fontFamily: flagshipTokens.headingFontFamily,
      borderBottom: `1px solid ${flagshipTokens.borderColor}`,
    },
    heading3: {
      margin: '28px 0 12px',
      color: flagshipTokens.accentColor,
      fontSize: '16px',
      lineHeight: '1.55',
      fontWeight: '700',
      fontFamily: sansBody,
      letterSpacing: '0.06em',
    },
    blockquote: {
      margin: '26px 0',
      padding: '16px 18px',
      borderLeft: 'none',
      background: flagshipTokens.quoteBackground,
      color: flagshipTokens.mutedTextColor,
      borderRadius: '16px',
      boxShadow: `inset 0 0 0 1px ${flagshipTokens.borderColor}`,
      textAlign: 'center',
      lineHeight: '2',
    },
    list: {
      margin: '0 0 18px 20px',
      padding: '0',
    },
    listItem: {
      margin: '0 0 12px',
    },
    link: {
      color: flagshipTokens.accentColor,
      textDecoration: 'none',
      borderBottom: `1px solid ${flagshipTokens.accentColor}44`,
    },
    strong: {
      fontWeight: '700',
      color: '#6f4c38',
    },
    emphasis: {
      fontStyle: 'italic',
      color: '#6f4c38',
    },
    delete: {
      textDecoration: 'line-through',
      color: '#a79b91',
    },
    inlineCode: {
      padding: '2px 6px',
      borderRadius: '4px',
      background: flagshipTokens.codeBackground,
      color: flagshipTokens.accentColor,
      fontSize: '0.9em',
      fontFamily: flagshipTokens.monoFontFamily,
    },
    codeBlock: {
      margin: '0 0 22px',
      padding: '15px 16px',
      borderRadius: '14px',
      background: flagshipTokens.codeBackground,
      color: '#4b4037',
      fontSize: '13px',
      lineHeight: '1.74',
      overflowX: 'auto',
      fontFamily: flagshipTokens.monoFontFamily,
      boxShadow: `inset 0 0 0 1px ${flagshipTokens.borderColor}`,
    },
    hr: {
      margin: '34px auto',
      width: '72px',
      borderTop: `1px solid ${flagshipTokens.borderColor}`,
    },
    figure: {
      margin: '30px 0',
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
      fontStyle: 'italic',
    },
    table: {
      width: '100%',
      margin: '0 0 24px',
      borderCollapse: 'collapse',
      fontSize: '13px',
    },
    tableHeadCell: {
      padding: '11px 10px',
      border: `1px solid ${flagshipTokens.borderColor}`,
      background: flagshipTokens.tableHeaderBackground,
      color: '#3b3028',
      textAlign: 'left',
      fontWeight: '700',
    },
    tableCell: {
      padding: '11px 10px',
      border: `1px solid ${flagshipTokens.borderColor}`,
      color: '#54493f',
      textAlign: 'left',
      verticalAlign: 'top',
    },
  },
}

export const templatesCatalog: TemplateDefinition[] = [flagshipTemplate]
