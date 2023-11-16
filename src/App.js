import './App.css';

//IMPORTAR COMPONENTES
import Show from './Components/Show';
import Create from './Components/Create';
import Edit from './Components/Edit';

//IMPORTAR EL ROUTER
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Show /> } />
          <Route path='/create' element={ <Create /> } />
          <Route path='/edit/:id' element={ <Edit /> } />
        </Routes>
      </BrowserRouter> 
    </div>
  );
};

export default App;
