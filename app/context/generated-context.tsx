"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface Content {
  id: string;
  platform: string;
  title: string;
  content: string;
}

interface GeneratedContext {
  generatedContent: Content[];
  setGeneratedContent: Dispatch<SetStateAction<Content[]>>;
}

// defaultValue only used for type inference; won't actually be read
export const generatedContext = createContext<GeneratedContext | null>(null);

export function GeneratedProvider({ children }: { children: React.ReactNode }) {
  const [generatedContent, setGeneratedContent] = useState<Content[]>([]);

  return (
    <generatedContext.Provider
      value={{ generatedContent, setGeneratedContent }}
    >
      {children}
    </generatedContext.Provider>
  );
}

export function useGeneratedContext() {
  const context = useContext(generatedContext);
  if (!context) {
    throw new Error(
      "useGeneratedContext must be used within a GeneratedProvider"
    );
  }
  return context;
}
