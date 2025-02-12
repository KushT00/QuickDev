"use client"; // Ensure this is here

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Client, Account } from "appwrite";

const client = new Client().setProject("6782434a002cdaea3420");
const account = new Account(client);

type UserContextType = {
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode; // Explicitly define the children prop type
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const result = await account.get();
        setUserName(result.name);
      } catch (error) {
        console.error("Error fetching account data:", error);
        // Redirect to login if not logged in
        
      }
    };

    fetchAccount();
  }, []);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
