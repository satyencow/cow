import React from 'react';
import CowApp from './App/Index';
function App() {
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault(); // Disable right-click
  });
  return (
    <div className="App">
      <CowApp/>
    </div>
  );
}

export default App;
