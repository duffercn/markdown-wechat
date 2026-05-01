import { useDeferredValue, useState } from 'react'
import './App.css'
import { copyRichText } from './clipboard/copyRichText'
import { SAMPLE_MARKDOWN } from './content/sampleMarkdown'
import { renderMarkdown } from './renderer/renderMarkdown'
import { getTemplate, templates } from './templates'

function App() {
  const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN)
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? 'default')
  const [copyStatus, setCopyStatus] = useState('')
  const deferredMarkdown = useDeferredValue(markdown)
  const template = getTemplate(templateId)
  const featuredTemplates = templates.filter((item) => item.featured)
  const renderResult = renderMarkdown(deferredMarkdown, {
    templateId,
    sanitize: true,
    forClipboard: false,
  })

  const handleCopy = async () => {
    const latestResult = renderMarkdown(markdown, {
      templateId,
      sanitize: true,
      forClipboard: true,
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
            <p className="eyebrow">Markdown to WeChat</p>
            <h1>微信公众号文章排版工具</h1>
          </div>

          <div className="template-hub">
            <label className="template-picker">
              <span>模板</span>
              <select
                value={templateId}
                onChange={(event) => setTemplateId(event.target.value)}
              >
                {templates.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="featured-inline">
              {featuredTemplates.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={item.id === templateId ? 'template-chip active' : 'template-chip'}
                  onClick={() => setTemplateId(item.id)}
                >
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="toolbar-actions">
            <button type="button" className="ghost" onClick={() => setMarkdown('')}>
              清空
            </button>
            <button
              type="button"
              className="ghost"
              onClick={() => setMarkdown(SAMPLE_MARKDOWN)}
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
          <span className="template-note">{template.tone}</span>
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
            <p>按约 390px 手机宽度模拟文章阅读区，更接近真实公众号观感。</p>
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
