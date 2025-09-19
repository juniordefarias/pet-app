"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search, Star, Heart, Package, Pill, Bone } from "lucide-react"

const products = [
  // Rações
  {
    id: 1,
    name: "Gran Plus Choice Adulto Frango & Carne",
    category: "racao",
    price: 89.9,
    originalPrice: 109.9,
    image: "/products/gran-plus-choice-1.png",
    rating: 4.8,
    reviews: 156,
    description: "Ração premium para cães adultos com frango e carne",
    brand: "Gran Plus",
    weight: "15kg",
    inStock: true,
  },
  {
    id: 2,
    name: "Gran Plus Choice Adulto Carne",
    category: "racao",
    price: 92.9,
    originalPrice: 115.9,
    image: "/products/gran-plus-choice-2.png",
    rating: 4.7,
    reviews: 89,
    description: "Ração premium para cães adultos sabor carne",
    brand: "Gran Plus",
    weight: "15kg",
    inStock: true,
  },
  {
    id: 3,
    name: "Gran Plus Choice Premium",
    category: "racao",
    price: 95.9,
    originalPrice: 119.9,
    image: "/products/gran-plus-choice-3.png",
    rating: 4.9,
    reviews: 203,
    description: "Ração super premium para cães adultos",
    brand: "Gran Plus",
    weight: "15kg",
    inStock: true,
  },
  {
    id: 4,
    name: "Ração para Gatos Filhotes",
    category: "racao",
    price: 45.9,
    originalPrice: 59.9,
    image: "/products/kitten-gray.png",
    rating: 4.6,
    reviews: 78,
    description: "Ração especial para gatos filhotes até 12 meses",
    brand: "Premium Cat",
    weight: "3kg",
    inStock: true,
  },
  // Medicamentos
  {
    id: 5,
    name: "Vermífugo Drontal Plus",
    category: "medicamento",
    price: 28.9,
    originalPrice: 35.9,
    image: "/vermifugo-drontal-plus-medicamento.jpg",
    rating: 4.8,
    reviews: 145,
    description: "Vermífugo para cães de 10kg a 35kg - 2 comprimidos",
    brand: "Bayer",
    weight: "2 comp.",
    inStock: true,
  },
  {
    id: 6,
    name: "Antipulgas Bravecto",
    category: "medicamento",
    price: 89.9,
    originalPrice: 109.9,
    image: "/bravecto-antipulgas-medicamento.jpg",
    rating: 4.9,
    reviews: 234,
    description: "Proteção contra pulgas e carrapatos por 12 semanas",
    brand: "MSD",
    weight: "1 comp.",
    inStock: true,
  },
  {
    id: 7,
    name: "Shampoo Medicinal Virbac",
    category: "medicamento",
    price: 42.9,
    originalPrice: 52.9,
    image: "/shampoo-medicinal-virbac.jpg",
    rating: 4.5,
    reviews: 67,
    description: "Shampoo terapêutico para problemas de pele",
    brand: "Virbac",
    weight: "200ml",
    inStock: false,
  },
  // Acessórios
  {
    id: 8,
    name: "Cama Ortopédica Premium",
    category: "acessorio",
    price: 159.9,
    originalPrice: 199.9,
    image: "/cama-ortopedica-cachorro-premium.jpg",
    rating: 4.7,
    reviews: 89,
    description: "Cama ortopédica com espuma viscoelástica - Tamanho G",
    brand: "Pet Comfort",
    weight: "Tam. G",
    inStock: true,
  },
  {
    id: 9,
    name: "Coleira Antipulgas Seresto",
    category: "acessorio",
    price: 119.9,
    originalPrice: 149.9,
    image: "/coleira-antipulgas-seresto.jpg",
    rating: 4.8,
    reviews: 178,
    description: "Coleira com proteção por 8 meses contra pulgas e carrapatos",
    brand: "Bayer",
    weight: "Cães grandes",
    inStock: true,
  },
  {
    id: 10,
    name: "Brinquedo Kong Classic",
    category: "acessorio",
    price: 39.9,
    originalPrice: 49.9,
    image: "/brinquedo-kong-classic-cachorro.jpg",
    rating: 4.9,
    reviews: 312,
    description: "Brinquedo resistente para cães de porte médio",
    brand: "Kong",
    weight: "Médio",
    inStock: true,
  },
  {
    id: 11,
    name: "Comedouro Automático",
    category: "acessorio",
    price: 89.9,
    originalPrice: 119.9,
    image: "/comedouro-automatico-pet.jpg",
    rating: 4.4,
    reviews: 56,
    description: "Comedouro automático com timer e porções programáveis",
    brand: "Pet Tech",
    weight: "2L",
    inStock: true,
  },
]

const categories = [
  { id: "all", name: "Todos os Produtos", icon: Package },
  { id: "racao", name: "Rações", icon: Bone },
  { id: "medicamento", name: "Medicamentos", icon: Pill },
  { id: "acessorio", name: "Acessórios", icon: Heart },
]

export default function LojaPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [cart, setCart] = useState<number[]>([])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const addToCart = (productId: number) => {
    setCart((prev) => [...prev, productId])
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.icon : Package
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Loja Pet Shop</h1>
          <p className="text-blue-100">Tudo que seu pet precisa em um só lugar</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nome A-Z</SelectItem>
                <SelectItem value="price-low">Menor Preço</SelectItem>
                <SelectItem value="price-high">Maior Preço</SelectItem>
                <SelectItem value="rating">Melhor Avaliação</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="h-4 w-4" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice > product.price && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  )}
                  {!product.inStock && (
                    <Badge variant="secondary" className="absolute top-2 right-2">
                      Esgotado
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.brand}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-medium mb-2 line-clamp-2">{product.name}</CardTitle>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs ml-1">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews} avaliações)</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600">R$ {product.price.toFixed(2)}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{product.weight}</p>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={() => addToCart(product.id)} disabled={!product.inStock}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Adicionar ao Carrinho" : "Indisponível"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground">Tente ajustar os filtros ou termo de busca</p>
          </div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">{cart.length} itens no carrinho</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
