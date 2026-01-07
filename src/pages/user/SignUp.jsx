import { useAuth } from "../../hooks/useAuth";
import SignUpForm from "../../components/auth/SignUpForm";

const SignUp = () => {
  const { signupData, setSignUpData, errors, loading, handleSignup } = useAuth();

  const handleChange = (e) => {
    setSignUpData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl text-blue-600 font-bold">
            SignUp
          </h2>
        </div>
        <SignUpForm
          signupData={signupData}
          handleChange={handleChange}
          errors={errors}
          loading={loading}
          handleSignup={handleSignup}
        />
      </div>
    </div>
  );
};

export default SignUp;