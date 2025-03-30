import React, { useEffect, useState } from 'react';
import Fonts from './fonts.json'
import ConvertList from './letter_convert_list.json'
import './App.css';

/**
 * 読み込むフォントリスト
 */
const fontList = Fonts;

/**
 * 絵文字名変換表
 */
const convertList: {[key: string]: string} = ConvertList;

const Main = () => {
  /** 絵文字にする文字列 */
  const [text, setText] = useState('');

  /** フォント名 */
  const [fontName, setFontName] = useState(fontList[0] !== undefined ? fontList[0].name : '');

  const createEmojiName = () => {
    Object.keys(convertList).forEach((letter: string) => {
      text.replaceAll(letter, convertList[letter]);
    }); 
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
        <textarea value={text} style={{fontFamily: fontName}} onChange={handleTextChange} />
      </div>
      <div>
        <span className='font'>
          {
            /* フォント名 */
            Fonts.map((font) => {
              return <button name={font.name} value={font.name} style={{fontFamily: font.name}} onClick={() => { setFontName(font.name) }}>{font.displayName}</button>
            })
          }
        </span>
      </div>
    </div>
  );
}

const App = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href={`https://fonts.googleapis.com/css2?${Fonts.map((font) => 'family=' + font.name.replaceAll(' ', '+')).join('&')}&display=swap`} rel="stylesheet" />
      <div className="main">
        <Main />
      </div>
    </>
  );
}

export default App;
