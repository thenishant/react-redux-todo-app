import React, {useState, useRef} from 'react';

const TodoFormTemplate = ({fetchEnteredInfo, placeHolder, buttonText}) => {
    const [todoInput, setTodoInput] = useState('');
    const inputRef = useRef(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const [isInputClicked, setIsInputClicked] = useState(false)

    const onChangeHandler = (e) => {
        if (e.target.value) {
            setTodoInput(e.target.value);
            setIsEmpty(false);
            setIsInputClicked(false);
        } else {
            setTodoInput('');
            setIsEmpty(true);
            setIsInputClicked(true);
        }
    };

    const onClickButtonHandler = () => {
        fetchEnteredInfo(todoInput);
        setIsEmpty(true);
    };

    const handleInputClick = () => {
        isEmpty && setIsInputClicked(true);
    };

    return (
        <div>
            <div className="flex justify-between">
                <input
                    className="flex-1 px-4 rounded-lg"
                    data-name={'textBox'}
                    id={'text-box-id-test-id-nishant-test'}
                    type="text"
                    placeholder={placeHolder}
                    value={todoInput}
                    onChange={onChangeHandler}
                    ref={inputRef}
                    style={{
                        outlineColor: isEmpty ? '#E53935' : '#9FA8DA',
                        outlineWidth: '3px',
                        outlineStyle: 'solid',
                    }}
                    onClick={handleInputClick}
                />
                <button
                    // className="bg-gray-400 p-2 font-bold mx-2 hover:bg-purple-400 rounded-lg"
                    className={`${
                        isEmpty ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-400 hover:bg-[#AB47BC]'
                    } p-2 font-bold mx-2 rounded-lg`}
                    id={'add-button-id-test-id-test2'}
                    data-name={'submitButton'}
                    type="submit"
                    onClick={onClickButtonHandler}
                    disabled={isEmpty}
                >
                    {buttonText}
                </button>
            </div>
            <p className={`mx-2 text-red-600 ${isInputClicked ? '' : 'invisible'}`} id={'error-on-input'}>field can not
                be empty</p>
        </div>
    );
};

export default TodoFormTemplate;
