import React, { useState } from 'react';
import '../App.css';
import EmojiPreviewBox from './EmojiPreviewBox';

/** フォント情報 */
export type Font = {
  displayName: string,
  name: string,
};

/** FontButtonプロパティ */
type FontButtonProps = {
  text: string,
  fonts: Font[],
  onClick: (font: Font) => void,
}

const FontButton = ({ text, fonts, onClick }: FontButtonProps) => {
  /** 選択中フォント */
  const [selectedFont, setSelectedFont] = useState({
    displayName: '',
    name: '',
  });

  /**
   * ボタンクリックイベント
   */
  const buttonOnClick = (font: Font) => {
    setSelectedFont(font);
    onClick(font);
  }

  return (
    <>
      <div>
        <span className='font'>
          {
            fonts.map((font) => {
              return (
                <button name={font.name} value={font.name} onClick={buttonOnClick.bind(this, font)} disabled={selectedFont.name === font.name} className='font-button'>
                  <EmojiPreviewBox text={text !== "" ? text : "おふとん\nかけてあげ\nましょうね"} font={font} color='#ff0000' />
                  <span className='font-name'>{font.displayName}</span>
                </button>
              );
            })
          }
        </span>
      </div>
    </>
  );
}

export default FontButton;
