"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check, Shield, Heart, Stethoscope, Pill, Scissors, X, Star } from "lucide-react"

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

const plans = [
  {
    id: "basico",
    name: "Plano Básico",
    price: 49.9,
    originalPrice: 69.9,
    popular: false,
    color: "bg-blue-500",
    features: [
      "Consultas veterinárias ilimitadas",
      "Vacinas anuais incluídas",
      "Exames básicos (sangue, urina)",
      "Atendimento 24h emergencial",
      "Desconto 20% em medicamentos",
    ],
    notIncluded: ["Cirurgias", "Internação", "Exames especializados", "Fisioterapia"],
  },
  {
    id: "premium",
    name: "Plano Premium",
    price: 89.9,
    originalPrice: 119.9,
    popular: true,
    color: "bg-green-500",
    features: [
      "Tudo do Plano Básico",
      "Cirurgias de pequeno porte",
      "Internação até 3 dias",
      "Exames de imagem (raio-X, ultrassom)",
      "Desconto 30% em medicamentos",
      "Castração incluída",
      "Limpeza dental anual",
    ],
    notIncluded: ["Cirurgias complexas", "Tratamentos oncológicos", "Fisioterapia prolongada"],
  },
  {
    id: "completo",
    name: "Plano Completo",
    price: 149.9,
    originalPrice: 199.9,
    popular: false,
    color: "bg-purple-500",
    features: [
      "Tudo do Plano Premium",
      "Cirurgias complexas",
      "Internação ilimitada",
      "Tratamentos oncológicos",
      "Fisioterapia e reabilitação",
      "Desconto 40% em medicamentos",
      "Exames especializados",
      "Consultas domiciliares",
      "Pet taxi para emergências",
    ],
    notIncluded: [],
  },
]

export default function PlanosSaudePage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    tutorName: "",
    email: "",
    phone: "",
    selectedPetId: "", // Changed from individual pet fields to selected pet ID
    observations: "",
  })

  const handleContractPlan = (planId: string) => {
    setSelectedPlan(planId)
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedPet = mockPets.find((pet) => pet.id.toString() === formData.selectedPetId)
    console.log("Contratação do plano:", selectedPlan, formData, selectedPet)
    setIsDialogOpen(false)
    // Reset form
    setFormData({
      tutorName: "",
      email: "",
      phone: "",
      selectedPetId: "",
      observations: "",
    })
  }

  const selectedPlanData = plans.find((plan) => plan.id === selectedPlan)
  const selectedPet = mockPets.find((pet) => pet.id.toString() === formData.selectedPetId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Proteção Completa para seu Pet
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Planos de Saúde Pet</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Cuide da saúde do seu melhor amigo com nossos planos completos. Atendimento veterinário de qualidade quando
            você mais precisar.
          </p>
        </div>

        {/* Benefits Banner */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-12 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Atendimento 24h</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Emergências a qualquer hora</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Veterinários Especialistas</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Profissionais qualificados</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Pill className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Medicamentos</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Descontos especiais</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <Scissors className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Cirurgias Incluídas</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Conforme o plano</p>
              </div>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${plan.popular ? "ring-2 ring-green-500 scale-105" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 text-sm font-medium">
                  <Star className="w-4 h-4 inline mr-1" />
                  Mais Popular
                </div>
              )}

              <CardHeader className={plan.popular ? "pt-12" : ""}>
                <div className={`w-16 h-16 ${plan.color} rounded-full flex items-center justify-center mb-4`}>
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-lg">
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                    R$ {plan.price.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    R$ {plan.originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="block text-sm text-gray-600 dark:text-gray-300">por mês</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">✓ Incluído:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.notIncluded.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">✗ Não incluído:</h4>
                    <ul className="space-y-2">
                      {plan.notIncluded.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleContractPlan(plan.id)}
                >
                  Contratar Plano
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-center mb-8">O que nossos clientes dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                "Salvou a vida do meu Max! Atendimento rápido e eficiente."
              </p>
              <p className="font-semibold">Maria Silva</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                "Melhor investimento que fiz para minha Luna. Recomendo!"
              </p>
              <p className="font-semibold">João Santos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                "Veterinários excelentes e preço justo. Muito satisfeita!"
              </p>
              <p className="font-semibold">Ana Costa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contratar {selectedPlanData?.name}</DialogTitle>
            <DialogDescription>Preencha os dados para contratar o plano de saúde para seu pet.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tutorName">Nome do Tutor</Label>
              <Input
                id="tutorName"
                value={formData.tutorName}
                onChange={(e) => setFormData({ ...formData, tutorName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="selectedPet">Selecionar Pet</Label>
              <Select
                value={formData.selectedPetId}
                onValueChange={(value) => setFormData({ ...formData, selectedPetId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um dos seus pets" />
                </SelectTrigger>
                <SelectContent>
                  {mockPets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id.toString()}>
                      <div className="flex items-center gap-2">
                        <img
                          src={pet.image || "/placeholder.svg"}
                          alt={pet.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span>
                          {pet.name} - {pet.breed} ({pet.age})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPet && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPet.image || "/placeholder.svg"}
                    alt={selectedPet.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{selectedPet.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedPet.type} • {selectedPet.breed} • {selectedPet.age}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="observations">Observações</Label>
              <Textarea
                id="observations"
                value={formData.observations}
                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                placeholder="Alguma informação adicional sobre seu pet..."
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={!formData.selectedPetId}>
                Contratar por R$ {selectedPlanData?.price.toFixed(2).replace(".", ",")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
