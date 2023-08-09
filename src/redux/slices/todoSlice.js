import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    todos: [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos = [...state.todos, action.payload];
        },
        updateTodo: (state, action) => {
            state.todos = state.todos.map((todo) => {
                if (todo.id === action.payload.todoId) {
                    todo.title = action.payload.title || todo.title;
                    todo.desc = action.payload.description || todo.desc;
                }
                return todo;
            });
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        dragTodoToInProcess: (state, action) => {
            const {source, destination} = action.payload;
            const myTodoList = state.todos;

            let pendingTodos = [];
            let inProcessTodos = [];
            let completedTodos = [];
            let tempRemovedTodo = null

            myTodoList.map((todo) => {
                if (todo.status === 'PENDING') {
                    return pendingTodos.push(todo);
                } else if (todo.status === 'INPROCESS') {
                    return inProcessTodos.push(todo);
                } else {
                    return completedTodos.push(todo);
                }
            });

            if (source.droppableId === destination.droppableId) {
                if (source.droppableId === "PENDING") {
                    tempRemovedTodo = pendingTodos.splice(source.index, 1)[0]
                    pendingTodos.splice(destination.index, 0, tempRemovedTodo)
                } else if (source.droppableId === "INPROCESS") {
                    tempRemovedTodo = inProcessTodos.splice(source.index, 1)[0]
                    pendingTodos.splice(destination.index, 0, tempRemovedTodo)
                } else if (source.droppableId === "COMPLETED") {
                    tempRemovedTodo = completedTodos.splice(source.index, 1)[0]
                    pendingTodos.splice(destination.index, 0, tempRemovedTodo)
                }
            } else if (source.droppableId !== destination.droppableId) {
                if (source.droppableId === "PENDING" && destination.droppableId === "INPROCESS") {
                    tempRemovedTodo = pendingTodos.splice(source.index, 1)[0]
                    inProcessTodos.splice(destination.index, 0, {...tempRemovedTodo, status: "INPROCESS"})
                } else if (source.droppableId === "INPROCESS" && destination.droppableId === "COMPLETED") {
                    tempRemovedTodo = inProcessTodos.splice(source.index, 1)[0]
                    completedTodos.splice(destination.index, 0, {...tempRemovedTodo, status: "COMPLETED"})
                }
            }

            state.todos = [...pendingTodos, ...inProcessTodos, ...completedTodos]
        },
    },
});

export const {addTodo, deleteTodo, updateTodo, dragTodoToInProcess} = todoSlice.actions;
export default todoSlice.reducer;
export const selectTodos = (state) => state.todo.todos;
