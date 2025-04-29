import '../css/Note.css';
import icon from '../resources/identicon.png'

/** FontButtonプロパティ */
type NotePreviewProps = {
  png: string,
  dark?: boolean,
}

const NotePreview = ({ png, dark = false }: NotePreviewProps) => {
  const theme = dark ? 'dark' : 'light';
  return (
    <>
      <div className='note-preview' style={{ color: `var(--${theme}-fg)` }}>
        <article className='note-main' style={{ backgroundColor: `var(--${theme}-bg)` }}>
          <img alt="icon" className='icon' height='50' width='50' src={icon} />
          <div className='note-right'>
            <div className='note-header'>
              <span className='note-name'>
                えぐみ<img alt="name emoji" className='note-emoji-img' src={png} />
              </span>
              @username
              <div>
                <img alt="role emoji" className='note-role' src={png} />
              </div>
              <div className='note-time'>1秒前</div>
            </div>
            <div className='note-text'>
              今日はわたくしの会話デッキを<img alt="inline emoji" className='note-emoji-inline' src={png} />、披露して差し上げましょう。<br />
              いい天気ですね。
            </div>
            <div className='note-reactions'>
              <div className='note-reaction-button' style={{ backgroundColor: `var(--${theme}-reaction-bg)` }}>
                <img alt="reaction emoji" className='note-emoji-img' src={png} />
                <span className='note-reaction-count'>1</span>
              </div>
              <div className='note-reaction-button' style={{ color: `var(--${theme}-accent)`, boxShadow: `0 0 0 1px var(--${theme}-accent) inset`, backgroundColor: `var(--${theme}-reaction-bg-pressed)` }}>
                <img alt="pressed reaction emoji" className='note-emoji-img' src={png} />
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
