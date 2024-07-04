import { useState } from "react";
import { getSignup } from "../../Config/auth";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useAuthValues } from "../../Context/authContext";

function SignUp() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get the auth context value of isLoggedIn
  const { isLoggedIn } = useAuthValues();

  // Handle register button
  const registerHandler = async (e) => {
    e.preventDefault();

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        const result = await getSignup(email, password);
        if (result.success) {
          toast.success("You are registered successfully!");
          window.location.replace("/signin");
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        toast.error("Something went wrong during the registration process! " + error.message);
      } finally {
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
      {isLoggedIn && <Navigate to={"/"} replace={true} />}
      <div className="login-form-container">
        <div className="login-container">
          <h2>Register</h2>
          <form action="/login" method="post" className="login-form" onSubmit={registerHandler}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="mb-3" type="submit">
              Register
            </button>

            <div className="text-end">
              <span className="me-2">Already Registered?</span>
              <a type="button" className="btn btn-success" href="/signin">
                Login Now!
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
