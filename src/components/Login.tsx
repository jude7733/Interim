import { auth } from "@/app/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Head } from "./ui/head";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { Label } from "./ui/label";
import { useAppDispatch } from "@/app/hooks";
import { addUser } from "@/features/userSlice";

export const Login = ({ skip }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();

  const signUp = async () => {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
      }
    );
  };

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        dispatch(addUser(user));
        skip();
      }
    );
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10 border-2 p-10 rounded-xl shadow-md shadow-primary">
        <div className="flex justify-center">
          <Head title={isLogin ? "Login" : "Sign Up"} />
        </div>
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-around gap-5">
          <Button onClick={isLogin ? signIn : signUp}>
            <LogIn className="mr-3" />{" "}
            <Label>{isLogin ? "Log In" : "Sign Up"}</Label>
          </Button>
          <Button variant="outline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Log In"}
          </Button>

          <Button variant="secondary" onClick={skip}>
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
};
