import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

import heroBg from "@/assets/luanda-hero.jpg";

export function Hero() {
  const [, navigate] = useLocation();
  const [filters, setFilters] = useState({
    purpose: "",
    propertyType: "",
    province: "",
    municipality: ""
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.purpose) params.set("purpose", filters.purpose);
    if (filters.propertyType) params.set("type", filters.propertyType);
    if (filters.province) params.set("province", filters.province);
    if (filters.municipality) params.set("municipality", filters.municipality);
    
    navigate(`/properties?${params.toString()}`);
  };

  const handleClear = () => {
    setFilters({
      purpose: "",
      propertyType: "",
      province: "",
      municipality: ""
    });
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Luxury Building" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-20 grid lg:grid-cols-2 gap-12 items-center">

        <div className="max-w-2xl space-y-5 animate-in slide-in-from-left duration-700">
          <div className="relative">
             <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-[1.1]">
              Seja bem-vindo a <br />
              
              <span className="font-bold">Angola Imobiliária</span>
            </h1>
          </div>

          <p className="text-white/80 text-sm font-light leading-relaxed max-w-lg">
            Na Angola Imobiliária, oferecemos uma experiência de compra e venda de imóveis inovadora, disruptiva e personalizada, unindo segurança e transparência com o uso de tecnologia e IA.
          </p>

          {/* Search Box - Floating Card */}
          <div className="bg-white rounded-lg shadow-2xl p-4 md:p-6 mt-8 w-full md:w-[120%] md:-ml-[10%] lg:w-[140%] lg:ml-0 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-[#FFD700]">Tipo de Negócio</label>
                <Select value={filters.purpose} onValueChange={(value) => setFilters(prev => ({ ...prev, purpose: value }))}>
                  <SelectTrigger className="w-full border-gray-200 bg-gray-50/50">
                    <SelectValue placeholder="Venda ou Aluguel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Venda">Venda</SelectItem>
                    <SelectItem value="Aluguel">Aluguel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-[#FFD700]">Tipo de Imóvel</label>
                <Select value={filters.propertyType} onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}>
                  <SelectTrigger className="w-full border-gray-200 bg-gray-50/50">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa / Vivenda</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="escritorio">Escritório</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-[#FFD700]">Província</label>
                <Select value={filters.province} onValueChange={(value) => setFilters(prev => ({ ...prev, province: value }))}>
                  <SelectTrigger className="w-full border-gray-200 bg-gray-50/50">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Luanda">Luanda</SelectItem>
                    <SelectItem value="Benguela">Benguela</SelectItem>
                    <SelectItem value="Huíla">Huíla</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-[#FFD700]">Município</label>
                <Select value={filters.municipality} onValueChange={(value) => setFilters(prev => ({ ...prev, municipality: value }))}>
                  <SelectTrigger className="w-full border-gray-200 bg-gray-50/50">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Talatona">Talatona</SelectItem>
                    <SelectItem value="Miramar">Miramar</SelectItem>
                    <SelectItem value="Patriota">Patriota</SelectItem>
                    <SelectItem value="Benfica">Benfica</SelectItem>
                    <SelectItem value="Ilha de Luanda">Ilha de Luanda</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-gray-400 hover:text-red-500 uppercase font-medium underline decoration-dotted underline-offset-4"
                >
                  Limpar
                </button>
                <Button 
                  onClick={handleSearch}
                  className="flex-1 bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold uppercase tracking-widest text-xs h-10 shadow-md hover:shadow-lg transition-all"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
