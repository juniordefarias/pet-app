"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Plus, Search, Filter, Camera, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for community posts
const communityPosts = [
  {
    id: 1,
    user: {
      name: "Maria Silva",
      avatar: "/woman-brown-hair.png",
      location: "São Paulo, SP",
    },
    pet: {
      name: "Luna",
      type: "Gato",
      image: "/gray-cat.jpg",
    },
    content:
      "Luna finalmente se adaptou à nova casa! Depois de 2 semanas se escondendo, hoje ela veio brincar comigo. Que alegria! 🥰",
    image: "/gray-cat.jpg",
    category: "Experiência",
    likes: 24,
    comments: 8,
    timeAgo: "2h",
    isLiked: false,
  },
  {
    id: 2,
    user: {
      name: "João Santos",
      avatar: "/bearded-man-portrait.png",
      location: "Rio de Janeiro, RJ",
    },
    pet: {
      name: "Max",
      type: "Cão",
      image: "/golden-retriever.png",
    },
    content:
      "Dica importante: sempre escovem os dentes dos seus pets! Max adora a escova de dente especial que compramos. A saúde bucal é fundamental! 🦷",
    category: "Dica",
    likes: 45,
    comments: 12,
    timeAgo: "4h",
    isLiked: true,
  },
  {
    id: 3,
    user: {
      name: "Ana Costa",
      avatar: "/curly-haired-woman.png",
      location: "Belo Horizonte, MG",
    },
    pet: {
      name: "Bella",
      type: "Cão",
      image: "/white-dog.jpg",
    },
    content:
      "Alguém mais tem problemas com ansiedade de separação? Bella fica muito estressada quando saio para trabalhar. Preciso de ajuda! 😢",
    image: "/white-dog.jpg",
    category: "Apoio",
    likes: 18,
    comments: 15,
    timeAgo: "6h",
    isLiked: false,
  },
  {
    id: 4,
    user: {
      name: "Carlos Oliveira",
      avatar: "/thoughtful-man-glasses.png",
      location: "Porto Alegre, RS",
    },
    pet: {
      name: "Thor",
      type: "Cão",
      image: "/majestic-german-shepherd.png",
    },
    content: "Thor completou 3 anos hoje! Fizemos uma festa com direito a bolo especial para cães. Ele amou! 🎂🎉",
    image: "/majestic-german-shepherd.png",
    category: "Momento Especial",
    likes: 67,
    comments: 23,
    timeAgo: "8h",
    isLiked: true,
  },
  {
    id: 5,
    user: {
      name: "Fernanda Lima",
      avatar: "/long-haired-woman.png",
      location: "Brasília, DF",
    },
    pet: {
      name: "Mimi",
      type: "Gato",
      image: "/fluffy-persian-cat.png",
    },
    content:
      "Receita caseira de petisco que a Mimi adora: misture frango desfiado com batata doce cozida e um pouquinho de cenoura. Congelem em forminhas de gelo! ❄️",
    category: "Receita",
    likes: 89,
    comments: 31,
    timeAgo: "1d",
    isLiked: false,
  },
]

const categories = ["Todos", "Experiência", "Dica", "Apoio", "Momento Especial", "Receita"]

export default function ComunidadePage() {
  const [posts, setPosts] = useState(communityPosts)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [newPost, setNewPost] = useState({
    content: "",
    category: "",
    image: null as File | null,
  })

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
          : post,
      ),
    )
  }

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.pet.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryColor = (category: string) => {
    const colors = {
      Experiência: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Dica: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Apoio: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Momento Especial": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      Receita: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Comunidade Pet</h1>
              <p className="text-sm text-muted-foreground">Conecte-se com outros tutores</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Compartilhar na Comunidade</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="content">O que você quer compartilhar?</Label>
                    <Textarea
                      id="content"
                      placeholder="Conte sua experiência, dê uma dica ou peça ajuda..."
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={newPost.category}
                      onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="image">Adicionar foto</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Escolher foto
                      </Button>
                      <span className="text-sm text-muted-foreground">Opcional</span>
                    </div>
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Publicar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar posts, pessoas ou pets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                    <AvatarFallback>
                      {post.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{post.user.name}</h3>
                      <Badge variant="secondary" className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{post.user.location}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{post.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-foreground mb-3 leading-relaxed">{post.content}</p>

              {post.image && (
                <div className="rounded-lg overflow-hidden mb-4">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={`Foto de ${post.pet.name}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`gap-2 ${post.isLiked ? "text-red-500" : "text-muted-foreground"}`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                    <span className="text-xs">{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{post.comments}</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
