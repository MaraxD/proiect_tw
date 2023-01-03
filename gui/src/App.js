import { Routes, Route,Navigate } from 'react-router-dom';
import './App.css';
import MainPage from './mainPage/MainPage';
import UserPage from './userPage/UserPage';

const App=()=> {
  return (
    <div className="App">
          {/* <UserPage/> */}
          <Routes>
            <Route path="/" element={<MainPage/>}></Route>
            <Route path='/userPage' element={<UserPage/>}></Route>
            {/* folosit pentru cand utilizatorul isi sterge contul si il redirectioneaza pe pagina de login */}
            {/* <Route path='/login' element={<UserPage/>}></Route> */}
          </Routes>
    </div>
  );
}

export default App;
