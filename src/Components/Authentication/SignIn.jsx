import { useState } from "react";
import { useAuthValues } from "../../Context/authContext";
import { getSignin, googleSignin } from "../../Config/auth";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import googleAuthImg from "../../Assets/google-signin-button.png";

function SignIn() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get the auth context value of isLoggedIn
  const { isLoggedIn } = useAuthValues();

  // Handle signing in
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const result = await getSignin(email, password);
        if (result.success) {
          toast.success("You are Logged In!");
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        toast.error("Something went wrong while signing you in! " + error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  // Handle signing in with Google
  const handleGoogleSignIn = async () => {
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const result = await googleSignin();
        if (result.success) {
          toast.success("You are Logged in!");
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        toast.error("Something went wrong while logging you in! " + error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <>
      {isLoggedIn && <Navigate to={"/"} replace={true} />}

      <div className="login-form-container">
        <div className="login-container">
          <h2>Login</h2>
          <form action="/login" method="post" className="login-form" onSubmit={handleSignIn}>
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
              Login
            </button>

            <div id="googleSignin-img">
              <img
                src={googleAuthImg}
                id="googleSigninImg"
                alt="Google Sign-In"
                onClick={handleGoogleSignIn}
              />
            </div>

            <div className="text-end">
              <span className="me-2">New User?</span>
              <a type="button" className="btn btn-success" href="/signup">
                Register Now
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
