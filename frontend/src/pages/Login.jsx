import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl, setCartItems } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        });

        if (response.data.success) {
          const receivedToken = response.data.token;
          setToken(receivedToken);
          localStorage.setItem('token', receivedToken);
          toast.success('Sign Up Successful');

          // ✅ Get cart data
          await fetchUserCart(receivedToken);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        });

        if (response.data.success) {
          const receivedToken = response.data.token;
          setToken(receivedToken);
          localStorage.setItem('token', receivedToken);
          toast.success('Login Successful');

          // ✅ Get cart data
          await fetchUserCart(receivedToken);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ✅ Fetch user cart from backend and sync it
  const fetchUserCart = async (authToken) => {
    try {
      const cartRes = await axios.post(
        backendUrl + '/api/cart/get',
        {},
        {
          headers: { token: authToken },
        }
      );
      if (cartRes.data.success) {
        setCartItems(cartRes.data.cartData || {});
      }
    } catch (error) {
      console.log('Cart fetch failed:', error);
      toast.error('Failed to load cart');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Login' ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === 'Login' ? (
          <button
            type="button"
            onClick={() => setCurrentState('Sign Up')}
            className="cursor-pointer"
          >
            Create account
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentState('Login')}
            className="cursor-pointer"
          >
            Login Here
          </button>
        )}
        <p
          onClick={() => navigate('/forgot-password')}
          className="text-sm cursor-pointer underline mt-3 text-blue-500"
        >
          Forgot Password?
        </p>
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
