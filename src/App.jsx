import TodoList from './components/TodoList';
import Weather from './components/Weather';
import CurrencyRates from './components/CurrencyRates';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="todo-container">
        <TodoList />
      </div>
      <div>
        <div className="weather-container">
          <Weather />
        </div>
        <div className="currency-container">
          <CurrencyRates />
        </div>
      </div>
    </div>
  );
}

export default App;
