"use client";
import React, { useState, useRef, useEffect } from 'react'
import { useHomeContext } from '@/ContextAPI/Context/HomeContext';
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BiError } from 'react-icons/bi';


const Login = () => {
  const router = useRouter();
  const emailRef = useRef(null);
  const { formDataChange, formData, setAuthStatus, authStatus } = useHomeContext();
  const [userDataToRegenerateToken, setUserDataToRegenerateToken] = useState({
    userId: '',
    email: ''
  });
  const [isEmailInputEmpty, setIsEmailInputEmpty] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();

    // verifying user email on submit
    if (emailRef.current.value !== '') {
      setIsEmailInputEmpty(false);
      await handleCheckVerification();
    }
    else {
      setIsEmailInputEmpty(true);
      console.log('email is required');
    }
  }

  useEffect(() => {
    (async () => {
      if (authStatus) {
        console.log('inside login function');
        const reqBody = await axios.post('/api/users/login', formData);
        console.log("Login success", reqBody.data);
        router.push('/');
      }
    })()
  }, [authStatus])

  const handleCheckVerification = async () => {
    try {
      const user = await axios.post('/api/users/isVerifiedUser', { email: emailRef.current?.value });
      setUserDataToRegenerateToken(prev => ({ ...prev, userId: user.data.userData._id, email: user.data.userData._id }));
      if (user.data.userData.isVerified) {
        setAuthStatus(true);
      } else {
        setAuthStatus(false);
      }

    } catch (error) {
      console.log(error, 'error in handleRegenerateToken');
      setAuthStatus(false);
    }
  }

  return (

    <form onSubmit={handleLogin} className="w-fit mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-200">
          <span className='text-primary'>Login</span> to your account
        </h1>

        {/* error message if a user is not verified */}
        {
          (authStatus === false && !isEmailInputEmpty) ? (
            <div className='flex flex-wrap items-center justify-center gap-1 sm:gap-3 text-primary text-sm border-2 border-red-400 p-4'>
              <BiError className='text-2xl sm:text-3xl' />
              <p className='text-center'>Please verify your email address to login</p>
            </div>
          ) : null
        }

        <div>
          <label htmlFor="email" className="text-base font-medium text-gray-300">
            Email address
          </label>
          <div className="mt-2">
            <input
              ref={emailRef}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              name='email'
              value={formData.email}
              onChange={formDataChange}
              // onBlur={handleCheckVerification}
              placeholder="Email"
              id="email"
              required
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-base font-medium text-gray-300">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              placeholder="Password"
              name='password'
              value={formData.password}
              onChange={formDataChange}
              id="password"
              required
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className='inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer'
          disabled={authStatus === true}
          >
            Login
          </button>
        </div>

        {
          (authStatus === false && !isEmailInputEmpty) && (
            <button type='button'
              className='text-primary font-medium hover:underline'
              onClick={() => handleRegenerateToken('VERIFY')}
            >Regenerate Verification token</button>
          )
        }

        <div className='text-center'>
          Don't have an account? <Link href="/signup" className="text-primary font-medium">Signup</Link>
        </div>
      </div>
    </form>
  )
}

export default Login
