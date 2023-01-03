import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/axiosClient';
import { setToken } from '../redux/features/tokenSlice';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [confrimPass, setConfrimPass] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      email: email,
      password: pass,
      password_confirmation: confrimPass,
    };

    try {
      const res = await authApi.signup(formData);
      dispatch(setToken(res.data.auth_token));
      navigate('/login');
    } catch (err) {
      console.log(err);
      setName('');
      setEmail('');
      setPass('');
      setConfrimPass('');
    }
  };

  return (
    <main className="min-h-screen flex justify-center w-full items-center">
      <form className="flex flex-col w-2/6 backg rounded-lg" onSubmit={handleSubmit}>
        <h1 className="text-center font-bold text-3xl bg-myGreen rounded-t-lg mb-5 py-8 text-myBlacks">Sign Up</h1>
        <div className="px-5 pb-8 flex flex-col">
          <label className=" text-white">Name</label>
          <input
            type="text"
            required
            className=" h-10 px-4 py-3 backg text-white rounded-lg border-[1px] border-myGreen"
            placeholder="Input your name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-white mt-5">Email</label>
          <input
            type="email"
            required
            className=" h-10 px-4 py-3 backg text-white rounded-lg border-[1px] border-myGreen"
            placeholder="Input your email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-white mt-5">Password</label>
          <input
            type="password"
            required
            className=" h-10 px-4 py-3 backg text-white rounded-lg border-[1px] border-myGreen"
            placeholder="Input your password"
            id="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <label className="text-white mt-5">Confrim Password</label>
          <input
            type="password"
            required
            className=" h-10 px-4 py-3 backg text-white rounded-lg border-[1px] border-myGreen"
            placeholder="Confrim your password"
            id="password_confirmation"
            value={confrimPass}
            onChange={(e) => setConfrimPass(e.target.value)}
          />
          <button
            type="submit"
            className="my-5 bg-myGreen px-4 py-3 text-myBlack rounded-lg transition-all duration-100 ease-in-out hover:opacity-70"
          >
            Sign-up
          </button>
          <h3 className=" text-sm text-center text-white">
            Already a user? &nbsp;
            <Link to={'/login'} className="text-myGreen underline hover:text-white">
              Login
            </Link>
          </h3>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
