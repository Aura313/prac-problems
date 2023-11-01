import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const [showError, setShowError] = useState(false);
  const [laoding, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    let url = 'https://jsonplaceholder.typicode.com/users/1';
    try {
      const res = await axios.get(url);
      setUser(res.data);
    } catch (error) {
      setShowError(true);
    }
    setLoading(false);
  };
// console.log(laoding, 'ksksksk')
  return (
    <form className='container'>
      <span>{user.name}</span>
      <input
        type='text'
        placeholder='username'
        onChange={(e) => setUserName(e.target.value)}
        value={userName}
      />
      <input
        type='password'
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        type='submit'
        disabled={!userName || !password}
        onClick={handleClick}
      >
        {laoding ? 'Processing....' : 'Login'}
      </button>
      <span
        className='error'
        data-testid='error'
        style={{ visibility: showError ? 'visible' : 'hidden' }}
      >
        Something went wrong
      </span>
    </form>
  );
};

export default Login;
