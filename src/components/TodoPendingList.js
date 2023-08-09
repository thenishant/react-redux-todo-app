import React from 'react';
import TodoCard from './TodoCard';
import { Droppable } from 'react-beautiful-dnd';

const TodoPendingList = ({ pendingTodos }) => {
    return (
        <Droppable droppableId="PENDING">
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="flex-1">
                    <div className="bg-[#d6b5b9] mx-4 rounded-lg fixed-height h-22 shadow-lg">
                        <h2 className="text-center font-bold text-[#B71C1C] m-2" id={'pending-cards-title'}>Pending</h2>

                        {pendingTodos.length !== 0 && (
                            <div className="hide-scrollbar" style={{ height: '300px', overflow: 'auto' }}>
                                {pendingTodos.map((pendingTodo, index) => {
                                    return <TodoCard todo={pendingTodo} key={pendingTodo.id} index={index} />;
                                })}
                            </div>
                        )}
                        {pendingTodos.length === 0 && (
                            <h2 className="text-center font-bold text-gray-400">List is blank</h2>
                        )}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default TodoPendingList;
