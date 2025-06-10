import TodoList from './components/TodoList';
import Weather from './components/Weather';
import CurrencyRates from './components/CurrencyRates';
import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Мой Dashboard</h1>
      <Weather />
      <CurrencyRates />
      <TodoList />
    </div>
  );
}

export default App;
