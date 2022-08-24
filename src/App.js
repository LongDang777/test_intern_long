import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import './App.css';
import { HomeTemplate } from './HomeTemplate';
import ToDoList from './todoList/ToDoList';
import WinRate from './win_rate/WinRate';


export const history = createBrowserHistory()


function App() {
  return (
    <Router history={history}>
      <HomeTemplate path='/' component={ToDoList} />
      <HomeTemplate path='/winrate' component={WinRate} />
    </Router>
  );
}

export default App;
