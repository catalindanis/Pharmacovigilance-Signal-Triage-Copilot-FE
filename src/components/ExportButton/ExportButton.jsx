export default function ExportButton({ filename = 'signal-packet' }) {
  function exportPrintable() {
    const el = document.getElementById('export-content')
    if (!el) {
      const blob = new Blob([JSON.stringify({ error: 'no content' })], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}.json`
      a.click()
      URL.revokeObjectURL(url)
      return
    }

    const html = `
      <html>
        <head>
          <title>Signal Packet - ${filename}</title>
          <style>body{font-family:Arial,Helvetica,sans-serif;padding:20px}</style>
        </head>
        <body>
          ${el.innerHTML}
        </body>
      </html>`

    const w = window.open('', '_blank')
    if (!w) {
      // fallback to download JSON
      const blob = new Blob([JSON.stringify({ error: 'popup_blocked' })], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${filename}.json`
      a.click()
      URL.revokeObjectURL(url)
      return
    }

    w.document.open()
    w.document.write(html)
    w.document.close()
    w.focus()
    // give the window a moment to render
    setTimeout(() => w.print(), 300)
  }

  return (
    <button onClick={exportPrintable} style={{ padding: '8px 12px' }}>Export (Print to PDF)</button>
  )
}
