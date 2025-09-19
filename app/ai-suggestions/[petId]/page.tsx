"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Sparkles, Syringe, Heart, Lightbulb } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"

const mockSuggestions = {
  1: {
    petName: "Luna",
    suggestions: [
      {
        type: "vaccine",
        icon: Syringe,
        title: "Vacina Leucemia Felina Vencendo",
        description:
          "A vacina contra leucemia felina de Luna está próxima do vencimento. Recomendamos agendar a renovação nos próximos 15 dias para manter a proteção.",
        action: "Agendar Vacina",
        priority: "Alta",
        category: "Vacinas",
      },
      {
        type: "treatment",
        icon: Heart,
        title: "Vermifugação Preventiva",
        description:
          "É recomendado fazer a vermifugação de Luna a cada 3 meses. A última foi há 2 meses, então está próximo o momento da próxima dose.",
        action: "Agendar Tratamento",
        priority: "Média",
        category: "Tratamentos",
      },
      {
        type: "tip",
        icon: Lightbulb,
        title: "Escovação Diária para British Shorthair",
        description:
          "Para gatos British Shorthair como Luna, a escovação diária é essencial para evitar nós e reduzir a formação de bolas de pelo.",
        action: "Ver Dicas Detalhadas",
        priority: "Baixa",
        category: "Dicas",
      },
      {
        type: "tip",
        icon: Lightbulb,
        title: "Alimentação Adequada para Filhotes",
        description:
          "Baseado na idade de Luna (6 meses), recomendamos ração premium para filhotes, rica em proteínas, 3-4 porções pequenas por dia.",
        action: "Ver Produtos Recomendados",
        priority: "Média",
        category: "Dicas",
      },
    ],
  },
  2: {
    petName: "Mimi",
    suggestions: [
      {
        type: "vaccine",
        icon: Syringe,
        title: "Reforço da Vacina Antirrábica",
        description:
          "Mimi precisa do reforço anual da vacina antirrábica. A última dose foi há 11 meses, então está no prazo para renovação.",
        action: "Agendar Vacina",
        priority: "Alta",
        category: "Vacinas",
      },
      {
        type: "treatment",
        icon: Heart,
        title: "Limpeza Dental Recomendada",
        description:
          "Gatos adultos como Mimi (3 anos) se beneficiam de limpeza dental profissional anual para prevenir doenças periodontais.",
        action: "Agendar Limpeza",
        priority: "Média",
        category: "Tratamentos",
      },
      {
        type: "tip",
        icon: Lightbulb,
        title: "Cuidados com Gatos Calico",
        description:
          "Gatos calico como Mimi podem ser mais sensíveis ao sol devido às áreas brancas. Mantenha-a em locais com sombra durante o verão.",
        action: "Ver Mais Dicas",
        priority: "Baixa",
        category: "Dicas",
      },
    ],
  },
  3: {
    petName: "Max",
    suggestions: [
      {
        type: "vaccine",
        icon: Syringe,
        title: "Completar Protocolo V10",
        description:
          "Max precisa completar o protocolo de vacinação V10. Falta apenas a última dose para garantir proteção completa contra as principais doenças.",
        action: "Agendar Última Dose",
        priority: "Alta",
        category: "Vacinas",
      },
      {
        type: "treatment",
        icon: Heart,
        title: "Castração Recomendada",
        description:
          "Para cães machos como Max (8 meses), a castração entre 6-12 meses ajuda a prevenir problemas comportamentais e de saúde futuros.",
        action: "Consultar Veterinário",
        priority: "Média",
        category: "Tratamentos",
      },
      {
        type: "tip",
        icon: Lightbulb,
        title: "Exercícios para Golden Retriever",
        description:
          "Golden Retrievers como Max precisam de pelo menos 60-90 minutos de exercício diário. Caminhadas, natação e brincadeiras são ideais.",
        action: "Ver Rotina de Exercícios",
        priority: "Alta",
        category: "Dicas",
      },
      {
        type: "tip",
        icon: Lightbulb,
        title: "Socialização em Filhotes",
        description:
          "É crucial socializar Max com outros cães, pessoas e ambientes diferentes durante esta fase de desenvolvimento (até 1 ano).",
        action: "Ver Dicas de Socialização",
        priority: "Média",
        category: "Dicas",
      },
    ],
  },
  4: {
    petName: "Charlie",
    suggestions: [
      {
        type: "vaccine",
        icon: Syringe,
        title: "Vacina Gripe Canina",
        description:
          "Recomendamos a vacina contra gripe canina para Charlie, especialmente por ser um Pomeranian, raça mais suscetível a problemas respiratórios.",
        action: "Agendar Vacina",
        priority: "Média",
        category: "Vacinas",
      },
      {
        type: "treatment",
        icon: Heart,
        title: "Cuidados com Luxação de Patela",
        description:
          "Pomeranians como Charlie são propensos à luxação de patela. Recomendamos exame ortopédico anual para detecção precoce.",
        action: "Agendar Exame",
        priority: "Média",
        category: "Tratamentos",
      },
      {
        type: "tip",
        icon: Lightbulb,
        title: "Escovação para Pelo Duplo",
        description:
          "O pelo duplo de Charlie requer escovação diária para evitar nós e reduzir a queda excessiva, especialmente durante as mudanças de estação.",
        action: "Ver Técnicas de Escovação",
        priority: "Baixa",
        category: "Dicas",
      },
      {
        type: "tip",
        icon: Lightbulb,
        title: "Controle de Peso em Raças Pequenas",
        description:
          "Pomeranians tendem ao sobrepeso. Mantenha Charlie com 3kg através de porções controladas e exercícios regulares adaptados ao porte.",
        action: "Ver Plano Alimentar",
        priority: "Média",
        category: "Dicas",
      },
    ],
  },
}

export default function AISuggestionsPage() {
  const params = useParams()
  const router = useRouter()
  const petId = Number.parseInt(params.petId as string)
  const data = mockSuggestions[petId as keyof typeof mockSuggestions]

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Sugestões não encontradas</h1>
          <Button onClick={() => router.back()}>Voltar</Button>
        </div>
      </div>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
      case "Média":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800"
      case "Baixa":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vaccine":
        return "text-blue-600 dark:text-blue-400"
      case "treatment":
        return "text-red-600 dark:text-red-400"
      case "tip":
        return "text-green-600 dark:text-green-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const groupedSuggestions = data.suggestions.reduce(
    (acc, suggestion) => {
      if (!acc[suggestion.category]) {
        acc[suggestion.category] = []
      }
      acc[suggestion.category].push(suggestion)
      return acc
    },
    {} as Record<string, typeof data.suggestions>,
  )

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border/50 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-muted-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Sugestões para {data.petName}
            </h1>
            <p className="text-sm text-muted-foreground">Recomendações personalizadas da IA</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {Object.entries(groupedSuggestions).map(([category, suggestions]) => (
          <div key={category}>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              {category === "Vacinas" && <Syringe className="w-5 h-5 text-blue-600" />}
              {category === "Tratamentos" && <Heart className="w-5 h-5 text-red-600" />}
              {category === "Dicas" && <Lightbulb className="w-5 h-5 text-green-600" />}
              {category}
            </h2>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => {
                const Icon = suggestion.icon
                return (
                  <Card key={index} className="border-border/50">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className={`w-5 h-5 ${getTypeColor(suggestion.type)}`} />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-foreground">{suggestion.title}</CardTitle>
                            <Badge className={getPriorityColor(suggestion.priority)}>
                              Prioridade {suggestion.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{suggestion.description}</p>
                      <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                        {suggestion.action}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}

        {/* Generate New Suggestions */}
        <Card className="border-border/50 border-dashed">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Gerar Novas Sugestões</h3>
            <p className="text-muted-foreground mb-4">
              Nossa IA pode gerar recomendações atualizadas baseadas nos dados mais recentes de {data.petName}
            </p>
            <Button>Atualizar Sugestões</Button>
          </CardContent>
        </Card>
      </main>

      <Navigation />
    </div>
  )
}
