import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from "./pages/Home";
import Content from './pages/Content';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/content' element={<Content/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
