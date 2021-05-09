import React, { useState, useEffect } from 'react';

function App() {
  useEffect(async () => {
    console.log(process.env.REACT_APP_API_URL);
    // Works if we get a proper response in JSON.
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/609539bc37b79025a254edae/`);
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      console.log(data);
    } catch {
      // If we get an error
      console.log(text);
    }
  }, []);

  return (
    <div className="App" />
  );
}

export default App;
