import React,{useContext} from 'react'
import {LanguageContext} from './LanguageContext'

export function Component(){
    const {value,setValue} = useContext(LanguageContext);
    return (
    <div className="component">
        <div>Component</div>
        <h2>{value}</h2>
        <button onClick={()=>setValue("Component 1 is da best")}>Change Value</button>
        <button onClick={()=>setValue("Component 2 can't tie his shoes")}>Change value again</button>
    </div>
    )
}