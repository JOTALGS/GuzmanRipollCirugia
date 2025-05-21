"use client"

import { useState } from "react"
import { Tab as TabSection } from "./Tabs"
import ProductDetailModal from "./ProductDetailModal"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Tabs, Typography } from "@mui/material"

const products = [
  {
    id: "alpha-sv",
    category: "jackets",
    title: "ALPHA SV JACKET",
    subtitle: "アルファ SV ジャケット",
    description:
      "Our most durable GORE-TEX PRO shell for severe alpine conditions. Designed for climbers and mountaineers.",
    jpDescription:
      "過酷なアルパイン環境向けの最も耐久性の高いゴアテックスプロシェル。クライマーや登山家のためにデザイン。",
    image: "/images/background.png",
    price: "$799",
    colors: ["Black", "Red", "Blue", "Green"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    features: [
      "Most durable GORE-TEX PRO with rugged 100D face fabric",
      "Helmet-compatible StormHood™",
      "WaterTight™ pit zips for ventilation",
      "Harness-compatible pockets",
      "Articulated patterning for unrestricted mobility",
    ],
  },
  {
    id: "beta-ar",
    category: "jackets",
    title: "BETA AR JACKET",
    subtitle: "ベータ AR ジャケット",
    description: "Versatile, durable GORE-TEX PRO shell for all-round mountain use in varying conditions.",
    jpDescription: "様々な条件下での全天候型マウンテンユース向けの多用途で耐久性の高いゴアテックスプロシェル。",
    image: "/images/background.png",
    price: "$599",
    colors: ["Black", "Red", "Blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: [
      "GORE-TEX PRO with 80D face fabric",
      "Helmet-compatible DropHood™",
      "WaterTight™ pit zips for ventilation",
      "Hand pockets positioned for harness compatibility",
      "Articulated patterning for unrestricted mobility",
    ],
  },
  {
    id: "beta-ar-pant",
    category: "pants",
    title: "BETA AR PANT",
    subtitle: "ベータ AR パンツ",
    description: "Versatile, durable GORE-TEX PRO pants for all-round mountain use.",
    jpDescription: "オールラウンドなマウンテンユース向けの多用途で耐久性の高いゴアテックスプロパンツ。",
    image: "/images/background.png",
    price: "$499",
    colors: ["Black", "Gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: [
      "GORE-TEX PRO with 80D face fabric",
      "Full-length side zips for ventilation and easy on/off",
      "Keprotec™ instep patches protect against crampons",
      "Integrated belt with metal buckle",
      "Articulated patterning for unrestricted mobility",
    ],
  },
  {
    id: "alpha-ar-35",
    category: "backpacks",
    title: "ALPHA AR 35 BACKPACK",
    subtitle: "アルファ AR 35 バックパック",
    description: "Durable, weather-resistant alpine climbing pack with essential features.",
    jpDescription: "耐久性と耐候性を備え、必要な機能を搭載したアルパインクライミング用バックパック。",
    image: "/images/background.png",
    price: "$229",
    colors: ["Black", "Blue"],
    features: [
      "N400r-AC² nylon fabric is highly abrasion resistant",
      "WaterTight™ construction for weather protection",
      "Top-loading design with drawcord closure",
      "Removable framesheet and aluminum stay",
      "Ice tool attachments and rope carry system",
    ],
  },
]

const categories = [
  { id: "all", label: "ALL PRODUCTS", jpLabel: "すべての製品" },
  { id: "jackets", label: "JACKETS", jpLabel: "ジャケット" },
  { id: "pants", label: "PANTS", jpLabel: "パンツ" },
  { id: "backpacks", label: "BACKPACKS", jpLabel: "バックパック" },
]

export default function ProductSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(products[0])

  const filteredProducts =
    activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory)

  const openProductModal = (product: (typeof products)[0]) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveCategory(newValue)
  }

  return (
    <Box width="100%" bgcolor="black" color="white" py={8} px={{ xs: 2, md: 4 }}>
      <Box maxWidth="1920px" mx="auto">
        {/* Heading */}
        <Box mb={6}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            ENGINEERED DESIGN
          </Typography>
          <Typography variant="subtitle1" color="gray">
            エンジニアリングされたデザイン
          </Typography>
          <Typography variant="body1" color="gray" mt={2} maxWidth="600px">
            Every Arc'teryx product is a solution to a specific challenge, designed with purpose and built without
            compromise.
          </Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeCategory}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ mb: 4 }}
        >
          {categories.map((category) => (
            <TabSection
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              className="font-display"
            >
              {category.label}
              <span className="block text-xs text-gray-500">{category.jpLabel}</span>
            </TabSection>
          ))}
        </Tabs>

        {/* Product Grid */}
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} md={6} lg={4} key={product.id}>
              <Card
                sx={{
                  bgcolor: "#1e1e1e",
                  color: "white",
                  "&:hover img": { transform: "scale(1.05)" },
                }}
              >
                <Box position="relative" overflow="hidden" onClick={() => openProductModal(product)} sx={{ cursor: "pointer" }}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={product.image || "/placeholder.svg"}
                    alt={product.title}
                    sx={{ transition: "transform 0.3s ease" }}
                  />
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      bgcolor: "rgba(0, 0, 0, 0)",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        bgcolor: "rgba(0, 0, 0, 0.4)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: "rgba(0, 0, 0, 0.8)",
                        px: 3,
                        py: 1,
                        fontWeight: "bold",
                        transform: "translateY(100%)",
                        transition: "transform 0.3s",
                        ".MuiCard-root:hover &": {
                          transform: "translateY(0)",
                        },
                      }}
                    >
                      VIEW DETAILS
                    </Box>
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {product.title}
                  </Typography>
                  <Typography variant="subtitle2" color="gray">
                    {product.subtitle}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    {product.description}
                  </Typography>
                  <Typography variant="caption" color="gray">
                    {product.jpDescription}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                  <Typography variant="body1">{product.price}</Typography>
                  <Button variant="contained" color="inherit" onClick={() => openProductModal(product)}>
                    VIEW DETAILS
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* View All Products */}
        <Box mt={8} textAlign="center">
          <Button variant="contained" color="inherit" size="large">
            VIEW ALL PRODUCTS
          </Button>
        </Box>

        {/* Product Modal */}
        <ProductDetailModal isOpen={modalOpen} onClose={() => setModalOpen(false)} product={selectedProduct} />
      </Box>
    </Box>
  )
}