import logo from './logo.svg';
import './App.css';
import Searchbar from './component/Searcbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditOutlined from './component/EditOutlined';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" exact Component={Searchbar}/>
      <Route path="/books/:id" exact Component={EditOutlined}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
