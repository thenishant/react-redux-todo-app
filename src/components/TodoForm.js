import React, {useEffect, useState} from 'react';
import TodoFormTemplate from '../common/TodoFormTemplate';
import {useDispatch} from 'react-redux';
import {addTodo} from '../redux/slices/todoSlice';

const TodoForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [addDescToggle, setAddDescToggle] = useState(false);
    const dispatch = useDispatch();

    const fetchEnteredInfo = (info) => {
        addDescToggle
            ? setDescription(() => {
                return info;
            })
            : setTitle(() => {
                return info;
            });

        setAddDescToggle((prevState) => !prevState);
    };

    useEffect(() => {
        if (title && description) {
            let newTodo = {
                id: Math.floor(Math.random() * 10000) + 1,
                title,
                desc: description,
                status: 'PENDING',
                creationDate: new Date().toLocaleDateString(),
            };
            dispatch(addTodo(newTodo));
        }
    }, [title, description, dispatch]); // Add 'dispatch' to the dependency array

    useEffect(() => {
        setTimeout(() => {
            if (!addDescToggle) {
                setTitle('');
                setDescription('');
            }
        }, 2000);
    }, [addDescToggle]);

    return (
        <div>
            <div
                className={`flex-1 p-3 text-center border border-green-400 bg-[#8BC34A] rounded-lg font-bold ${
                    title && description ? '' : 'invisible'
                }`}
            >
                Added Todo
            </div>
            <h2 className="my-3 text-gray-300 text-2xl font-bold text-center" data-name={'pageTitle'}
                id={'page-title-test-id'}>Todo App</h2>
            <div>
                {!addDescToggle && (
                    <TodoFormTemplate
                        fetchEnteredInfo={fetchEnteredInfo}
                        placeHolder="Add Todo Title"
                        buttonText="Add Title"
                    />
                )}
                {addDescToggle && (
                    <TodoFormTemplate
                        fetchEnteredInfo={fetchEnteredInfo}
                        placeHolder="Add Todo Description"
                        buttonText="Add Description"
                    />
                )}
            </div>
        </div>
    );
};

export default TodoForm;
