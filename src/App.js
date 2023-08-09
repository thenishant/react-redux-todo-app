import './App.css';
import TodoContainer from './pages/TodoContainer';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <div className="flex justify-center h-screen bg-gradient-to-br from-purple-300 to-black">
                <TodoContainer />
            </div>
        </Provider>
    );
}

export default App;