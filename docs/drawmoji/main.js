// TODO: provide a better mobile experience

const emojiFromBinary = (binaryString, foregroundEmoji, backgroundEmoji) => {
  let emojiString = '';
  for (let i = 0, iLen = binaryString.length; i < iLen; ++i) {
    emojiString += (binaryString[i] === '1') ? foregroundEmoji : backgroundEmoji;
  }
  return emojiString;
};

const getCanvasCoordinates = (e, canvas) => {
  const x = e.pageX - canvas.offsetLeft;
  const y = e.pageY - canvas.offsetTop;
  return { x, y };
};

const generate = (foregroundEmoji, backgroundEmoji, canvas, ctx, generatedEmojiTextElement) => {
  // TODO: tune interval
  const interval = 10;
  let text = '';
  for (let i = 0, iLen = canvas.height; i < iLen; i += interval) {
    let binaryString = '';
    for (let j = 0, jLen = canvas.width; j < jLen; j += interval) {
      const imageData = ctx.getImageData(j, i, interval, interval);
      let signal = 0;
      for (let k = 0, kLen = imageData.data.length; k < kLen; k += 4) {
        signal += (imageData.data[k + 0] || imageData.data[k + 1] || imageData.data[k + 2] || imageData.data[k + 3]) ? 1 : -1;
      }
      binaryString += (signal > 0) ? '1' : '0';
    }
    text += `${emojiFromBinary(binaryString, foregroundEmoji, backgroundEmoji)}\n`;
  }

  generatedEmojiTextElement.value = text;
};

window.onload = () => {
  // TODO: cleanup
  const canvas = document.getElementById('canvas');
  const clearButtonElement = document.getElementById('clear-button');
  const foregroundEmojiElement = document.getElementById('foreground-emoji');
  const backgroundEmojiElement = document.getElementById('background-emoji');
  const generatedEmojiTextElement = document.getElementById('generated-emoji-text');
  const inputFormElement = document.getElementById('input-form');
  const swapEmojiButtonElement = document.getElementById('swap-emoji-button');
  const copyButtonElement = document.getElementById('copy-text-button');

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'green';
  let isMouseDown = false;

  const mouseUpEventHandler = () => { isMouseDown = false };
  const mouseDownEventHandler = (e) => {
    isMouseDown = true;
    const { x, y } = getCanvasCoordinates(e, canvas);
    ctx.fillRect(x, y, 20, 20);
  };
  const mouseMoveEventHandler = (e) => {
    if (isMouseDown) {
      const { x, y } = getCanvasCoordinates(e, canvas);
      // TODO: make rect size customizable
      ctx.fillRect(x, y, 20, 20);
    }
  };

  // TODO: fix mobile touchscreen support
  canvas.addEventListener('mouseup', mouseUpEventHandler);
  canvas.addEventListener('mouseout', mouseUpEventHandler);
  canvas.addEventListener('touchend', mouseUpEventHandler);
  canvas.addEventListener('touchcancel', mouseUpEventHandler);

  canvas.addEventListener('mousedown', mouseDownEventHandler);
  canvas.addEventListener('touchstart', mouseDownEventHandler)

  canvas.addEventListener('mousemove', mouseMoveEventHandler);
  canvas.addEventListener('touchmove', mouseMoveEventHandler);

  foregroundEmojiElement.value = '🌳';
  backgroundEmojiElement.value = '🐼';
  generatedEmojiTextElement.value = '';

  clearButtonElement.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  inputFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    generate(foregroundEmojiElement.value, backgroundEmojiElement.value, canvas, ctx, generatedEmojiTextElement);
  });


  swapEmojiButtonElement.addEventListener('click', () => {
    const foregroundEmoji = foregroundEmojiElement.value;
    const backgroundEmoji = backgroundEmojiElement.value;
    foregroundEmojiElement.value = backgroundEmoji;
    backgroundEmojiElement.value = foregroundEmoji;
    generate(backgroundEmoji, foregroundEmoji, canvas, ctx, generatedEmojiTextElement);
  });

  copyButtonElement.addEventListener('click', () => {
    generatedEmojiTextElement.select();
    document.execCommand('copy');
  });
};
