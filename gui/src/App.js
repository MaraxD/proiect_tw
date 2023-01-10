import { Routes, Route,Navigate } from 'react-router-dom';
import './App.css';
import MainPage from './mainPage/MainPage';
import UserPage from './userPage/UserPage';
import LoginPage from './loginPage/LoginPage';


const App=()=> {
  return (
    <div className="App">
          {/* <UserPage/> */}
          <Routes>
            <Route path="/" element={<LoginPage/>}></Route>
            <Route path="/mainPage" element={<MainPage/>}></Route>
            <Route path='/userPage' element={<UserPage/>}></Route>
            {/* folosit pentru cand utilizatorul isi sterge contul si il redirectioneaza pe pagina de login */}
            {/* <Route path='/login' element={<UserPage/>}></Route> */}
            {/*Pagina de login intra pe zona */}
          </Routes>
    </div>
  );
}

export default App;
