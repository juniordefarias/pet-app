"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Calendar, Clock, MapPin, FileText } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

const mockAppointmentHistory = [
  {
    id: 1,
    petId: 3,
    petName: "Max",
    petImage: "/max-golden-retriever.png",
    type: "Consulta",
    service: "Consulta de Rotina",
    date: "2024-01-15",
    time: "14:30",
    veterinarian: "Dr. Ana Silva",
    clinic: "Clínica VetCare",
    status: "Concluído",
    notes: "Exame geral realizado. Pet saudável, peso ideal. Recomendada continuidade da ração atual.",
    cost: "R$ 120,00",
  },
  {
    id: 2,
    petId: 1,
    petName: "Luna",
    petImage: "/luna-gray-kitten.png",
    type: "Vacina",
    service: "Vacina V4 Felina",
    date: "2024-01-10",
    time: "10:00",
    veterinarian: "Dr. Carlos Mendes",
    clinic: "Pet Hospital Central",
    status: "Concluído",
    notes: "Primeira dose da vacina V4 aplicada. Próxima dose em 30 dias. Pet reagiu bem.",
    cost: "R$ 80,00",
  },
  {
    id: 3,
    petId: 4,
    petName: "Charlie",
    petImage: "/charlie-pomeranian.png",
    type: "Tratamento",
    service: "Limpeza Dental",
    date: "2024-01-08",
    time: "09:00",
    veterinarian: "Dr. Marina Costa",
    clinic: "Clínica VetCare",
    status: "Concluído",
    notes: "Limpeza dental completa realizada. Removido tártaro. Recomendada escovação diária.",
    cost: "R$ 250,00",
  },
  {
    id: 4,
    petId: 2,
    petName: "Mimi",
    petImage: "/mimi-calico-cat.png",
    type: "Consulta",
    service: "Consulta Dermatológica",
    date: "2024-01-05",
    time: "16:00",
    veterinarian: "Dr. Roberto Lima",
    clinic: "Derma Pet Especializada",
    status: "Concluído",
    notes: "Tratamento para dermatite alérgica. Prescrito shampoo medicinal e antialérgico.",
    cost: "R$ 180,00",
  },
  {
    id: 5,
    petId: 3,
    petName: "Max",
    petImage: "/max-golden-retriever.png",
    type: "Vacina",
    service: "Vacina Antirrábica",
    date: "2023-12-20",
    time: "11:30",
    veterinarian: "Dr. Ana Silva",
    clinic: "Clínica VetCare",
    status: "Concluído",
    notes: "Vacina antirrábica anual aplicada. Certificado emitido. Próxima dose em 12 meses.",
    cost: "R$ 60,00",
  },
  {
    id: 6,
    petId: 1,
    petName: "Luna",
    petImage: "/luna-gray-kitten.png",
    type: "Tratamento",
    service: "Vermifugação",
    date: "2023-12-15",
    time: "15:00",
    veterinarian: "Dr. Carlos Mendes",
    clinic: "Pet Hospital Central",
    status: "Concluído",
    notes: "Vermífugo administrado. Recomendado repetir em 3 meses. Pet tolerou bem o medicamento.",
    cost: "R$ 45,00",
  },
]

export default function AppointmentHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterPet, setFilterPet] = useState("all")

  // Filter appointments based on search and filters
  const filteredAppointments = mockAppointmentHistory.filter((appointment) => {
    const matchesSearch =
      appointment.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.veterinarian.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || appointment.type === filterType
    const matchesPet = filterPet === "all" || appointment.petName === filterPet

    return matchesSearch && matchesType && matchesPet
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Consulta":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300"
      case "Vacina":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300"
      case "Tratamento":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  const uniquePets = [...new Set(mockAppointmentHistory.map((apt) => apt.petName))]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border/50 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/calendar">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Histórico de Consultas
            </h1>
            <p className="text-sm text-muted-foreground">Consultas e tratamentos realizados</p>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-card rounded-lg border border-border/50 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por pet, serviço ou veterinário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="Consulta">Consultas</SelectItem>
                <SelectItem value="Vacina">Vacinas</SelectItem>
                <SelectItem value="Tratamento">Tratamentos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPet} onValueChange={setFilterPet}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por pet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os pets</SelectItem>
                {uniquePets.map((pet) => (
                  <SelectItem key={pet} value={pet}>
                    {pet}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Appointment History List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum agendamento encontrado</h3>
                <p className="text-muted-foreground">Tente ajustar os filtros ou fazer uma nova busca.</p>
              </CardContent>
            </Card>
          ) : (
            filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-border/50 hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={appointment.petImage || "/placeholder.svg"}
                        alt={appointment.petName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-lg text-foreground">{appointment.service}</CardTitle>
                        <p className="text-sm text-muted-foreground">{appointment.petName}</p>
                      </div>
                    </div>
                    <Badge className={getTypeColor(appointment.type)}>{appointment.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(appointment.date).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{appointment.clinic}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="font-medium">Dr(a). {appointment.veterinarian}</span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="bg-background rounded-lg p-3 border border-border/50">
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">Observações:</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{appointment.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-lg font-semibold text-foreground">{appointment.cost}</span>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Navigation />
    </div>
  )
}
