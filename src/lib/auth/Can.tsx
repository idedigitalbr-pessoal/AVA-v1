"use client";

import React from "react";
import { Permission } from "@/types";
import { useAuth } from "./AuthContext";

interface CanProps {
  I: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function Can({ I, children, fallback = null }: CanProps) {
  const { can } = useAuth();
  
  if (can(I)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
