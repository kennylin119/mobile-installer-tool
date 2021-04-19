import React,{useContext} from 'react'
import {LanguageContext} from './LanguageContext'

export function DiffComponent(){
    const {value,setValue} = useContext(LanguageContext);
    return (
    <div className="diffcomponent">
        <div>Component 2</div>
        <button onClick={()=>setValue("Component 2 is cooler")}>Change Value</button>
        <button onClick={()=>setValue("Component 1 sucks")}>Change value again</button>
    </div>
    )
}