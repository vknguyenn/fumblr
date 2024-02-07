import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (String(password).length < 6) {
      return setErrors({
        password:
          "Password must be at least 6 characters. ",
      })
    }

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Passwords do not match",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
    <div id='signup-modal'>
    <div className="signup-contents">
      <h1 className="signup-title">Sign Up</h1>
      {/* <div className="error-container">
          {errors.server && <p className='form-errors' style={{color: '#6F52FF'}}>{errors.server}</p>}
          {errors.email && <p className='form-errors' style={{color: '#6F52FF'}}>{errors.email}</p>}
          {errors.username && <p className='form-errors' style={{color: '#6F52FF'}}>{errors.username}</p>}
          {errors.password && <p className='form-errors' style={{color: '#6F52FF'}}>{errors.password}</p>}
          {errors.confirmPassword && <p className='form-errors'style={{color: '#6F52FF'}}>{errors.confirmPassword}</p>}
      </div> */}
      <form className='signup-inputs' onSubmit={handleSubmit}>
        <label className="signup-labels">
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
        <label className="signup-labels">
          Username
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
           <p className='form-errors'>{errors.username || ''}</p>
        </label>
        <label className="signup-labels">
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
        <label className="signup-labels">
          Confirm Password
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
           <p className='form-errors'>{errors.confirmPassword || ''}</p>
        </label>
        <button className='signup-submit' type="submit">Sign Up</button>
      </form>
    </div>
    </div>
    </>
  );
}

export default SignupFormModal;
