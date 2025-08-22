import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { backendUrl, setToken } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const email = location.state?.email || "";
  const fromLogin = location.state?.fromLogin;

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(backendUrl + "/api/user/verify-user", {
        email,
        verificationCode: code,
        fromLogin,
      });
      if (data.success) {
        if (fromLogin && data.token) {
          // Case: came from login → JWT should be issu
          toast.success(data.message);
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        } else {
          // Case: came from register → just verified
          toast.success(data.message);
          navigate("/login");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleResend = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/resend-verify-code",
        {
          email,
        }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleVerify} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Verify Your Email</p>
        <p>
          We sent a code to <span className="font-medium">{email}</span>
        </p>

        <div className="w-full">
          <p>Enter Verification Code</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          Verify
        </button>

        <p>
          Didn’t get the code?{" "}
          <span
            onClick={handleResend}
            className="text-primary underline cursor-pointer"
          >
            Resend
          </span>
        </p>
      </div>
    </form>
  );
};

export default VerifyEmail;
