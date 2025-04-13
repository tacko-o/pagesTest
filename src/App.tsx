import React, { useEffect, useRef, useState } from 'react';
import ReactDOMServer from "react-dom/server";
import Fonts from './resource/fonts.json'
import ConvertList from './resource/letter_convert_list.json'
import './App.css';
import FontButton from './FontButton';
import EmojiPreviewBox from './EmojiPreviewBox';

/**
 * 絵文字名変換表
 */
const convertList: { [key: string]: string } = ConvertList;

const Main = () => {
  /** 絵文字にする文字列 */
  const [text, setText] = useState('');

  /**
   * 選択中のフォント名
   */
  const [selectedFont, setSelectedFont] = useState(Fonts[0]);

  /**
   * 色
   */
  const [color, setColor] = useState('#000000');

  /**
   * 最大級サーバー向け文字変換関数
   */
  const createEmojiName = () => {
    let convertedText = text;

    // 変換表に基づいて変換
    Object.keys(convertList).forEach((letter: string) => {
      convertedText.replaceAll(letter, convertList[letter]);
    });

    // 長音記号は前の文字と一致させる
    let i = 0;
    while (convertedText.indexOf("ー", i) > -1) {
      const preLetter = convertedText[convertedText.indexOf("ー", i) - 1];
      console.log(preLetter);
      convertedText = convertedText.replace("ー", preLetter);
      i++;
    }
  }

  const [png, setPng] = useState<string | null>(null)

  useEffect(() => {
    const fontSize = 32;
    const pngDataArr: string[] = [];

    // draw
    const textLine = text.split('\n');
    textLine.forEach((line, i) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128 / (4 / textLine.length);
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px '${selectedFont.name}', serif`;
      ctx.scale(4 / line.length, 4 / textLine.length);
      ctx.fillText(line, 0, 0);//((canvas.height / textLine.length) * i) / (4 / textLine.length));

      pngDataArr.push(canvas.toDataURL());
    });

    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    //setPng(concatCanvas(canvas, pngDataArr));
    setPng(pngDataArr[0])
  }, [text, selectedFont])

  /**
   * Canvas合成
   * @param {string} canvas 合成結果を描画するcanvas
   * @param {array} pngDataArr 合成するpng
   * @returns {string} png
   */
  const concatCanvas = (canvas: HTMLCanvasElement, pngDataArr: string[]): string => {
    const ctx = canvas.getContext("2d")!;

    for (let i = 0; i < pngDataArr.length; i++) {
      const image = new Image();
      image.src = pngDataArr[i];
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    return canvas.toDataURL();
  }

  /**
   * テキストエリア要素変更イベント
   * @param e textarea要素変更イベント
   */
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="App-header">
      <div>
        {/* テキスト */}
        <textarea value={text} style={{ fontFamily: selectedFont.name }} onChange={handleTextChange} />
      </div>
      <div>
        <span className='font'>
          {
            /* フォントボタン */
            Fonts.map((font) => {
              return <FontButton key={font.name} text={text} font={font} pressed={selectedFont.name === font.name} onClick={() => { setSelectedFont(font); }} />
            })
          }
        </span>
      </div>
      {png && (
        <div className="comp" style={{ display: 'flex' }}>
          <img alt="result" src={png} />
        </div>
      )}
    </div>
  );
}

const App = () => {
  return (
    <>
      {/* フォント読み込み */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href={`https://fonts.googleapis.com/css2?${Fonts.map((font) => 'family=' + font.name.replaceAll(' ', '+')).join('&')}&display=swap`} rel="stylesheet" />
      <h1>Emoji Generator for Misskey</h1>
      <div className="main">
        <Main />
      </div>
    </>
  );
}

export default App;
