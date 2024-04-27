import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Session from './pages/Session';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Landing/>}/>
          <Route path='/Session' element={<Session/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
