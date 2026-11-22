import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { readFileSync } from 'fs';

const data = new Uint8Array(readFileSync('D:/Portfolio/resume.pdf'));

pdfjsLib.getDocument({ data }).promise.then(async (doc) => {
  let fullText = '';
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    fullText += strings.join(' ') + '\n--- PAGE BREAK ---\n';
  }
  console.log(fullText);
}).catch(e => console.error('Error:', e.message));
