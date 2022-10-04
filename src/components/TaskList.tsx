import { ChangeEvent, InvalidEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const isEmptyTask=newTaskTitle.length==0;
  //const isEmptyTask=false

  function handleInputChange(e:ChangeEvent<HTMLInputElement>){    
    if(newTaskTitle.trim().length==0){
      e.target.setCustomValidity('Este campo não pode estar vazio !');
    }else{
      e.target.setCustomValidity('');
    }
    setNewTaskTitle(e.target.value);
    
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(newTaskTitle!=''  && newTaskTitle.trim().length>0 ){     
      // Returns a random integer from 0 to 100:
      const newTaskId= Math.floor(Math.random() * 101);
      //const newTaskId=uuidv4();
      const newTask={
        id:newTaskId,
        title:newTaskTitle,
        isComplete:false
      }
      setTasks([...tasks,newTask]);
      setNewTaskTitle('')
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const editedTaskList=tasks.map(task=>{
      if(task.id==id){
        task.isComplete=!task.isComplete;
      }
      return task
    })
    setTasks(editedTaskList)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const newTaskList=tasks.filter(task=>task.id!=id);
    setTasks(newTaskList);
  }

  function handleInvalidInput(e:InvalidEvent<HTMLInputElement>){
    e.target.setCustomValidity('Este campo não pode estar vazio !');
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tarefas</h2>

        <form className="input-group">
          <input 
            type="text" 
            //placeholder="Adicionar nova tarefa" 
            placeholder='Adicionar novo todo'
            //onChange={(e) => setNewTaskTitle(e.target.value)}
            onChange={handleInputChange}
            value={newTaskTitle}
            required
            onInvalid={handleInvalidInput}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}
          disabled={isEmptyTask}>
            <FiCheckSquare size={16} color="#fff"/>
            
          </button>
        </form>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}