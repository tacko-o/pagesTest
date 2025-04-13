import { useEffect, useState } from 'react';
import './App.css';

type EmojiPreviewBoxProps = {
  text: string,
  font: {
    displayName: string,
    name: string,
  }
  color: string,
}
const EmojiPreviewBox = ({ text, font, color }: EmojiPreviewBoxProps) => {


  const [textLine, setTextLine] = useState(text.split('\n'));

  /**
   * テキスト更新処理
   */
  useEffect(() => {
    setTextLine(text.split('\n'));

    if (textLine.some((line) => line.length > Number(process.env.REACT_APP_MAX_LETTERS_AT_LINE))) {
      console.log("文字数超過テスト")
    };
  }, [text]);
  // , transform: `scale(${3 / line.length}, ${3 / textLine.length})`,
  return (
    <>
      <span style={{ fontFamily: font.name }} className='font-preview'>
        {
          textLine.map((line, i) => {
            return <div key={i} className='font-preview-content' style={{ color: color, transform: `scale(${3 / line.length}, ${3 / textLine.length})`, lineHeight: `${3 / textLine.length}em` }}>{line}</div>
          })
        }
      </span>
    </>
  );
}

export default EmojiPreviewBox;
