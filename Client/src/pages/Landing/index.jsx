import { useState } from 'react';
import './index.css';
import { Outlet, Link } from "react-router-dom";

const Landing = () =>{
  const [sessions] = useState([{id: 1}, {id: 2}, {id: 3}, {id: 4}]);
  return(
    <>
      <h1 className='welcome-header'> JavaScript Remote Sessions </h1>
      <h3>Choose code block:</h3>
      
      <div className='sessions'>
        {sessions.map(session => (
          <Link 
            key={session.id} 
            to={`/Session?id=${session.id}`} 
            style={{ textDecoration: 'none', color: '#F7DCB9' }}>
            <button className='session session1'>
              Session {session.id}
            </button>
          </Link>
        ))
      }
      </div>
      
      <Outlet /> 
    </>
    )
};

export default Landing;