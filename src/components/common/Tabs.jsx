import React, { useState } from 'react';
import { Search, UploadCloud } from 'react-feather';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className="w-full">
      <div className="items-center flex mb-4">
        {children.map((child) => (
          <>
            <button
              key={child.props.label}
              className={`${activeTab === child.props.label ? 'bg-white shadow-3xl text-black' : 'text-gray-400 bg-[#22262b] opacity-70'}
                flex-1 w-[50px] mx-3 py-2 rounded-full`}
              onClick={(e) => handleClick(e, child.props.label)}
            >
              <div className='flex items-center justify-center px-4 py-1 gap-x-3'>
                {child.props.label === 'Search' ? <Search className='' /> : <UploadCloud />}
                <span className='font-semibold text-sm'>{child.props.label}</span>
              </div>
            </button>
          </>
        ))}
      </div>
      <div className="py-4">
        {children.map((child) => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab = ({ label, children }) => {
  return (
    <div label={label} className="hidden">
      {children}
    </div>
  );
};
export { Tabs, Tab };
