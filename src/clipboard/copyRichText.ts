export async function copyRichText(html: string, plainText: string): Promise<void> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && 'ClipboardItem' in window) {
    const item = new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([plainText], { type: 'text/plain' }),
    })

    await navigator.clipboard.write([item])
    return
  }

  legacyCopy(html, plainText)
}

function legacyCopy(html: string, plainText: string): void {
  const container = document.createElement('div')
  container.innerHTML = html
  container.contentEditable = 'true'
  container.style.position = 'fixed'
  container.style.pointerEvents = 'none'
  container.style.opacity = '0'
  container.style.inset = '0'
  document.body.appendChild(container)

  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(container)

  selection?.removeAllRanges()
  selection?.addRange(range)

  const copied = document.execCommand('copy')
  selection?.removeAllRanges()
  document.body.removeChild(container)

  if (!copied) {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(plainText)
    }
    throw new Error('Rich text copy is not supported in this browser.')
  }
}
