import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/axiosClient';
import { setToken } from '../redux/features/tokenSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: email,
      password: pass,
    };

    try {
      const res = await authApi.login(formData);
      dispatch(setToken(res.data.auth_token));
      navigate('/');
    } catch (err) {
      console.log(err);
      setEmail('');
      setPass('');
      navigate('/login');
    }
  };

  return (
    <main className="min-h-screen flex justify-center w-full items-center">
      <form className="flex flex-col w-2/6 backg rounded-lg" onSubmit={handleSubmit}>
        <h1 className="text-center font-bold text-3xl bg-myGreen rounded-t-lg mb-5 py-8 text-myBlack">Login</h1>
        <div className="px-5 pb-8 flex flex-col">
          <label className="text-white mt-5">Email</label>
          <input
            type="email"
            required
            className=" h-10 px-4 py-3 rounded-lg text-white backg border-[1px] border-myGreen"
            placeholder="Input your email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-white mt-5">Password</label>
          <input
            type="password"
            required
            className=" h-10 px-4 py-3 text-white rounded-lg backg border-[1px] border-myGreen"
            placeholder="Input your password"
            id="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button
            type="submit"
            className="my-5 bg-myGreen px-4 py-3 text-myBlack rounded-lg transition-all duration-100 ease-in-out hover:opacity-60"
          >
            Login
          </button>
          <h3 className=" text-sm text-center text-white">
            Need an account? &nbsp;
            <Link to={'/sign-up'} className="text-myGreen underline hover:text-white">
              Sign-up
            </Link>
          </h3>
        </div>
      </form>
    </main>
  );
};

export default Login;
