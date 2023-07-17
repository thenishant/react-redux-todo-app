import React from 'react';
import TodoCard from './TodoCard';
import { Droppable } from 'react-beautiful-dnd';

const TodoCompletedList = ({ completedTodos }) => {
    return (
        <Droppable droppableId="COMPLETED">
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="flex-1">
                    <div className=" bg-[#cfecaf] mx-4 rounded-lg fixed-height h-22">
                        <h2 className="text-center font-bold text-[#33691E] m-2">Completed</h2>
                        {completedTodos.length === 0 && (
                            <h2 className="text-center font-bold text-gray-400">List is blank</h2>
                        )}
                        {completedTodos.length !== 0 && (
                            <div
                                className="hide-scrollbar"
                                style={{ height: '300px', overflow: 'auto' }}
                            >
                                {completedTodos.map((completedTodo, index) => {
                                    return <TodoCard todo={completedTodo} key={completedTodo.id} index={index} />;
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

export default TodoCompletedList;
