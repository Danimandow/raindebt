import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!session) return <Redirect href="/(auth)/login" />;
  return <>{children}</>;
}
