import React from 'react';

const Suggestions = ({ suggestions, onSuggestionClick, isLoading }) => {
  return (
    <ul className='bg-white mt-1 rounded-lg p-2 max-h-96 overflow-y-auto text-sm'>
      {isLoading ? (
        <li>Loading...</li>
      ) : (
        suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => onSuggestionClick(suggestion)} className='hover:bg-gray-300 cursor-pointer py-1 px-2 rounded-sm'>
            <p>
              {suggestion.split('/').map((part, i) => (
                <span key={i}>
                  {i > 0 && ' / '} {i === 1 ? <b>{part}</b> : <span className='text-gray-500'>{part}</span>}
                </span>
              ))}
            </p>
          </li>
        ))
      )}
    </ul>
  );
};

export default Suggestions;
