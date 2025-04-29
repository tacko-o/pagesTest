import '../css/App.css';
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
  selectedFont: Font,
  onClick: (font: Font) => void,
}

const FontButton = ({ text, fonts, selectedFont, onClick }: FontButtonProps) => {
  /**
   * ボタンクリックイベント
   */
  const buttonOnClick = (font: Font) => {
    onClick(font);
  }

  return (
    <>
      <div>
        <span className='font-buttons'>
          {
            fonts.map((font) => {
              return (
                <button name={font.name} value={font.name} onClick={buttonOnClick.bind(this, font)} disabled={selectedFont.name === font.name} className='font-button'>
                  <EmojiPreviewBox text={text !== "" ? text : "おふとん\nかけてあげ\nましょうね"} font={font} color='#ff0000' />
                  <span className='font-name' style={{fontFamily: font.name}}>{font.displayName}</span>
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
