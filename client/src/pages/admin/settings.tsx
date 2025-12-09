import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Save, Building, Mail, Phone, Globe, Lock } from "lucide-react";

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Configurações</h2>
          <p className="text-gray-500">Gerencie as informações da sua imobiliária e preferências do sistema.</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-[#FFD700]" />
                <CardTitle>Informações da Empresa</CardTitle>
              </div>
              <CardDescription>
                Estes dados serão exibidos no rodapé e página de contato do site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nome da Imobiliária</Label>
                  <Input id="company-name" defaultValue="Angola Imobiliária" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nif">NIF</Label>
                  <Input id="nif" defaultValue="5412345678" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Endereço Completo</Label>
                <Textarea id="address" defaultValue="Avenida 4 de Fevereiro, Edifício Presidente, Luanda, Angola" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-[#FFD700]" />
                <CardTitle>Contactos</CardTitle>
              </div>
              <CardDescription>
                Canais de atendimento ao cliente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Principal</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="email" className="pl-9" defaultValue="contacto@angolaimobiliaria.ao" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone Principal</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="phone" className="pl-9" defaultValue="+244 923 456 789" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="whatsapp" className="pl-9" defaultValue="+244 923 456 789" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="website" className="pl-9" defaultValue="www.angolaimobiliaria.ao" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-[#FFD700]" />
                <CardTitle>Segurança e Acesso</CardTitle>
              </div>
              <CardDescription>
                Gerencie sua senha e notificações.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Notificações por Email</Label>
                  <p className="text-sm text-gray-500">
                    Receber alertas sobre novas mensagens e leads.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <Button variant="outline" className="w-full sm:w-auto">
                  Alterar Senha de Acesso
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button className="bg-[#FFD700] text-black hover:bg-[#e6c200] font-bold px-8">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
