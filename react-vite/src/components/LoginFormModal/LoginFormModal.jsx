import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../redux/session';
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };
  const demoUserLogin = async (e) => {
    e.preventDefault()
   
    return await dispatch(sessionActions.thunkLogin({email: 'demo@aa.io', password: 'password'}))
    .then(navigate('/'))
    .then(closeModal())
  }

  return (
    <>
    <div id='login-modal'>
    <div className="modal-contents">
      <h1 className="login-title">Log In</h1>
      <form id='login-inputs' onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
             <p className='form-errors'>{errors.email || ''}</p>
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
             <p className='form-errors'>{errors.password || ''}</p>
        </label>
        <button className='login-submit' type="submit" disabled={!email.length || !password.length}>Login</button>
        <span className='demo-user-login' onClick={demoUserLogin}>Demo User</span>
      </form>
    </div>
            </div>
    </>
  );
}

export default LoginFormModal;
