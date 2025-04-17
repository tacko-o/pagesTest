import React, { useEffect, useState } from 'react';
import Fonts from './resources/fonts.json'
import ConvertList from './resources/letter_convert_list.json'
import './App.css';
import FontButton, { Font } from './components/FontButton';
import NotePreview from './components/NotePreview';
import { getPng } from './utils/EmojiRenderer';

const Main = () => {
  /** 絵文字名変換表 */
const convertList: { [key: string]: string } = ConvertList;

  /** 絵文字にする文字列 */
  const [text, setText] = useState('おふとん\nかけてあげ\nましょうね');

  /** 選択中のフォント名 */
  const [selectedFont, setSelectedFont] = useState(Fonts[0]);

  /** 文字色 */
  const [color, setColor] = useState('#000000');

  /** 境界線色 */
  const [borderColor, setBorderColor] = useState('#ffffff');

  /** 色 */
  const [borderWidth, setborderWidth] = useState(10);

  /** 絵文字画像 */
  const [png, setPng] = useState('');

  useEffect(() => {
    (async () => {
      setPng(await getPng(text, selectedFont, color, borderColor, borderWidth));
    })();
  }, [text, selectedFont, color]);

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
  /**
   * テキストエリア要素変更イベント
   * @param e textarea要素変更イベント
   */
  const handleTextChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  /**
   * フォント選択ボタンクリックイベント
   * @param e イベントハンドラ
   */
  const fontButtonOnClick = (font: Font) => {
    setSelectedFont(font);
  }

  return (
    <div className="App-header">
      <div style={{display: 'flex'}}>
        {/* テキスト */}
        <textarea value={text} onChange={handleTextChange} />
        {/* 画像プレビュー */}
        <span className='emoji-preview'>
        {png && <img alt="result" src={png} />}
        </span>
        { /* フォントボタン群 */}
        <FontButton text={text} fonts={Fonts} onClick={fontButtonOnClick} />
      </div>
      <div>
        {/* ノートプレビュー */}
        <NotePreview png={png}/>
        <NotePreview png={png} dark/>
      </div>
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
