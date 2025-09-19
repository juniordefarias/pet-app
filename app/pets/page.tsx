"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, User, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data for pets
const mockPets = [
  {
    id: 1,
    name: "Luna",
    type: "Gato",
    breed: "British Shorthair",
    age: "6 meses",
    image: "/luna-gray-kitten.png",
  },
  {
    id: 2,
    name: "Mimi",
    type: "Gato",
    breed: "Calico",
    age: "3 anos",
    image: "/mimi-calico-cat.png",
  },
  {
    id: 3,
    name: "Max",
    type: "Cachorro",
    breed: "Golden Retriever",
    age: "8 meses",
    image: "/max-golden-retriever.png",
  },
  {
    id: 4,
    name: "Charlie",
    type: "Cachorro",
    breed: "Pomeranian",
    age: "2 anos",
    image: "/charlie-pomeranian.png",
  },
]

export default function PetSelectionPage() {
  const [selectedPet, setSelectedPet] = useState<number | null>(null)
  const router = useRouter()

  const handlePetClick = (petId: number) => {
    router.push(`/pets/${petId}`)
  }

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Meus Pets</h1>
            <p className="text-sm text-muted-foreground">Selecione um pet para ver suas informações</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Pet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockPets.map((pet) => (
            <Card
              key={pet.id}
              className="cursor-pointer border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-200 group"
              onClick={() => handlePetClick(pet.id)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={pet.image || "/placeholder.svg"}
                    alt={`Foto de ${pet.name}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{pet.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{pet.breed}</p>
                  <p className="text-xs text-muted-foreground">{pet.age}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add Pet Card */}
          <Link href="/pets/add">
            <Card className="cursor-pointer border-2 border-dashed border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group">
              <CardContent className="p-0">
                <div className="h-48 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Plus className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Adicionar Pet</h3>
                    <p className="text-sm text-muted-foreground">Cadastre um novo pet</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-lg border border-border/50 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/calendar">
              <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
                <div className="text-left">
                  <div className="font-medium">Ver Calendário</div>
                  <div className="text-sm text-muted-foreground">Próximos agendamentos</div>
                </div>
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
              <div className="text-left">
                <div className="font-medium">Adicionar Vacina</div>
                <div className="text-sm text-muted-foreground">Registrar nova vacina</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-card rounded-lg border border-border/50 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Atividade Recente</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Vacina antirrábica aplicada em Max</p>
                <p className="text-xs text-muted-foreground">Há 2 dias</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Consulta agendada para Luna</p>
                <p className="text-xs text-muted-foreground">Há 1 semana</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
