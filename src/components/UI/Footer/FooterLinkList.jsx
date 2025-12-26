import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { List, ListItem, Link as MuiLink } from "@mui/material";

export default function FooterLinkList({ links }) {
  const location = useLocation();

  return (
    <List disablePadding dense>
      {links.map((link) => {
        const isActive = link.to ? location.pathname === link.to : false;

        return (
          <ListItem
            key={link.text}
            disablePadding
            sx={{ mb: 1.5 }}
          >
            {link.to ? (
              <MuiLink
                component={RouterLink}
                to={link.to}
                underline="none"
                sx={{
                  color: isActive ? "#fff" : "#B0B0B0",
                  fontSize: "16px",
                  fontWeight: isActive ? 600 : 500,
                  "&:hover": { color: "#fff" }
                }}
              >
                {link.text}
              </MuiLink>
            ) : link.href ? (
              <MuiLink
                href={link.href}
                underline="none"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#B0B0B0",
                  fontSize: "16px",
                  fontWeight: 500,
                  "&:hover": { color: "#fff" }
                }}
              >
                {link.text}
              </MuiLink>
            ) : (
              <span style={{ color: "#B0B0B0", fontSize: "16px", fontWeight: 500 }}>
                {link.text}
              </span>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
