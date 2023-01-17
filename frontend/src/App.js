import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState, createContext } from 'react';
import Auth from './components/Auth.js';
import Hospital from './components/Hospital';
import Entrance from './components/Entrance'
import Bottom from './components/Bottom';

function App() {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ login, setLogin ] = useState('');
  const [ auth, setAuth ] = useState(false);
  /* const AppContext = createContext() */
  /* const [ csrf, setCsrf ] = useState('');
    useEffect(() => {
      let fetchData = async () => {
        let requestOptions = {
          method: 'GET',
          headers: { 
              'Content-Type': 'application/json',
              'Authorization': login }
          };
        let tokenResponse = await fetch(`${domainAddress}/csrf`, requestOptions);
        let json = await tokenResponse.json()
        setCsrf(json.token)
        console.log(json.token)
      }
      fetchData()
        .catch(console.error);;  
    }, []) */
  
  

  return (
    <div>
    <Hospital />
    {auth ? <Entrance username={username} login={login} setLogin={setLogin} auth={auth} setAuth={setAuth} /> 
    : <Auth setAuth={setAuth} setLogin={setLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} />}
    <Bottom />
    </div>  
  );
}

export default App;


