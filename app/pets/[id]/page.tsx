"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft, Calendar, Sparkles, Syringe, Heart, Weight, Ruler, Edit, Trash2, History } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"

const mockPetData = {
  1: {
    id: 1,
    name: "Luna",
    type: "Gato",
    breed: "British Shorthair",
    age: "6 meses",
    weight: "2.1 kg",
    image: "/luna-gray-kitten.png",
    vaccines: [
      { name: "Tríplice Felina", date: "15/03/2024", status: "Em dia" },
      { name: "Leucemia Felina", date: "10/02/2024", status: "Em dia" },
      { name: "Antirrábica", date: "05/01/2024", status: "Vencendo" },
    ],
    treatments: [
      { name: "Vermifugação", date: "20/03/2024", status: "Concluído" },
      { name: "Antipulgas", date: "15/03/2024", status: "Ativo" },
    ],
  },
  2: {
    id: 2,
    name: "Mimi",
    type: "Gato",
    breed: "Calico",
    age: "3 anos",
    weight: "4.8 kg",
    image: "/mimi-calico-cat.png",
    vaccines: [
      { name: "Antirrábica", date: "20/03/2024", status: "Em dia" },
      { name: "Tríplice Felina", date: "18/03/2024", status: "Em dia" },
      { name: "Leucemia Felina", date: "15/02/2024", status: "Em dia" },
    ],
    treatments: [
      { name: "Vermifugação", date: "25/03/2024", status: "Concluído" },
      { name: "Antipulgas", date: "20/03/2024", status: "Ativo" },
    ],
  },
  3: {
    id: 3,
    name: "Max",
    type: "Cachorro",
    breed: "Golden Retriever",
    age: "8 meses",
    weight: "15.2 kg",
    image: "/max-golden-retriever.png",
    vaccines: [
      { name: "V8", date: "10/03/2024", status: "Em dia" },
      { name: "Antirrábica", date: "05/03/2024", status: "Em dia" },
      { name: "Gripe Canina", date: "01/03/2024", status: "Em dia" },
    ],
    treatments: [
      { name: "Vermifugação", date: "12/03/2024", status: "Concluído" },
      { name: "Antipulgas", date: "08/03/2024", status: "Ativo" },
    ],
  },
  4: {
    id: 4,
    name: "Charlie",
    type: "Cachorro",
    breed: "Pomeranian",
    age: "2 anos",
    weight: "3.5 kg",
    image: "/charlie-pomeranian.png",
    vaccines: [
      { name: "V10", date: "18/03/2024", status: "Em dia" },
      { name: "Antirrábica", date: "15/03/2024", status: "Em dia" },
      { name: "Gripe Canina", date: "10/03/2024", status: "Em dia" },
    ],
    treatments: [
      { name: "Vermifugação", date: "22/03/2024", status: "Concluído" },
      { name: "Carrapaticida", date: "18/03/2024", status: "Ativo" },
    ],
  },
}

export default function PetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const petId = Number.parseInt(params.id as string)
  const pet = mockPetData[petId as keyof typeof mockPetData]

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  if (!pet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Pet não encontrado</h1>
          <Link href="/pets">
            <Button>Voltar aos Pets</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDeletePet = () => {
    console.log(`Deleting pet ${pet.name} with ID ${pet.id}`)
    // In a real app, this would call an API to delete the pet
    setShowDeleteDialog(false)
    router.push("/pets")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em dia":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300"
      case "Vencendo":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Ativo":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300"
      case "Concluído":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border/50 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">{pet.name}</h1>
              <p className="text-sm text-muted-foreground">
                {pet.breed} • {pet.age}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/pets/${pet.id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
            </Link>
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 bg-transparent"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Excluir {pet.name}?</DialogTitle>
                  <DialogDescription>
                    Esta ação não pode ser desfeita. Todos os dados de {pet.name}, incluindo histórico de vacinas e
                    consultas, serão permanentemente removidos.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                    Cancelar
                  </Button>
                  <Button variant="destructive" onClick={handleDeletePet}>
                    Excluir Pet
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Pet Photo and Basic Info */}
        <Card className="border-border/50">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={pet.image || "/placeholder.svg"}
                alt={`Foto de ${pet.name}`}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-lg" />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold">{pet.name}</h2>
                <p className="text-sm opacity-90">{pet.breed}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{pet.age}</p>
                  <p className="text-xs text-muted-foreground">Idade</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <Weight className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{pet.weight}</p>
                  <p className="text-xs text-muted-foreground">Peso</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                    <Ruler className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{pet.type}</p>
                  <p className="text-xs text-muted-foreground">Espécie</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vaccines Section */}
        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Syringe className="w-5 h-5 text-primary" />
              Vacinas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pet.vaccines.map((vaccine, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{vaccine.name}</p>
                  <p className="text-sm text-muted-foreground">Aplicada em {vaccine.date}</p>
                </div>
                <Badge className={getStatusColor(vaccine.status)}>{vaccine.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Treatments Section */}
        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Heart className="w-5 h-5 text-primary" />
              Tratamentos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pet.treatments.map((treatment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{treatment.name}</p>
                  <p className="text-sm text-muted-foreground">Realizado em {treatment.date}</p>
                </div>
                <Badge className={getStatusColor(treatment.status)}>{treatment.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/calendar">
            <Button variant="outline" className="w-full h-auto p-4 bg-card">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Agendar Consulta</div>
                  <div className="text-sm text-muted-foreground">Marcar nova consulta</div>
                </div>
              </div>
            </Button>
          </Link>
          <Link href={`/ai-suggestions/${pet.id}`}>
            <Button className="w-full h-auto p-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Sugestões da IA</div>
                  <div className="text-sm opacity-90">Recomendações personalizadas</div>
                </div>
              </div>
            </Button>
          </Link>
          <Link href="/appointments/history">
            <Button variant="outline" className="w-full h-auto p-4 bg-card">
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium">Histórico</div>
                  <div className="text-sm text-muted-foreground">Ver consultas anteriores</div>
                </div>
              </div>
            </Button>
          </Link>
        </div>
      </main>

      <Navigation />
    </div>
  )
}
