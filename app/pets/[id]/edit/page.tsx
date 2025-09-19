"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"

// Mock data for pets
const mockPets = [
  {
    id: 1,
    name: "Luna",
    type: "Gato",
    breed: "British Shorthair",
    age: "6 meses",
    weight: "2.5kg",
    color: "Cinza",
    gender: "Fêmea",
    birthDate: "2024-06-15",
    microchip: "123456789012345",
    isVaccinated: true,
    isNeutered: false,
    allergies: "Nenhuma alergia conhecida",
    medications: "",
    image: "/luna-gray-kitten.png",
    notes: "Muito brincalhona e carinhosa",
  },
  {
    id: 2,
    name: "Mimi",
    type: "Gato",
    breed: "Calico",
    age: "3 anos",
    weight: "4kg",
    color: "Tricolor",
    gender: "Fêmea",
    birthDate: "2021-03-10",
    microchip: "987654321098765",
    isVaccinated: true,
    isNeutered: true,
    allergies: "",
    medications: "Suplemento vitamínico",
    image: "/mimi-calico-cat.png",
    notes: "Gosta de ficar no sol",
  },
  {
    id: 3,
    name: "Max",
    type: "Cachorro",
    breed: "Golden Retriever",
    age: "8 meses",
    weight: "15kg",
    color: "Dourado",
    gender: "Macho",
    birthDate: "2024-04-20",
    microchip: "456789123456789",
    isVaccinated: true,
    isNeutered: false,
    allergies: "Alergia a frango",
    medications: "",
    image: "/max-golden-retriever.png",
    notes: "Muito energético e amigável",
  },
  {
    id: 4,
    name: "Charlie",
    type: "Cachorro",
    breed: "Pomeranian",
    age: "2 anos",
    weight: "3kg",
    color: "Creme",
    gender: "Macho",
    birthDate: "2022-08-05",
    microchip: "789123456789123",
    isVaccinated: true,
    isNeutered: true,
    allergies: "",
    medications: "Medicamento para articulação",
    image: "/charlie-pomeranian.png",
    notes: "Pequeno mas corajoso",
  },
]

export default function EditPetPage() {
  const router = useRouter()
  const params = useParams()
  const petId = Number.parseInt(params.id as string)

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    breed: "",
    age: "",
    weight: "",
    color: "",
    gender: "",
    birthDate: "",
    microchip: "",
    isVaccinated: false,
    isNeutered: false,
    allergies: "",
    medications: "",
    notes: "",
  })

  useEffect(() => {
    const pet = mockPets.find((p) => p.id === petId)
    if (pet) {
      setFormData({
        name: pet.name,
        type: pet.type,
        breed: pet.breed,
        age: pet.age,
        weight: pet.weight || "",
        color: pet.color || "",
        gender: pet.gender || "",
        birthDate: pet.birthDate || "",
        microchip: pet.microchip || "",
        isVaccinated: pet.isVaccinated || false,
        isNeutered: pet.isNeutered || false,
        allergies: pet.allergies || "",
        medications: pet.medications || "",
        notes: pet.notes || "",
      })
    }
  }, [petId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updating pet:", formData)
    router.push(`/pets/${petId}`)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const pet = mockPets.find((p) => p.id === petId)
  if (!pet) {
    return <div>Pet não encontrado</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href={`/pets/${petId}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Editar {pet.name}</h1>
            <p className="text-sm text-muted-foreground">Atualize as informações do pet</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Photo */}
          <Card>
            <CardHeader>
              <CardTitle>Foto Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img
                  src={pet.image || "/placeholder.svg"}
                  alt={pet.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Clique para alterar foto</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Pet *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Ex: Luna"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Tipo *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cachorro">Cachorro</SelectItem>
                      <SelectItem value="Gato">Gato</SelectItem>
                      <SelectItem value="Pássaro">Pássaro</SelectItem>
                      <SelectItem value="Coelho">Coelho</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="breed">Raça</Label>
                  <Input
                    id="breed"
                    value={formData.breed}
                    onChange={(e) => handleInputChange("breed", e.target.value)}
                    placeholder="Ex: Golden Retriever"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Sexo</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Macho">Macho</SelectItem>
                      <SelectItem value="Fêmea">Fêmea</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Ex: 2 anos"
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange("birthDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Peso</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder="Ex: 15kg"
                  />
                </div>
                <div>
                  <Label htmlFor="color">Cor</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    placeholder="Ex: Dourado"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="microchip">Número do Microchip</Label>
                <Input
                  id="microchip"
                  value={formData.microchip}
                  onChange={(e) => handleInputChange("microchip", e.target.value)}
                  placeholder="Ex: 123456789012345"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isVaccinated"
                    checked={formData.isVaccinated}
                    onCheckedChange={(checked) => handleInputChange("isVaccinated", checked as boolean)}
                  />
                  <Label htmlFor="isVaccinated">Vacinado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isNeutered"
                    checked={formData.isNeutered}
                    onCheckedChange={(checked) => handleInputChange("isNeutered", checked as boolean)}
                  />
                  <Label htmlFor="isNeutered">Castrado</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações Médicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="allergies">Alergias</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  placeholder="Descreva alergias conhecidas..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="medications">Medicamentos em Uso</Label>
                <Textarea
                  id="medications"
                  value={formData.medications}
                  onChange={(e) => handleInputChange("medications", e.target.value)}
                  placeholder="Liste medicamentos atuais..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="notes">Observações Gerais</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Informações adicionais sobre o pet..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => router.push(`/pets/${petId}`)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
