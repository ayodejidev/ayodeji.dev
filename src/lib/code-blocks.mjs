const labels = { bash: 'Shell', sh: 'Shell', shell: 'Shell', shellscript: 'Shell', console: 'Terminal', plaintext: 'Text', text: 'Text', js: 'JavaScript', javascript: 'JavaScript', ts: 'TypeScript', typescript: 'TypeScript', py: 'Python', python: 'Python', json: 'JSON', yaml: 'YAML', yml: 'YAML', http: 'HTTP', html: 'HTML', css: 'CSS', md: 'Markdown', markdown: 'Markdown' };

export function codeLanguage(block) {
  const code = block.querySelector('code');
  const language = block.dataset.language || code?.className.match(/(?:^|\s)language-([^\s]+)/u)?.[1] || 'text';
  return labels[language.toLowerCase()] ?? language;
}

/** Copy the code node only, preserving whitespace and excluding toolbar text. */
export async function copyCode(code, clipboard) {
  if (!clipboard?.writeText) throw new Error('Clipboard unavailable');
  await clipboard.writeText(code.textContent ?? '');
}

export function enhanceCodeBlocks(article) {
  const document = article.ownerDocument;
  for (const block of article.querySelectorAll('pre')) {
    if (block.parentElement?.classList.contains('code-example')) continue;
    const code = block.querySelector('code');
    if (!code) continue;
    const language = codeLanguage(block);
    const frame = document.createElement('figure');
    frame.className = 'code-example';
    const toolbar = document.createElement('figcaption');
    toolbar.className = 'code-toolbar';
    const label = document.createElement('span');
    label.className = 'code-language';
    label.textContent = `Code / ${language}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy';
    button.dataset.copyCode = '';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', `Copy ${language} code`);
    const status = document.createElement('p');
    status.className = 'code-copy-status';
    status.setAttribute('role', 'status');
    let reset;
    button.addEventListener('click', async () => {
      clearTimeout(reset);
      try {
        await copyCode(code, navigator.clipboard);
        button.textContent = 'Copied';
        status.textContent = `${language} code copied.`;
      } catch {
        const selection = document.getSelection();
        const range = document.createRange();
        range.selectNodeContents(code);
        selection?.removeAllRanges();
        selection?.addRange(range);
        status.textContent = 'Code selected. Press Ctrl+C or Command+C to copy.';
      }
      reset = setTimeout(() => { button.textContent = 'Copy'; }, 2000);
    });
    toolbar.append(label, button);
    block.before(frame);
    frame.append(toolbar, block, status);
  }
}
