"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ApplicationProvidersProps = React.PropsWithChildren;

export const ApplicationProviders = React.memo(function ApplicationProviders({
  children,
}: ApplicationProvidersProps) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
});
