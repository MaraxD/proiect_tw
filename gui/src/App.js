import { Routes, Route,Navigate } from 'react-router-dom';
import './App.css';
import MainPage from './mainPage/MainPage';
import UserPage from './userPage/UserPage';
import LoginPage from './loginPage/LoginPage';

const App=()=> {
  return (
    <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage/>}></Route>
            <Route path='/userPage' element={<UserPage/>}></Route>
            <Route path='/mainPage/:value' element={<MainPage/>}></Route>
          </Routes>
    </div>
  );
}

export default App;
