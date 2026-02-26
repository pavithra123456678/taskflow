"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait for auth to finish restoring
    if (!token) {
      router.push("/login");
    }
  }, [token, loading]);

  if (loading) return null; // Or a loading spinner
  if (!token) return null;

  return children;
}
