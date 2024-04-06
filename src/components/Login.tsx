import { auth } from "@/app/firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { Head } from "./ui/head";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { Label } from "./ui/label";
import { useAppDispatch } from "@/app/hooks";
import { addUser } from "@/features/userSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { useToast } from "./ui/use-toast";

export const Login = ({ skip }: { skip?: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const signUp = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: User = userCredential.user;
        setEmail(user?.email as string);
      })
      .then(() =>
        toast({
          description: "Account created successfully",
        })
      )
      .then(() => signIn())
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: User = userCredential.user;
        dispatch(addUser(user));
        if (skip) {
          skip();
        }
      })
      .then(() =>
        toast({
          title: email,
          description: "Logged in successfully",
        })
      );
  };

  const handleForgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      alert(error?.message);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10 border-2 p-10 rounded-xl shadow-md shadow-primary">
        <div className="flex justify-center">
          <Head title={isLogin ? "Login" : "Sign Up"} />
        </div>
        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Email"
            name="email"
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
            <LogIn className="mr-3" />
            <Label>{isLogin ? "Log In" : "Sign Up"}</Label>
          </Button>
          <Button variant="outline" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Log In"}
          </Button>
          {skip && (
            <Button variant="secondary" onClick={skip}>
              Skip
            </Button>
          )}
        </div>
        <Dialog>
          <DialogTrigger>
            <Button size="sm" variant="link">
              Forgot Password?
            </Button>
          </DialogTrigger>
          <DialogContent className="space-y-4">
            <DialogHeader>Reset Password</DialogHeader>
            <DialogDescription>
              Enter your email address and we will send you a password reset
              link.
            </DialogDescription>
            <Input
              className="mx-2 w-auto"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => handleForgotPassword(email)}
              >
                Send
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
