"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

const mockEvents = [
  {
    id: 1,
    petName: "Luna",
    petImage: "/gray-cat.jpg",
    type: "Consulta",
    title: "Consulta de Rotina",
    date: "2024-04-15",
    time: "14:30",
    location: "Clínica VetCare",
    status: "agendado",
  },
  {
    id: 2,
    petName: "Max",
    petImage: "/golden-retriever.png",
    type: "Vacina",
    title: "Vacina Antirrábica",
    date: "2024-04-18",
    time: "10:00",
    location: "Pet Shop Central",
    status: "agendado",
  },
  {
    id: 3,
    petName: "Bella",
    petImage: "/white-dog.jpg",
    type: "Exame",
    title: "Exame de Sangue",
    date: "2024-04-20",
    time: "16:00",
    location: "Clínica Animal+",
    status: "agendado",
  },
  {
    id: 4,
    petName: "Luna",
    petImage: "/gray-cat.jpg",
    type: "Vacina",
    title: "Vacina Leucemia Felina",
    date: "2024-04-25",
    time: "11:30",
    location: "Clínica VetCare",
    status: "pendente",
  },
  {
    id: 5,
    petName: "Rex",
    petImage: "/majestic-german-shepherd.png",
    type: "Vacina",
    title: "Vacina V10 (Múltipla)",
    date: "2024-04-28",
    time: "09:00",
    location: "Hospital Veterinário São Paulo",
    status: "agendado",
  },
  {
    id: 6,
    petName: "Mimi",
    petImage: "/fluffy-persian-cat.png",
    type: "Exame",
    title: "Ultrassom Abdominal",
    date: "2024-05-02",
    time: "15:30",
    location: "Centro Diagnóstico Pet",
    status: "agendado",
  },
  {
    id: 7,
    petName: "Max",
    petImage: "/golden-retriever.png",
    type: "Vacina",
    title: "Reforço Gripe Canina",
    date: "2024-05-05",
    time: "14:00",
    location: "Pet Shop Central",
    status: "pendente",
  },
  {
    id: 8,
    petName: "Bella",
    petImage: "/white-dog.jpg",
    type: "Exame",
    title: "Raio-X Tórax",
    date: "2024-05-08",
    time: "10:30",
    location: "Clínica Animal+",
    status: "agendado",
  },
  {
    id: 9,
    petName: "Rex",
    petImage: "/majestic-german-shepherd.png",
    type: "Exame",
    title: "Exame Cardiológico",
    date: "2024-05-12",
    time: "16:45",
    location: "CardioVet Especialidades",
    status: "agendado",
  },
  {
    id: 10,
    petName: "Luna",
    petImage: "/gray-cat.jpg",
    type: "Vacina",
    title: "Vacina Tríplice Felina",
    date: "2024-05-15",
    time: "11:00",
    location: "Clínica VetCare",
    status: "pendente",
  },
]

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Generate calendar days
  const calendarDays = []

  // Empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const getEventsForDate = (dateStr: string) => {
    return mockEvents.filter((event) => event.date === dateStr)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Consulta":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
      case "Vacina":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
      case "Exame":
        return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800"
      case "Tratamento":
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "agendado":
        return "bg-green-100 text-green-800 border-green-200"
      case "pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const upcomingEvents = mockEvents
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border/50 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Calendário
            </h1>
            <p className="text-sm text-muted-foreground">Gerencie os agendamentos dos seus pets</p>
          </div>
          <Link href="/calendar/new">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Novo
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Calendar Widget */}
        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">
                {months[currentMonth]} {currentYear}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={index} className="p-2 h-12" />
                }

                const dateStr = formatDate(currentYear, currentMonth, day)
                const events = getEventsForDate(dateStr)
                const isToday = dateStr === new Date().toISOString().split("T")[0]

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-2 h-12 text-sm rounded-lg border transition-colors relative ${
                      isToday
                        ? "bg-primary text-primary-foreground border-primary"
                        : selectedDate === dateStr
                          ? "bg-primary/10 border-primary/50 text-foreground"
                          : "border-transparent hover:bg-muted text-foreground"
                    }`}
                  >
                    {day}
                    {events.length > 0 && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground">Próximos Agendamentos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border/50"
              >
                <img
                  src={event.petImage || "/placeholder.svg"}
                  alt={event.petName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground">{event.title}</h3>
                    <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Para {event.petName}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(event.date).toLocaleDateString("pt-BR")} às {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Selected Date Events */}
        {selectedDate && (
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-foreground">
                Agendamentos para {new Date(selectedDate).toLocaleDateString("pt-BR")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getEventsForDate(selectedDate).length > 0 ? (
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-3 bg-background rounded-lg">
                      <img
                        src={event.petImage || "/placeholder.svg"}
                        alt={event.petName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">{event.title}</h4>
                          <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {event.petName} • {event.time} • {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Nenhum agendamento para esta data</p>
                  <Link href="/calendar/new">
                    <Button variant="outline" className="mt-4 bg-transparent">
                      Criar Agendamento
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>

      <Navigation />
    </div>
  )
}
