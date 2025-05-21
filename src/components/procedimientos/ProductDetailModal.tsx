"use client"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Grid,
  Button,
  Chip,
  Box,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useEffect, useState } from "react"

interface ProductDetailModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    title: string
    subtitle: string
    description: string
    jpDescription: string
    image: string
    price: string
    colors?: string[]
    sizes?: string[]
    features?: string[]
  }
}

export default function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0])
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="h5" fontWeight="bold">{product.title}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ maxHeight: "80vh" }}>
        <Grid container spacing={4}>
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                backgroundImage: `url(${product.image || "/placeholder.svg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 1,
              }}
            />
          </Grid>

          {/* Details Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom color="text.secondary">
              {product.subtitle}
            </Typography>

            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
              {product.price}
            </Typography>

            <Typography paragraph>{product.description}</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {product.jpDescription}
            </Typography>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <Box mt={3}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>COLOR</Typography>
                <Box display="flex" gap={1}>
                  {product.colors.map((color) => (
                    <IconButton
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: color.toLowerCase(),
                        border: selectedColor === color ? "2px solid black" : "2px solid transparent",
                        "&:hover": { borderColor: "black" },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <Box mt={3}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>SIZE</Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {product.sizes.map((size) => (
                    <Chip
                      key={size}
                      label={size}
                      onClick={() => setSelectedSize(size)}
                      variant={selectedSize === size ? "filled" : "outlined"}
                      color={selectedSize === size ? "primary" : "default"}
                      clickable
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Features */}
            {product.features?.length > 0 && (
              <Box mt={3}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>FEATURES</Typography>
                <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                  {product.features.map((feature, index) => (
                    <li key={index} style={{ display: "flex", alignItems: "flex-start", marginBottom: 8 }}>
                      <ChevronRightIcon fontSize="small" sx={{ mr: 1, mt: "2px", color: "gray" }} />
                      <Typography variant="body2">{feature}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {/* Add to Cart */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              sx={{ mt: 4, py: 2, fontWeight: "bold" }}
            >
              ADD TO CART
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
