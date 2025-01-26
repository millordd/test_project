import { SignInForm } from './components/SignInForm';

export const SignIn = () => {
  return (
    <div className="bg-[#F3F5F8] w-full h-screen flex justify-center items-center dark:bg-dark-mode-base ">
      <div className="w-full">
        <SignInForm />
      </div>
    </div>
  );
};
