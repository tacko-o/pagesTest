import React, { ReactNode, useState } from 'react';
import '../css/App.css';

type Title = {
  icon?: string, 
  text: string,
}

/** FontButtonプロパティ */
type TabProps = {
  titles: Title[], 
  children: ReactNode[],
};

const TabComponent = ({ titles, children }: TabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="tabs">
        {titles.map((title, i) => {
          return (
            <button
              className={`tab ${activeTab === i ? "active-tab" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {title.text}
            </button>
          )
        })}
      </div>
      <div className='tab-content'>
      {children.map((child, i) => {
        return (
          activeTab === i && child
        )
      })
      }
      </div>
    </>
  );
}

export default TabComponent;
