import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuid } from 'uuid'; //nos genera id
import { TodoPost } from "./TodoPost";

const KEY = 'todolist-todos';

export function TodoNote() {
   //LÓGICA
   //todos: nombre de  la constante a usar
   //setTodos: nombre del metodo que usará la constante
   //useState: método a usar desde el sistema
   const [todos, setTodos] = useState([]);

   //Funciones para declarar si el checkbox está activo o no, otra para cambiarle el estado
   const [isChecked, setIsChecked] = useState(false);
   const handleOnChange = () => {
      setIsChecked(!isChecked);
   };

   //Referencia de los inputs
   const taskref = useRef();
   const taskref2 = useRef();

   useEffect(() => {
      const storedTodos = JSON.parse(localStorage.getItem(KEY));
      if (storedTodos) {
         setTodos(storedTodos);
      }
      //[]: Ejecutar solamente cuando entro al sistema  
   }, [])

   useEffect(() => {
      localStorage.setItem(KEY, JSON.stringify(todos));
      //[todos]: Ejecutar solamente cuando se actualiza la lista de tareas 
   }, [todos])

   //metodo para agregar una nueva nota
   const agregarPost = () => {
      var task = taskref.current.value;
      const task2 = taskref2.current.value;

      if (task2 === '') {
         return;
      }
      if (task === '') {
         task = 'Sin título';
      } 

      setTodos((prevTodos) => {
         const newTask = {
            id: uuid(),
            task: task,
            task2: task2,
            giro: generarGiro()
         }
         //3 puntos: Destructuración, o bien tomar el arreglo y agrgar un nuevo elemento (.append)
         return [...prevTodos, newTask];
      })

      //Vuelvo a vaciar los inputs
      taskref.current.value = null;
      taskref2.current.value = null;
   }

   const eliminarPost = (id) => {
      const newPosts = todos.filter((todo) => todo.id !== id);
      setTodos(newPosts);
   }

   const generarGiro = () => {
      var importante=esImportante()
      var giro = Math.floor(Math.random() * 10)
      var post = 'izquierdaNoImportante'
      
      if(importante==='Importante'){
         post= 'izquierdaImportante'
         if (giro % 2 === 0) {
            post = 'derechaImportante'
         }   
      }else{
         if (giro % 2 === 0) {
            post = 'derechaNoImportante'
         }
      }
      return post;
   }

   const esImportante =()=>{
      return (isChecked ? "Importante" : "NoImportante")
   }

   //VISTA    
   return (
      <Fragment>
         <h1 class="titulo">Post it Simulator!</h1>
         <div class="pizarra">
            <input ref={taskref} className="form-control" type="text" placeholder="Ingresar título"></input>
            <input ref={taskref2} className="form-control" type="text" placeholder="Ingrese una descripción"></input>

            <div class="checkbox-importante">
               <input
                  type="checkbox"
                  name="importante"
                  id="importante"
                  checked={isChecked}
                  onChange={handleOnChange}
               />
               <label for="importante">Importante</label>
            </div>

            <button onClick={agregarPost} className="btn btn-light ms-2">AGREGAR</button> {/*ms= margin start para que no esté pegado al input  */}
         </div>

         <div class="row">

            {todos.map((todo) => (
               <TodoPost todo={todo} key={todo.id} eliminarPost={eliminarPost}></TodoPost>
            ))}

         </div>
      </Fragment>
   )
}