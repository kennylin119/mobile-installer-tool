import React, {useState} from 'react'
import {LanguageContext} from './LanguageContext'
import { Component } from './Component';
import { DiffComponent } from './DifferentComponent';

function App() {

  //const state = useContext(LanguageContext)
  const [value,setValue] = useState("hi from context")

  return (
    <LanguageContext.Provider value={{value,setValue}}>
      <Component></Component>
      <DiffComponent></DiffComponent>
    </LanguageContext.Provider>
  );
}

export default App;
