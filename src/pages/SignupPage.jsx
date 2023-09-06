import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

import { post } from "../services/authService";

function SignupPage() {

  const [user, setUser] = useState({
    email: "",
    password: "",
    fullName: "",
    location: "",
    username: ""
  })

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setUser((prev) => ({...prev, [e.target.name]: e.target.value}))
  }
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();

    post('/auth/signup', user)
      .then((response) => {
        console.log('JWT token', response.data.authToken );
        storeToken(response.data.authToken)
        authenticateUser()
        navigate('/');     
      })
      .catch((error) => {
        console.log("Error", error)
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  
  return (
<section class="h-80">
<div class="container h-80 px-6 py-24">
  <div class="g-6 flex h-80 flex-wrap items-center justify-center lg:justify-between">
    <div class="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
      <img
        src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1691637562/project3/signup_n4kwyf.webp"
        class="w-full"
        alt="Phone image"
      />
    </div>

    <div class="md:w-4/12 lg:ml-6 lg:w-4/12">
      <form
        onSubmit={handleSignupSubmit}
        class="flex flex-col justify-center align-middle"
      >

        <div class="relative mb-6 flex flex-col justify-center align-middle">
                <input
                  type="email"
                  name="email"
                  onChange={handleTextChange}
                  class="peer flex min-h-[auto] lg:w-1/2 sm:w-5/6 justify-center align-middle rounded border-0 bg-transparent px-3 py-[0.32rem]
                   leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 
                   data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 
                   dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 "
                  
                   placeholder="Email address"
                />
              </div>

        <div class="relative mb-6 flex flex-col justify-center align-middle">
          <input
            type="password"
            name="password"
            class="peer block min-h-[auto] lg:w-1/2 sm:w-5/6 rounded justify-center align-middle border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
            outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
            motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
            [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput33"
            placeholder="Password"
            onChange={handleTextChange}
          />
        </div>

        <div class="relative mb-6 flex flex-col justify-center align-middle" >
          <input
            type="text"
            name="fullName"
            class="peer block min-h-[auto] lg:w-1/2 sm:w-5/6 rounded justify-center align-middle border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
            outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
            motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
            [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput33"
            placeholder="Full Name"
            onChange={handleTextChange}
          />
        </div>

        <div class="relative mb-6 flex flex-col justify-center align-middle" >
          <input
            type="text"
            name="username"
            class="peer block min-h-[auto] lg:w-1/2 sm:w-5/6 rounded justify-center align-middle border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
            outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
            motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
            [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput33"
            placeholder="Username"
            onChange={handleTextChange}
          />
        </div>

        <div class="relative mb-6 flex flex-col justify-center align-middle" >
          <input
            type="text"
            name="location"
            class="peer block min-h-[auto] lg:w-1/2 sm:w-5/6 rounded justify-center align-middle border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
            outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
            motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
            [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput33"
            placeholder="Location"
            onChange={handleTextChange}
          />
        </div>

        <button
          type="submit"
          class=" w-72 rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
          transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
          focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
          focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
          dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
          dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
          dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          Sign up
        </button>

        <div class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 
        after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
            {errorMessage && (
              <p className="error-message">{errorMessage}</p>
            )}
            Have an account?
            <Link to="/login" > Sign in</Link>
          </p>
        </div>
      </form>
    </div>
  </div>
</div>
</section>
  )
}

export default SignupPage;