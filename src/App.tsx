import { useDeferredValue, useState } from 'react'
import './App.css'
import { copyRichText } from './clipboard/copyRichText'
import { getSampleMarkdown, isSampleMarkdown } from './content/sampleMarkdown'
import type { AppearanceOptions, FontSizeOption, LineHeightOption } from './renderer/types'
import { renderMarkdown } from './renderer/renderMarkdown'
import { getTemplate, templates } from './templates'

const fontSizeOptions: Array<{ label: string; value: FontSizeOption }> = [
  { label: '小', value: 'small' },
  { label: '标准', value: 'standard' },
  { label: '大', value: 'large' },
]

const lineHeightOptions: Array<{ label: string; value: LineHeightOption }> = [
  { label: '紧凑', value: 'compact' },
  { label: '标准', value: 'standard' },
  { label: '舒展', value: 'spacious' },
]

const accentOptionsByTemplate: Record<string, Array<{ label: string; value: string }>> = {
  'editorial-journal': [
    { label: '栗木', value: '#7b523d' },
    { label: '酒红', value: '#8f2f3c' },
    { label: '墨绿', value: '#3f6652' },
  ],
  'clean-standard': [
    { label: '蓝', value: '#0d75fc' },
    { label: '橙红', value: '#f95738' },
    { label: '墨灰', value: '#3f3f3f' },
  ],
  'quiet-gallery': [
    { label: '赭红', value: '#8d332b' },
    { label: '橄榄', value: '#5f6f52' },
    { label: '暖灰', value: '#766d62' },
  ],
}

const getAccentOptions = (templateId: string) =>
  accentOptionsByTemplate[templateId] ?? accentOptionsByTemplate['editorial-journal']

function App() {
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? 'editorial-journal')
  const [markdown, setMarkdown] = useState(getSampleMarkdown(templateId))
  const [fontSize, setFontSize] = useState<FontSizeOption>('standard')
  const [lineHeight, setLineHeight] = useState<LineHeightOption>('standard')
  const [accentColor, setAccentColor] = useState(getAccentOptions(templateId)[0]?.value ?? '#7b523d')
  const [copyStatus, setCopyStatus] = useState('')
  const deferredMarkdown = useDeferredValue(markdown)
  const template = getTemplate(templateId)
  const accentOptions = getAccentOptions(templateId)
  const appearance: AppearanceOptions = {
    fontSize,
    lineHeight,
    accentColor,
  }
  const renderResult = renderMarkdown(deferredMarkdown, {
    templateId,
    sanitize: true,
    forClipboard: false,
    appearance,
  })

  const handleCopy = async () => {
    const latestResult = renderMarkdown(markdown, {
      templateId,
      sanitize: true,
      forClipboard: true,
      appearance,
    })

    try {
      await copyRichText(latestResult.clipboardHtml, markdown)
      setCopyStatus('已复制为富文本，直接粘贴到公众号编辑器即可。')
    } catch (error) {
      console.error(error)
      setCopyStatus('复制失败。请尝试使用 Chromium 浏览器，或手动复制预览区内容。')
    }
  }

  return (
    <main className="app-shell">
      <section className="topbar-panel">
        <div className="toolbar compact-toolbar">
          <div className="product-block">
            <p className="eyebrow">Curated Editorial Layout</p>
            <h1>微信公众号文章排版工具</h1>
          </div>

          <div className="design-badge" aria-live="polite">
            <strong>{template.name}</strong>
            <span>{template.tone}</span>
          </div>

          <div className="toolbar-actions">
            <button type="button" className="ghost" onClick={() => setMarkdown('')}>
              清空
            </button>
            <button
              type="button"
              className="ghost"
              onClick={() => setMarkdown(getSampleMarkdown(templateId))}
            >
              粘贴示例
            </button>
            <button type="button" className="primary" onClick={handleCopy}>
              复制到公众号
            </button>
          </div>
        </div>

        <div className="status-row" aria-live="polite">
          <span>{copyStatus || `${template.name} · ${template.description}`}</span>
          <span className="template-note">精选 {templates.length} 套高区分度模板</span>
        </div>

        <div className="template-switcher" aria-label="选择文章模板">
          {templates.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === templateId ? 'template-card active' : 'template-card'}
              onClick={() => {
                if (isSampleMarkdown(markdown)) {
                  setMarkdown(getSampleMarkdown(item.id))
                }
                setTemplateId(item.id)
                setAccentColor(getAccentOptions(item.id)[0]?.value ?? item.tokens.accentColor)
                setCopyStatus('')
              }}
            >
              <span className="template-card-name">{item.name}</span>
              <span className="template-card-tone">{item.tone}</span>
              <span className="template-card-desc">{item.description}</span>
            </button>
          ))}
        </div>

        <div className="tuning-bar" aria-label="排版微调">
          <div className="control-group">
            <span>字号</span>
            <div className="segmented-control">
              {fontSizeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={fontSize === option.value ? 'active' : ''}
                  onClick={() => setFontSize(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <span>行距</span>
            <div className="segmented-control">
              {lineHeightOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={lineHeight === option.value ? 'active' : ''}
                  onClick={() => setLineHeight(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group accent-group">
            <span>强调色</span>
            <div className="swatch-control">
              {accentOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={accentColor === option.value ? 'active' : ''}
                  onClick={() => setAccentColor(option.value)}
                  title={option.label}
                  aria-label={option.label}
                >
                  <span style={{ backgroundColor: option.value }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="workspace">
        <article className="panel editor-panel">
          <div className="panel-header">
            <h2>Markdown 输入</h2>
            <p>贴入你的文章内容，保留原始写作体验。</p>
          </div>

          <textarea
            className="editor"
            value={markdown}
            onChange={(event) => setMarkdown(event.target.value)}
            placeholder="在这里输入 Markdown..."
            spellCheck={false}
          />
        </article>

        <article className="panel preview-panel">
          <div className="panel-header">
            <h2>公众号预览</h2>
            <p>按约 390px 手机宽度模拟成品阅读效果，强调标题比例、导语节奏与叙事感。</p>
          </div>

          <div className="wechat-stage">
            <div className="phone-preview">
              <div className="phone-preview-bar">
                <span />
                <strong>公众号文章</strong>
                <span />
              </div>
              <div
                className="wechat-article"
                dangerouslySetInnerHTML={{ __html: renderResult.previewHtml }}
              />
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
