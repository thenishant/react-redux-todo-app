import React from 'react';
import TodoPendingList from './TodoPendingList';
import TodoInProcessList from './TodoInProcessList';
import TodoCompletedList from './TodoCompletedList';
import { selectTodos, dragTodoToInProcess } from '../redux/slices/todoSlice';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

const TodoList = () => {
    const pendingTodos = [];
    const inProcessTodos = [];
    const completedTodos = [];

    const todoList = useSelector(selectTodos);
    const dispatch = useDispatch();

    todoList.map((todo) => {
        if (todo.status === 'PENDING') {
            return pendingTodos.push(todo);
        } else if (todo.status === 'INPROCESS') {
            return inProcessTodos.push(todo);
        } else {
            return completedTodos.push(todo);
        }
    });

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.inProcessTodos) return;
        dispatch(
            dragTodoToInProcess(result)
        );
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="my-20">
                <h1 className="font-bold text-gray-200 m-4 text-2xl" data-name={'todoListHeader'} id={'list-of-todos-test-id-1'}>Your Todos</h1>
                <div className="flex">
                    <TodoPendingList pendingTodos={pendingTodos} />
                    <TodoInProcessList inProcessTodos={inProcessTodos} />
                    <TodoCompletedList completedTodos={completedTodos} />
                </div>
            </div>
        </DragDropContext>
    );
};

export default TodoList;
