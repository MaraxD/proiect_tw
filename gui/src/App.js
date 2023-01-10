import { Routes, Route,Navigate } from 'react-router-dom';
import './App.css';
import MainPage from './mainPage/MainPage';
import UserPage from './userPage/UserPage';
import LoginPage from './loginPage/LoginPage';
import RegisterPage from './registerPage/RegisterPage';

const App=()=> {
  return (
    <div className="App">
          {/* <UserPage/> */}
          <Routes>
            <Route path="/" element={<MainPage/>}></Route>
            <Route path='/userPage' element={<UserPage/>}></Route>
            {/* folosit pentru cand utilizatorul isi sterge contul si il redirectioneaza pe pagina de login */}
            {/* <Route path='/login' element={<UserPage/>}></Route> */}
            {/*Pagina de login intra pe zona */}
            <Route path='/loginPage' element={<LoginPage/>}></Route>
            {/*Pagina de register intra pe zona */}
            <Route path='/registerPage' element={<RegisterPage/>}></Route>
          </Routes>
    </div>
  );
}

export default App;
