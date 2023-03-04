import React from "react";
import "./style.css";

export function TodoPost({todo,eliminarPost}){
    const {id,task,task2,giro} = todo;
    const eliminar=()=>{
        eliminarPost(id);
    }

    return(
        <div class={giro}>
            <i onClick={eliminar}>X</i>
            <h5>{task}</h5>
            <p>{task2}</p>
        </div>    
        );
}