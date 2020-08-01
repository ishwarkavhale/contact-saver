import React, { useState, useContext, useEffect } from 'react';
import alertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';
const Login = (props) => {
  const alertcontext = useContext(alertContext);
  const authcontext = useContext(AuthContext);
  const { setAlerts } = alertcontext;
  const { login, error, clearErrors, isAuthenticated } = authcontext;

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'invalid credentials') {
      setAlerts(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlerts('Fill Out all the fields');
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={onChange}
            value={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            value={password}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Login"
        />
      </form>
    </div>
  );
};

export default Login;
