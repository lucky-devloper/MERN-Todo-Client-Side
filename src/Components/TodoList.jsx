import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { MdSaveAs } from "react-icons/md";
import axios from "axios";

const API_URL = "https://mern-todo-app-server-1eew.onrender.com/api/todos";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [isupdated, setisupdated] = useState('')
    const [Updateddata, setUpdateddata] = useState('')

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get(API_URL);
        setTodos(response.data);
    };

    const addTodo = async () => {
        if (newTodo.trim() === "") return;
        const response = await axios.post(API_URL, { title: newTodo });
        setTodos([...todos, response.data]);
        setNewTodo("");
    };

    const updateTodo = async (id, updatedData) => {
        // console.log(id, updatedData);
        const response = await axios.put(`${API_URL}/${id}`, { title: updatedData });
        setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
        window.location.reload()
    };
    const taskcompleted = async (id, completed) => {
        const response = await axios.put(`${API_URL}/${id}`, { completed: !completed })
        setTodos(todos.map(todo => (todo._id === id ? response.data : todo)))
    }

    const deleteTodo = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };


    return (
        <div className="lg:w-[350px] lg:h-[600px] w-[100%] h-[100%] flex flex-col items-center rounded-md bg-white overflow-hidden">
            <h1 className="w-[100%] h-[50px] bg-yellow-300 text-xl font-semibold text-center p-3">Todo List</h1>
            <div className="w-[100%] h-[100%] p-2">
                <div className="w-[100%] h-[50px] flex justify-between items-center gap-2">
                    <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Add a new todo" className="w-[80%] h-[100%] px-3 outline-none bg-[#f2f2f2] rounded-md" />
                    <button onClick={addTodo} className="w-[20%] h-[100%] rounded-md bg-green-400 font-semibold text-white">Add</button>
                </div>
                <ul className="bg-[#f2f2f2] w-[100%] min-h-[85%]  lg:h-[450px] mt-2 rounded-md overflow-auto p-2">
                    {todos && todos.length > 0 ? (
                        todos.map((todo) => {
                            // console.log(todo.);
                            return <li key={todo._id} className="h-[40px] w-[100%] px-2 rounded-md font-semibold bg-white mb-2">
                                {isupdated === todo._id ? (
                                    <div className="w-[100%] h-[100%] flex justify-between items-center">
                                        <input type="text" value={Updateddata} onChange={(e) => setUpdateddata(e.target.value)} />
                                        <button onClick={() => updateTodo(todo._id, Updateddata)}><MdSaveAs fontSize='25px' /></button>
                                    </div>
                                ) : (
                                    <div className="w-[100%] h-[100%] flex justify-between items-center">
                                        <span style={{ textDecoration: todo.completed ? "line-through" : "", color: todo.completed ? "gray" : "",}}>
                                            <input type="checkbox" checked={todo.completed} onChange={(e) => taskcompleted(todo._id, todo.completed)} className="mr-2" />
                                            {todo.title}
                                        </span>
                                        <div className="flex items-center gap-5">
                                            <button onClick={() => deleteTodo(todo._id)}><MdDelete fontSize='25px' /></button>
                                            <button onClick={() => { setisupdated(todo._id), setUpdateddata(todo.title) }}><AiFillEdit fontSize='25px' /></button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        })
                    ) : (
                        <p className="text-center mt-10 text-gray-500">No item avaliable</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
