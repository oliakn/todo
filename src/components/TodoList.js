import React, {useState, useEffect} from 'react'
import TodoItem from "./TodoItem"
import axios from 'axios'


const TodoList = () => {
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState('')
    const [isDone, setIsDone] = useState(false)
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        axios('https://6107895ad73c6400170d34dc.mockapi.io/todos')
            .then(({data}) => setTasks(data))
    }, [])

    const addTodo = () => {
        if (task.trim().length >= 3) {
            const todo = {
                title: task,
                isDone: false,
                id: +new Date()
            }
            axios.post('https://6107895ad73c6400170d34dc.mockapi.io/todos/', todo)
                .then(({data}) => setTasks([...tasks, data]))
            setTask('')
            setShowError(false)
        } else {
            setShowError(true)
        }
    }

    const deleteTodo = (id) => {
        axios.delete(`https://6107895ad73c6400170d34dc.mockapi.io/todos/${id}`)
            .then(({data}) => setTasks(tasks.filter(el => el.id !== data.id)))
    }


    const editTodo = (id, newName) => {
        axios.put(`https://6107895ad73c6400170d34dc.mockapi.io/todos/${id}`, {title: newName})
            .then(({data}) => setTasks(tasks.map(el => el.id === data.id ? {...el, title: newName} : el)))
    }

    const doneTodo = (id) => {
        setIsDone(!isDone)
        axios.put(`https://6107895ad73c6400170d34dc.mockapi.io/todos/${id}`, {isDone: isDone})
            .then(({data}) => setTasks(tasks.map(el => el.id === data.id ? {...el, isDone: isDone} : el)))
    }

    return (
        <div>
            <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                    <div className="mb-4">
                        <h1 className="text-grey-darkest">Todo List</h1>
                        <div className="mt-4">
                            <p className="error">{showError && 'Todo should be at least 3 characters long'}</p>
                           <div className="flex">
                               <input
                                   value={task}
                                   onChange={(e) => setTask(e.target.value)}
                                   className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                                   placeholder="Add Todo"/>
                               <button
                                   onClick={addTodo}
                                   className="flex-no-shrink p-2 border-2 rounded text-indigo-600 border-teal hover:text-white hover:bg-indigo-600">Add
                               </button>
                           </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        {tasks.map((el) => (
                            <TodoItem
                                el={el}
                                editTodo={editTodo}
                                deleteTodo={deleteTodo}
                                doneTodo={doneTodo}
                                key={el.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoList;