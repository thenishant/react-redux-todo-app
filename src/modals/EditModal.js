import React, { useState } from 'react';
import ReactDom from 'react-dom';
import GppBadIcon from '@mui/icons-material/GppBad';

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 100,
};

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    zIndex: 1000,
};

const EditModal = ({ todo, onCloseModal, onCloseModalPostUpdating }) => {
    const [todoDetail, setTodoDetail] = useState({
        title: '',
        description: '',
    });

    const onUpdateClickHandler = () => {
        let todoDetailWithId = { todoId: todo.id, ...todoDetail };
        onCloseModalPostUpdating(todoDetailWithId);
    };

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLES} className="flex flex-col rounded-xl p-3 w-1/4">
                {/* <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-1000"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-1000"> */}
                <div className=" flex text-center font-bold mb-6">
                    <h2 className="flex-1 bg-purple-300 rounded-xl p-1">Update Todo</h2>
                    <GppBadIcon className="ml-2" onClick={onCloseModal} />
                </div>
                <div className="flex flex-col m-2">
                    <label className="font-bold text-purple-800">Title</label>
                    <input
                        className="p-1 pl-2 border border-purple-400 rounded-xl"
                        type="text"
                        placeholder={todo.title}
                        value={todoDetail.title}
                        onChange={(e) => {
                            setTodoDetail((prevDetail) => {
                                return { ...prevDetail, title: e.target.value };
                            });
                        }}
                    />
                    {/* This below code can be used to throw error when input field is blank */}
                    {/* <p className={`text-red-600 ${todoDetail.title ? 'invisible' : ''}`}>Field can't be empty</p> */}
                </div>
                <div className="flex flex-col m-2">
                    <label className="font-bold text-purple-800">Description</label>
                    <input
                        className="p-1 pl-2 border border-purple-400 rounded-xl"
                        type="text"
                        placeholder={todo.desc}
                        value={todoDetail.description}
                        onChange={(e) => {
                            setTodoDetail((prevDetail) => {
                                return { ...prevDetail, description: e.target.value };
                            });
                        }}
                    />
                </div>
                <div className="flex justify-end mt-5">
                    <button onClick={onUpdateClickHandler} className="bg-purple-200 rounded-lg p-2 font-bold">
                        Update
                    </button>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
};

export default EditModal;
