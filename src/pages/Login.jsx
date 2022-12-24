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
      <form
        className="flex flex-col w-2/6 bg-tagbg border-[1px] border-brBlue rounded-lg px-5 py-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-bold text-3xl mb-5">Login</h1>
        <label className="text-myBlue mt-5">Email</label>
        <input
          type="email"
          className=" h-10 px-4 py-3 rounded-lg border-[1px] border-brBlue"
          placeholder="Input your email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-myBlue mt-5">Password</label>
        <input
          type="password"
          className=" h-10 px-4 py-3 rounded-lg border-[1px] border-brBlue"
          placeholder="Input your password"
          id="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          type="submit"
          className="my-5 bg-myBlue px-4 py-3 text-white rounded-lg transition-all duration-100 ease-in-out hover:bg-[#00878e] hover:text-myBlaxk"
        >
          Login
        </button>
        <h3 className=" text-sm text-center">
          Need an account? &nbsp;
          <Link to={'/sign-up'} className="text-myBlue underline hover:text-myBlaxk">
            Sign-up
          </Link>
        </h3>
      </form>
    </main>
  );
};

export default Login;
