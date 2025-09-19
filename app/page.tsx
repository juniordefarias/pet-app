import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Shield, Calendar, Sparkles } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl text-balance">
              Cuide do seu pet de forma <span className="text-primary">simples e inteligente</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto text-pretty">
              Gerencie a saúde do seu companheiro de quatro patas com nossa plataforma completa. Agende vacinas,
              acompanhe tratamentos e receba sugestões personalizadas da IA.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/login">
                <Button size="lg" className="px-8 py-3 text-lg">
                  Entrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative px-4 pb-16 mx-auto max-w-4xl">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="/happy-golden-retriever-and-orange-cat-sitting-toge.jpg"
            alt="Pets felizes - cachorro golden retriever e gato laranja"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Tudo que seu pet precisa em um só lugar
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Recursos pensados para facilitar o cuidado com seus animais de estimação
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 text-center border-border/50 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Perfil Completo</h3>
            <p className="text-sm text-muted-foreground text-pretty">
              Mantenha todas as informações dos seus pets organizadas e acessíveis
            </p>
          </Card>

          <Card className="p-6 text-center border-border/50 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Controle de Vacinas</h3>
            <p className="text-sm text-muted-foreground text-pretty">
              Acompanhe o histórico de vacinas e nunca perca uma data importante
            </p>
          </Card>

          <Card className="p-6 text-center border-border/50 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Agendamento</h3>
            <p className="text-sm text-muted-foreground text-pretty">
              Agende consultas e tratamentos com facilidade e receba lembretes
            </p>
          </Card>

          <Card className="p-6 text-center border-border/50 hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sugestões IA</h3>
            <p className="text-sm text-muted-foreground text-pretty">
              Receba recomendações personalizadas baseadas no perfil do seu pet
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 mx-auto max-w-4xl text-center">
        <div className="bg-card rounded-2xl p-8 border border-border/50">
          <h2 className="text-2xl font-bold text-foreground mb-4 text-balance">Pronto para começar?</h2>
          <p className="text-muted-foreground mb-8 text-pretty">
            Junte-se a milhares de tutores que já cuidam melhor dos seus pets
          </p>
          <Link href="/login">
            <Button size="lg" className="px-8 py-3">
              Começar Agora
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 mx-auto max-w-7xl text-center border-t border-border/50">
        <p className="text-sm text-muted-foreground">© 2024 PetCare. Cuidando do seu melhor amigo.</p>
      </footer>
    </div>
  )
}
