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
      <form
        className="flex flex-col w-2/6 bg-tagbg border-[1px] border-brBlue rounded-lg px-5 py-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-bold text-3xl mb-5">Sign Up</h1>
        <label className=" text-myBlue">Name</label>
        <input
          type="text"
          className=" h-10 px-4 py-3 rounded-lg border-[1px] border-brBlue"
          placeholder="Input your name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <label className="text-myBlue mt-5">Confrim Password</label>
        <input
          type="password"
          className=" h-10 px-4 py-3 rounded-lg border-[1px] border-brBlue"
          placeholder="Confrim your password"
          id="password_confirmation"
          value={confrimPass}
          onChange={(e) => setConfrimPass(e.target.value)}
        />
        <button
          type="submit"
          className="my-5 bg-myBlue px-4 py-3 text-white rounded-lg transition-all duration-100 ease-in-out hover:bg-[#00878e] hover:text-myBlaxk"
        >
          Sign-up
        </button>
        <h3 className=" text-sm text-center">
          Already a user? &nbsp;
          <Link to={'/login'} className="text-myBlue underline hover:text-myBlaxk">
            Login
          </Link>
        </h3>
      </form>
    </main>
  );
};

export default SignUp;
