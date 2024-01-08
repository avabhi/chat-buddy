import Image from "next/image";
import AuthForm from "./components/authform";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col jusitfy-center py-12 sm:px-6 lg:px-8 bg-gray-100 justify-center">
      {/* removing sm:mx-auto because it breaking the center of ui */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <Image
          alt="Logo"
          src="/images/logo.png"
          width="48"
          height="48"
          className="mx-auto w-auto"
        /> */}
        <h2 className="mt-6 text-center text-3xl  font-medium tracking-tight text-gray-900">
          Sign in to Your Account
        </h2>
      </div>
      {/* Auth Form */}
      <AuthForm />
    </div>
  );
}
