"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
//prettier-ignore
import { signUpWithCredentials } from "@actions/authActions";
import { useRouter } from "next/navigation";
import Loader from "@components/Loading";

const Form = ({ type }) => {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [Result, setResult] = useState(null);
  const [Error, setError] = useState(null);
  useEffect(() => {
    if (Error) {
      setTimeout(() => setError(null), 5000);
    }
    if (Result) {
      setTimeout(() => {
        setResult(null);
        router.push("/");
      }, 5000);
    }
  }, [Error, Result]);

  const handleSignUp = async (formData) => {
    try {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const res = await signUpWithCredentials({ name, email, password });
      if(res.done == 1) {
        setResult(res?.msg);
      } else {
        throw new Error("Something Bad")
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleSignIn = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 w-[26rem] form max-[650px]:w-full "
        onSubmit={(event) => {
          event.preventDefault();
          type === "Sign Up"
            ? handleSignUp(new FormData(event.target))
            : handleSignIn(new FormData(event.target));
        }}
        // action={type === "Sign Up" ? handleSignUp : handleSignIn}
      >
        <span>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className=" rounded-full p-3  font-semibold w-full outline-none border-2 duration-200 hover:bg-slate-100 "
          >
            <FcGoogle className="absolute justify-center text-2xl" />
            Continue with Google
          </button>
        </span>
        <div className="my-3 text-gray-500 text-md relative">
          <hr className="border-t-[3px]" />
          <span className="absolute bg-white p-2 flex justify-center left-1/2 -translate-x-1/2 -translate-y-[1.40rem]">
            or
          </span>
        </div>
        {type === "Sign Up" && (
          <>
            <div className="flex flex-col gap-1 ">
              <label
                htmlFor="name"
                className="font-semibold after:content-['*'] after:text-red-500 after:ml-1"
              >
                Name
              </label>
              <span className="detail_input rounded-full">
                <input
                  type="text"
                  name="name"
                  className="border rounded-full w-full p-3 text-sm outline-none "
                  placeholder="Enter your name"
                  required
                />
              </span>
            </div>
          </>
        )}
        <div className="flex flex-col gap-1 ">
          <label
            htmlFor="name"
            className="font-semibold after:content-['*'] after:text-red-500 after:ml-1"
          >
            Email
          </label>
          <span className="detail_input rounded-full">
            <input
              type="email"
              name="email"
              className="border rounded-full w-full p-3 text-sm outline-none "
              placeholder="Enter your email"
              // autocomplete="off"
              required
            />
          </span>
        </div>
        <div className="flex flex-col gap-1  rounded-full">
          <label
            htmlFor="name"
            className="font-semibold after:content-['*'] after:text-red-500 after:ml-1"
          >
            Password
          </label>
          <span className="detail_input rounded-full">
            <input
              type="password"
              name="password"
              className="border rounded-full p-3 w-full text-sm outline-none "
              placeholder="Enter your password"
              required
            />
          </span>
        </div>
        <button
          type={type}
          className="flex  justify-center rounded-full p-3 gap-3 text-white border font-semibold outline-none bg-red-500   active:scale-95 duration-200 "
          onClick={() => setLoading(true)}
        >
          {type}
          {Loading && <Loader />}
        </button>
        {Result && <p className="text-green-500 ">{Result}</p>}
        {Error && <p className="text-red-500">{Error}</p>}
        <div className="text-center">
          {type === "Log in" && (
            <p>
              Don't have an account{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          )}
          {type === "Sign Up" && (
            <p>
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default Form;
