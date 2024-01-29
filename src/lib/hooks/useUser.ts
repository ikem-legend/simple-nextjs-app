"use client";

import { useState, useEffect } from "react";
import type { User } from "../types/common";

type UserFetch = {
  user: User | null;
  isLoading: boolean;
};

export default function useUser(): UserFetch {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("userData") ?? null;
    setUser(data ? JSON.parse(data) : null);
    setIsLoading(false);
  }, []);

  return { user, isLoading };
}
