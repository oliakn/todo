import React, {useState} from 'react';

const TodoItem = ({el, editTodo, deleteTodo, doneTodo}) => {
    const [newName, setNewName] = useState('')
    const [isEdited, setIsEdited] = useState(false)
    const [showEditError, setShowEditError] = useState(false)

    const handleSave = (id) => {
        if (newName.trim().length >= 3) {
            editTodo(id,newName)
            setIsEdited(false)
            setShowEditError(false)
        } else {
            setShowEditError(true)
        }
    }
    console.log(newName)
    return (
        <div className="flex mb-4 items-center">
            {
                isEdited ?
                    <input
                        defaultValue={el.title}
                        onChange={(e) => setNewName(e.target.value)}
                        // onChange срабатывает при изменении значения инпута
                        // event - это объект
                        // target - тот элемент, на который ты нажала
                        // setNewName - записываем в newName то что мы вписали в инпут
                        type="text"
                        className={showEditError ? 'border-red-500 border-2': 'border-2'}
                    />
                    :
                    <p
                        onClick={() => doneTodo(el.id)}
                        className={`w-full text-gray-900 ${el.isDone ? 'line-through text-green-500' : 'text-gray-900'}`}>{el.title}</p>
            }
            {
                isEdited ?
                    <button
                        onClick={() => handleSave(el.id)}
                        className="w-2/6 p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-500 border-gray-300 hover:bg-gray-500">Save</button>
                    :
                    <button
                        onClick={() => setIsEdited(true)}
                        className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-300 hover:bg-green-500">Edit</button>
            }
            <button
                onClick={() => deleteTodo(el.id)}
                className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-300 hover:text-white hover:bg-red-500">Remove</button>
        </div>
    );
};

export default TodoItem;