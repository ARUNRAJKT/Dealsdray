import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import EmpPage from './pages/EmpPage';
import AddPage from './pages/AddPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/MainPage' element={<MainPage/>}/>
        <Route path='/EmpPage' element={<EmpPage/>}/>
        <Route path='/AddPage' element={<AddPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
