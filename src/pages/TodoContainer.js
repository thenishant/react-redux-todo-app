import React from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

const TodoContainer = () => {
    return (
        <div className="p-10 mt-10 rounded w-2/3 bg-gradient-to-br from-black to-purple-200 border border-red-800 ">
            <TodoForm />
            <TodoList />
        </div>
    );
};

export default TodoContainer;
