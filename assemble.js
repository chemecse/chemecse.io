#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const snippetFilenames = [
  'snippets/head_boilerplate.html',
  'snippets/footer.html'
];

const snippets = {};
for (let i = 0, len = snippetFilenames.length; i < len; ++i) {
  snippets[snippetFilenames[i]] = fs.readFileSync(snippetFilenames[i]).toString();
}

const error = (err) => {
  console.error(err);
  return process.exit(1);
};

const assemble = (filename) => {
  console.log('assemble', filename);
  const buffer = fs.readFileSync(filename);
  if (!buffer) return error(`Unable to read ${filename}`);
  const file = buffer.toString();
  const lines = file.split('\n');
  for (let i = 0, len = lines.length; i < len; ++i) {
    const line = lines[i];
    const includeGuard = '<!--include(\'';
    if (line.includes(includeGuard)) {
      const snippetFilename = line.substring(line.indexOf('(') + 2, line.indexOf(')') - 1);
      console.log('  found snippet', snippetFilename);
      if (!snippets[snippetFilename]) return error(`No snippet found with name ${snippetFilename}`);
      const snippet = snippets[snippetFilename];
      lines[i] = snippet;
    }
  }
  const assembledFile = lines.join('\n');
  const assembledFilename = filename.split('.template').join('');
  console.log(`  assembled filename ${assembledFilename}`);
  fs.writeFileSync(assembledFilename, assembledFile);
}

assemble('./index.template.html');
assemble('./design/index.template.html');
assemble('./text2emoji/index.template.html');
assemble('./emoji_canvas/index.template.html');
assemble('./posts/2020-02-01-issues-running-headless-chrome-on-heroku/index.template.html');

