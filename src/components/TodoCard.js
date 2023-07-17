import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditModal from '../modals/EditModal';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../redux/slices/todoSlice';
import { Draggable } from 'react-beautiful-dnd';

const TodoCard = ({ todo, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [modalToggle, setModalToggle] = useState(false);
    const dispatch = useDispatch();

    let background_color = null;

    if (todo.status === 'PENDING') {
        background_color = isHovered ? '#E57373' : '#EF9A9A';
    } else if (todo.status === 'INPROCESS') {
        background_color = isHovered ? '#FFE082' : '#FFF59D';
    } else {
        background_color = isHovered ? '#7CB342' : '#AED581';
    }

    const onMouseEnterHandler = () => {
        setIsHovered(true);
    };

    const onMouseLeaveHandler = () => {
        setIsHovered(false);
    };

    const onDeleteClickHandler = () => {
        dispatch(deleteTodo(todo.id));
    };

    const onCloseModalHandler = () => {
        setModalToggle(false);
    };

    const onCloseModalPostUpdatingHandler = (updatedTodo) => {
        setModalToggle(false);
        dispatch(updateTodo(updatedTodo));
    };

    return (
        <>
            <Draggable draggableId={todo.id.toString()} index={index}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div
                            className="bg-[#D7CCC8] border border-purple-800 m-4 rounded-lg p-3 transition-transform duration-300 hover:-translate-y-2"
                            style={{ backgroundColor: background_color }}
                            onMouseEnter={onMouseEnterHandler}
                            onMouseLeave={onMouseLeaveHandler}
                        >
                            <div className="flex">
                                <div className="flex-1">
                                    <h2 className="text-sm font-bold">{todo.title}</h2>
                                    <h5 className="text-xs font-bold opacity-40">{todo.desc}</h5>
                                </div>
                                {todo.status === 'PENDING' && (
                                    <EditIcon
                                        className="hover:text-[#90CAF9] hover:cursor-pointer"
                                        onClick={() => {
                                            setModalToggle(true);
                                        }}
                                    />
                                )}
                                {(todo.status === 'PENDING' || todo.status === 'INPROCESS') && (
                                    <DeleteOutlineIcon
                                        className="hover:text-[#90CAF9] hover:cursor-pointer"
                                        onClick={onDeleteClickHandler}
                                    />
                                )}
                            </div>
                            <div className="flex justify-end text-xs mt-2">
                                <h6>{todo.creationDate}</h6>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
            {modalToggle && (
                <EditModal
                    onCloseModal={onCloseModalHandler}
                    onCloseModalPostUpdating={onCloseModalPostUpdatingHandler}
                    todo={todo}
                />
            )}
        </>
    );
};

export default TodoCard;
