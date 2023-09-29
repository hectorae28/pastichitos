"use client"
import { SessionProvider } from "next-auth/react"
export function SessionProviderHook({children}){
  return <SessionProvider>{children}</SessionProvider>
}