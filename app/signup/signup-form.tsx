/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      // Sign up with email and password
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) throw error;

      console.log("Signup successful:", data);
      setMessage("Signup successful! Redirecting...");
      
      // If email confirmation is not required, redirect to home
      // If email confirmation is required, show different message
      if (data.user?.identities?.length === 0) {
        setMessage("This email is already registered. Please log in instead.");
      } else if (data.user && !data.session) {
        setMessage("Please check your email to confirm your account before logging in.");
      } else {
        router.push("/"); // Navigate to home if auto sign-in is enabled
      }
    } catch (error: any) {
      console.error("Signup failed:", error);
      setMessage(`Signup failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      console.error("Google Signup Failed:", error);
      setMessage("Something went wrong with Google signup. Please try again.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <Card className="overflow-hidden max-h-screen">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="relative hidden md:block">
            <img
              src="https://i.pinimg.com/736x/71/df/7f/71df7f8b1ea1b02d65d7d14534282ce9.jpg"
              alt="Decorative background image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form className="p-4 md:p-6 overflow-auto" onSubmit={handleSignup}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-xl font-bold">Create an account</h1>
                <p className="text-muted-foreground text-sm">
                  Sign up for your QuickDev account
                </p>
              </div>
              {message && (
                <p className="text-center text-sm text-red-500">{message}</p>
              )}
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-custom_purple text-white hover:bg-opacity-90" 
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
              
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
              
              <Button 
                type="button"
                variant="outline" 
                className="w-full"
                onClick={handleGoogleSignup}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  className="mr-2 h-4 w-4"
                >
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Sign up with Google
              </Button>
              
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <a href="/login" className="text-blue-500 underline">
                  Log in
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By signing up, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}