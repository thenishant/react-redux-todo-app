import React from 'react';
import TodoCard from './TodoCard';
import { Droppable } from 'react-beautiful-dnd';

const TodoInProcessList = ({ inProcessTodos }) => {
    return (
        <Droppable droppableId="INPROCESS">
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="flex-1">
                    <div className="bg-[#e5e0b4] mx-4 rounded-lg fixed-height h-22">
                        <h2 className="text-center font-bold text-[#827717] m-2">In-Process</h2>
                        {inProcessTodos.length === 0 && (
                            <h2 className="text-center font-bold text-gray-400">List is blank</h2>
                        )}
                        {inProcessTodos.length !== 0 && (
                            <div className="hide-scrollbar" style={{ height: '300px', overflow: 'auto' }}>
                                {inProcessTodos.map((inProcessTodo, index) => {
                                    return <TodoCard todo={inProcessTodo} key={inProcessTodo.id} index={index} />;
                                })}
                            </div>
                        )}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default TodoInProcessList;
