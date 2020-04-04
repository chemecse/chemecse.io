const FONT_HEIGHT = 5;

const FONT = {
  'a': [
    '0110',
    '1001',
    '1111',
    '1001',
    '1001'
  ],
  'b': [
    '1110',
    '1001',
    '1111',
    '1001',
    '1110'
  ],
  'c': [
    '0110',
    '1001',
    '1000',
    '1001',
    '0110'
  ],
  'd': [
    '1110',
    '1001',
    '1001',
    '1001',
    '1110'
  ],
  'e': [
    '1111',
    '1000',
    '1111',
    '1000',
    '1111'
  ],
  'f': [
    '1111',
    '1000',
    '1111',
    '1000',
    '1000'
  ],
  'g': [
    '0111',
    '1000',
    '1011',
    '1001',
    '0110'
  ],
  'h': [
    '1001',
    '1001',
    '1111',
    '1001',
    '1001'
  ],
  'i': [
    '1',
    '1',
    '1',
    '1',
    '1'
  ],
  'j': [
    '0001',
    '0001',
    '0001',
    '1001',
    '0110'
  ],
  'k': [
    '1001',
    '1010',
    '1100',
    '1010',
    '1001'
  ],
  'l': [
    '1000',
    '1000',
    '1000',
    '1000',
    '1111'
  ],
  'm': [
    '10001',
    '11011',
    '10101',
    '10001',
    '10001'
  ],
  'n': [
    '10001',
    '11001',
    '10101',
    '10011',
    '10001'
  ],
  'o': [
    '0110',
    '1001',
    '1001',
    '1001',
    '0110'
  ],
  'p': [
    '1110',
    '1001',
    '1110',
    '1000',
    '1000'
  ],
  'q': [
    '0110',
    '1001',
    '1001',
    '0110',
    '0001'
  ],
  'r': [
    '1110',
    '1001',
    '1110',
    '1010',
    '1001'
  ],
  's': [
    '0111',
    '1000',
    '0110',
    '0001',
    '1110'
  ],
  't': [
    '111',
    '010',
    '010',
    '010',
    '010'
  ],
  'u': [
    '1001',
    '1001',
    '1001',
    '1001',
    '0110'
  ],
  'v': [
    '10001',
    '10001',
    '01010',
    '01010',
    '00100'
  ],
  'w': [
    '10001',
    '10101',
    '10101',
    '10101',
    '01010'
  ],
  'x': [
    '10001',
    '01010',
    '00100',
    '01010',
    '10001'
  ],
  'y': [
    '10001',
    '01010',
    '00100',
    '00100',
    '00100'
  ],
  'z': [
    '111',
    '001',
    '010',
    '100',
    '111'
  ],
  '1': [
    '110',
    '010',
    '010',
    '010',
    '111'
  ],
  '2': [
    '1110',
    '0001',
    '0110',
    '1000',
    '1111'
  ],
  '3': [
    '1110',
    '0001',
    '0110',
    '0001',
    '1110'
  ],
  '4': [
    '10010',
    '10010',
    '11111',
    '00010',
    '00010'
  ],
  '5': [
    '1111',
    '1000',
    '1110',
    '0001',
    '1110'
  ],
  '6': [
    '0110',
    '1000',
    '1110',
    '1001',
    '0110'
  ],
  '7': [
    '1111',
    '0001',
    '0010',
    '0100',
    '0100'
  ],
  '8': [
    '0110',
    '1001',
    '0110',
    '1001',
    '0110'
  ],
  '9': [
    '0110',
    '1001',
    '0111',
    '0001',
    '0110'
  ],
  '0': [
    '0110',
    '1001',
    '1001',
    '1001',
    '0110'
  ],
  '!': [
    '1',
    '1',
    '1',
    '0',
    '1'
  ],
  ' ': [
    '0',
    '0',
    '0',
    '0',
    '0'
  ]
};

const presets = [
  { text: 'meow', fg: '🎹', bg: '🐱' },
  { text: 'rats', fg: '🐀', bg: '🧀' },
  { text: 'xmas', fg: '🎁', bg: '🎄' }
];

const feelingLuckyPreset = { text: 'lucky', fg: '☘️', bg: '🌟' };

const emojiFromBinary = (binaryString, foregroundEmoji, backgroundEmoji) => {
  let emojiString = '';
  for (let i = 0, iLen = binaryString.length; i < iLen; ++i) {
    emojiString += (binaryString[i] === '1') ? foregroundEmoji : backgroundEmoji;
  }
  return emojiString;
};

const generateEmojiText = (inputText, foregroundEmoji, backgroundEmoji) => {
  let text = '';
  let textWidth;
  for (let i = 0, iLen = FONT_HEIGHT; i < iLen; ++i) {
    textWidth = 0;
    for (let j = 0, jLen = inputText.length; j < jLen; ++j) {
      const fontIndex = inputText[j].toLowerCase();
      const fontCharacter = FONT[fontIndex];
      if (!fontCharacter) continue;
      const binaryString = `0${fontCharacter[i]}0`;
      textWidth += binaryString.length;
      text += emojiFromBinary(binaryString, foregroundEmoji, backgroundEmoji);
    }
    text += '\n';
  }

  const emptyLine = backgroundEmoji.repeat(textWidth);
  return `${emptyLine}\n${text}${emptyLine}`;
};

const generateEmojiImage = (inputText, generatedEmojiText, imageElement, downloadImageLinkElement) => {
  const emojiLines = generatedEmojiText.split('\n');

  const canvas = document.createElement('canvas');
  imageElement.width = canvas.width = emojiLines[0].length * 8;
  imageElement.height = canvas.height = emojiLines.length * 18;

  const ctx = canvas.getContext('2d');
  ctx.font = '12px monospace';
  emojiLines.forEach((line, idx) => {
    ctx.fillText(line, 0, 12 + idx * 18);
  });

  const dataUrl = canvas.toDataURL();
  downloadImageLinkElement.href = dataUrl;
  imageElement.src = dataUrl;
  imageElement.alt = `The phrase "${inputText}" written using emojis`;
};

window.onload = () => {
  const foregroundEmojiElement = document.getElementById('foreground-emoji');
  const backgroundEmojiElement = document.getElementById('background-emoji');
  const inputTextElement = document.getElementById('input-text');
  const swapEmojiButtonElement = document.getElementById('swap-emoji-button');
  const feelingLuckyButtonElement = document.getElementById('feeling-luck-button');
  const generatedEmojiTextElement = document.getElementById('generated-emoji-text');
  const inputFormElement = document.getElementById('input-form');
  const imageElement = document.getElementById('generated-emoji-image');
  const copyTextButtonElement = document.getElementById('copy-text-button');
  const downloadImageLinkElement = document.getElementById('download-image-link');

  const generate = () => {
    const inputText = inputTextElement.value;
    const generatedEmojiText = generateEmojiText(
      inputText,
      foregroundEmojiElement.value,
      backgroundEmojiElement.value
    );
    generatedEmojiTextElement.value = generatedEmojiText;
    generateEmojiImage(inputText, generatedEmojiText, imageElement, downloadImageLinkElement);
  }

  const set = (preset) => {
    foregroundEmojiElement.value = preset.fg;
    backgroundEmojiElement.value = preset.bg;
    inputTextElement.value = preset.text;
    generate();
  };

  const presetIdx = Math.floor(Math.random() * presets.length);
  set(presets[presetIdx]);

  inputFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    generate();
  });

  swapEmojiButtonElement.addEventListener('click', () => {
    const foregroundEmoji = foregroundEmojiElement.value;
    const backgroundEmoji = backgroundEmojiElement.value;
    foregroundEmojiElement.value = backgroundEmoji;
    backgroundEmojiElement.value = foregroundEmoji;
    generate();
  });

  feelingLuckyButtonElement.addEventListener('click', () => {
    set(feelingLuckyPreset);
  });

  copyTextButtonElement.addEventListener('click', () => {
    generatedEmojiTextElement.select();
    document.execCommand('copy');
  });
};
