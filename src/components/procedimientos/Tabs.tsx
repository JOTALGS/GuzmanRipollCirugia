"use client"

import { ReactNode } from "react"
import { Button } from "@mui/material"

interface TabProps {
  children: ReactNode
  active?: boolean
  onClick: () => void
  className?: string
}

export function Tab({ children, active = false, onClick, className = "" }: TabProps) {
  return (
    <Button
      onClick={onClick}
      variant={active ? "contained" : "outlined"}
      color={active ? "primary" : "inherit"}
      sx={{
        px: 3,
        py: 1.5,
        borderColor: active ? "white" : "gray",
        backgroundColor: active ? "white" : "transparent",
        color: active ? "black" : "white",
        "&:hover": {
          borderColor: active ? "white" : "gray",
        },
        transition: "all 0.2s ease-in-out",
        ...className && { className },
      }}
    >
      {children}
    </Button>
  )
}
