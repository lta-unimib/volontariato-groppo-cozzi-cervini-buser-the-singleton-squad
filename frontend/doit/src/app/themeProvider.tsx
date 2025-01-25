"use client";

import React, { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

interface ThemeProviderProps {
  /** The children elements to be rendered inside the theme provider. */
  readonly children: React.ReactNode;
}

/**
 * ThemeProvider component that applies the current theme to the document's root element.
 * It listens for theme changes and updates the class on the root element to match the active theme.
 *
 * @param {ThemeProviderProps} props - The props for the ThemeProvider component.
 * @param {React.ReactNode} props.children - The child elements to render inside the provider.
 *
 * @returns The ThemeProvider component that wraps the children.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}