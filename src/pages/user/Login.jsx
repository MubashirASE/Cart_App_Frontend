import { useAuth } from "../../hooks/useAuth";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  const { loginData, setLoginData, errors, loading, handleLogin } = useAuth();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold  text-blue-600">
            Login
          </h2>
        </div>
        <LoginForm
          loginData={loginData}
          handleChange={handleChange}
          errors={errors}
          loading={loading}
          handleLogin={handleLogin}
        />
      </div>
    </div>
  );
};

export default Login;