import './App.css';
import UserRouter from './Router/UserRouter';
import AdminRouter from './Router/AdminRouter';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<UserRouter/>}/>
        <Route path='/admin/*' element={<AdminRouter/>}/>
      </Routes>
    </Router>
  );
}

export default App;
