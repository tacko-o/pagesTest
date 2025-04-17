import '../Note.css';
import icon from'../resources/identicon.png'

/** FontButtonプロパティ */
type NotePreviewProps = {
  png: string,
  dark?: boolean,
}

const NotePreview = ({ png, dark = false }: NotePreviewProps) => {
  const theme = dark ? 'dark' : 'light';
  return (
    <>
      <div className='note-preview' style={{color: `var(--${theme}-fg)`}}>
        <article className='note-main' style={{backgroundColor: `var(--${theme}-bg)`}}>
          <div className='icon'>
            <img height='50' width='50' src={icon} />
          </div>
          <div className='note-right'>
            <div className='header'>
              <span className='note-name'>
                えぐみ<img className='note-emoji-img' src={png} />
              </span>
              @username
              <div>
                <img className='note-role' src={png} />
              </div>
              <div className='note-time'>1秒前</div>
            </div>
            <div className='note-text'>
              今日はわたくしの会話デッキを<img className='note-emoji-inline' src={png} />、披露して差し上げましょう。<br />
              いい天気ですね。
            </div>
            <div className='note-reactions'>
              <div className='note-reaction-button' style={{backgroundColor: `var(--${theme}-reaction-bg)`}}>
                <img className='note-emoji-img' src={png} />
                <span className='note-reaction-count'>1</span>
              </div>
              <div className='note-reaction-button' style={{color: `var(--${theme}-accent)`, boxShadow: `0 0 0 1px var(--${theme}-accent) inset`, backgroundColor: `var(--${theme}-reaction-bg-pressed)`}}>
                <img className='note-emoji-img' src={png} />
                <span className='note-reaction-count'>1</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export default NotePreview;
