"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputsLogin } from "../../types/all-types";
import { supabase } from "../../libs/supabase";
import { useRef, useState } from "react";
import Alert from "../Alert";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

function CardLogin() {
  const router = useRouter();
  const [_, setCookies] = useCookies(["user", "session"]);
  const divRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsLogin>();
  const submit: SubmitHandler<InputsLogin> = async ({ email, password }) => {
    divRef.current?.classList.toggle("pointer-events-none");
    setError(undefined);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      divRef.current?.classList.toggle("pointer-events-none");
      return;
    }
    router.push("/");
  };
  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      },
    });
    // console.log(data);
  }
  supabase.auth.getUser().then((user) => {
    if (user.data.user) {
      router.push("/");
    }
  });
  return (
    <>
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
          <button
            onClick={loginWithGoogle}
            type="button"
            className="bg-blue-600 p-2 rounded-lg active:-translate-y-1 transition duration-150"
          >
            Login with google
          </button>
          <div className="pb-5"></div>
        </form>
      </div>
    </>
  );
}

export default CardLogin;
