import TodoList from './components/TodoList';
import AirQualityWidget from './components/AirQualityWidget';
import RandomWord from './components/RandomWord';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="todo-container">
        <TodoList />
      </div>
      <div>
        <div className="weather-container">
          <AirQualityWidget />
        </div>
        <div className="currency-container">
          <RandomWord />
        </div>
      </div>
    </div>
  );
}

export default App;
