/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Client, Account } from "appwrite";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";

const client = new Client().setProject("6782434a002cdaea3420");
const account = new Account(client);

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchedUserId = searchParams.get("userId");
    const fetchedSecret = searchParams.get("secret");
    if (fetchedUserId && fetchedSecret) {
      setUserId(fetchedUserId);
      setSecret(fetchedSecret);
    }
  }, [searchParams]);

  const resetPassword = (userId: string, secret: string, password: string): void => {
    const promise = account.updateRecovery(userId, secret, password);

    promise.then(
      (response) => {
        setStatusMessage("Password updated successfully! You can now log in.");
      },
      (error) => {
        setStatusMessage(error.message || "Something went wrong. Please try again.");
      }
    );
  };

  const handleRecovery = async (event: React.FormEvent) => {
    event.preventDefault();

    if (userId && secret) {
      if (password !== confirmPassword) {
        setStatusMessage("Passwords do not match!");
        return;
      }
      resetPassword(userId, secret, password);
    } else {
      try {
        const response = await account.createRecovery(email, "http://localhost:3000/recover");
        setStatusMessage("Recovery email sent! Please check your inbox.");
      } catch (error: any) {
        setStatusMessage(error.message || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#111827] text-white">
      <div className="w-full max-w-md bg-[#1f2937] shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-[#a855f7]">
          {userId && secret ? "Reset Password" : "Recover Your Account"}
        </h1>
        <p className="text-center text-gray-400 mb-6">
          {userId && secret
            ? "Please enter and confirm your new password below."
            : "Enter your email, and we’ll send you a recovery link."}
        </p>
        <form onSubmit={handleRecovery} className="space-y-6">
          {!userId && !secret && (
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 bg-[#2a303c] border-none focus:ring-[#a855f7] text-gray-200"
              />
            </div>
          )}
          {userId && secret && (
            <>
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  New Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your new password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 bg-[#2a303c] border-none focus:ring-[#a855f7] text-gray-200"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-1 bg-[#2a303c] border-none focus:ring-[#a855f7] text-gray-200"
                />
              </div>
            </>
          )}
          <Button
            type="submit"
            className="w-full bg-[#a855f7] hover:bg-[#9333ea] focus:ring-4 focus:ring-[#c084fc] focus:outline-none text-white py-2 rounded-lg transition"
          >
            {userId && secret ? "Reset Password" : "Send Recovery Email"}
          </Button>
          {statusMessage && (
            <p className="text-center text-sm text-gray-300 mt-4">{statusMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PasswordRecovery;
