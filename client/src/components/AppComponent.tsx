import React from 'react';
import Button from './Button';

function MyApp() {
  function handleClick() {
    console.log('Button clicked!');
  }

  return (
    <div>
      <h1>My App</h1>
      <Button label="Click me" onClick={handleClick} />
    </div>
  );
}

export default MyApp;
