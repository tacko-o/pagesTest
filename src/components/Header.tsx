import { useState } from "react";
import "../css/App.css";
import "../css/Header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const toggleFunction = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <header className='header'>
        <span style={{ fontWeight: 'bold' }}>EGMi</span>
        <span style={{ fontSize: '0.5em', marginLeft: '1em' }}>- Emoji Generator for Misskey -</span>
        <button
          type="button"
          aria-controls={"navigation"}
          aria-expanded={open}
          onClick={toggleFunction}
          className="humburger"
        >
          <span className="line-1"></span>
          <span className="line-2"></span>
          <span className="line-3"></span>
        </button>
        <nav id={"navigation"} aria-hidden={!open} className="navigation">
          <button className="navButton" onClick={() => { }}>About</button>
          <button className="navButton" onClick={() => { }}>GitHub</button>
          <button className="navButton" onClick={() => { }}>フォントライセンス</button>
        </nav>
      </header>
    </>
  );
};
export default Header;