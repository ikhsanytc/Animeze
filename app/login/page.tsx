"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import Provider from "../components/Provider";
import { InputsLogin } from "../types/all-types";
import { supabase } from "../libs/supabase";
import { useEffect, useRef, useState } from "react";
import Alert from "../components/Alert";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

function Page() {
  const [cookies, setCookies] = useCookies(["user", "session"]);
  const router = useRouter();
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (cookies.session && cookies.user) {
      router.back();
    }
  }, []);
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsLogin>();
  const submit: SubmitHandler<InputsLogin> = async ({ email, password }) => {
    divRef.current?.classList.toggle("pointer-events-none");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      divRef.current?.classList.toggle("pointer-events-none");
      return;
    }
    const currentTime = new Date();
    setCookies("session", JSON.stringify(data.session), {
      expires: new Date(currentTime.getTime() + 3 * 24 * 60 * 60 * 1000),
      path: "/",
    });
    setCookies("user", JSON.stringify(data.user), {
      expires: new Date(currentTime.getTime() + 3 * 24 * 60 * 60 * 1000),
      path: "/",
    });
    router.push("/");
  };
  return (
    <Provider center>
      <Navbar />
      {error && <Alert message={error} />}
      <div
        ref={divRef}
        className="bg-black bg-opacity-75 backdrop-filter backdrop-blur-xl w-full md:w-1/2 p-2 rounded-lg text-white"
      >
        <h1 className="text-center text-2xl lg:text-3xl font-bold">Login</h1>
        <hr className="mt-4 border-2 mb-4" />
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              className={`rounded-full w-full outline-none bg-white text-black py-2 px-4 border-[3px] focus:-translate-y-1 transition duration-150 border-blue-500 focus:border-blue-600 ${
                errors?.email && "border-red-500 focus:border-red-600"
              }`}
              placeholder="Email..."
              maxLength={255}
              minLength={1}
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required!",
                },
              })}
            />
            <p className="text-red-500 px-2 pt-1 font-medium">
              {errors.email?.message}
            </p>
          </div>
          <div>
            <input
              type="password"
              className={`rounded-full w-full outline-none bg-white text-black py-2 px-4 border-[3px] border-blue-500 focus:border-blue-600 focus:-translate-y-1 transition duration-150 ${
                errors?.password && "border-red-500 focus:border-red-600"
              }`}
              placeholder="Password..."
              minLength={8}
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required!",
                },
              })}
            />
            <p className="text-red-500 px-2 pt-1 font-medium">
              {errors.password?.message}
            </p>
          </div>
          <button
            type="submit"
            className="bg-blue-600 p-2 rounded-lg active:-translate-y-1 transition duration-150"
          >
            Login
          </button>
          <div className="pb-5"></div>
        </form>
      </div>
    </Provider>
  );
}

export default Page;
