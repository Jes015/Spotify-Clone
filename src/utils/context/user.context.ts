"use client"
import { UserContext } from "@/models"
import { createContext } from "react"

export const userContext = createContext<UserContext>(null)
