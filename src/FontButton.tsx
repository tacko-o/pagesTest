import React from 'react';
import './App.css';
import EmojiPreviewBox from './EmojiPreviewBox';

type FontButtonProps = {
  text: string,
  font: {
    displayName: string,
    name: string,
  }
  pressed: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const FontButton = ({ text, font, pressed, onClick }: FontButtonProps) => {
  return (
    <>
      <div>
        <span className='font'>
          <button name={font.name} value={font.name} onClick={onClick} disabled={pressed} className='font-button'>
            <EmojiPreviewBox text={text !== "" ? text : "おふとん\nかけてあげ\nましょうね"} font={font} color='#ff0000'/>
            <span className='font-name'>{font.displayName}</span>
          </button>
        </span>
      </div>
    </>
  );
}

export default FontButton;
