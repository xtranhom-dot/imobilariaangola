import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PropertyCard, PropertyProps } from "@/components/ui/property-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Property } from "@shared/schema";
import { cn } from "@/lib/utils";

export default function PropertiesPage() {
  const searchString = useSearch();
  const [, navigate] = useLocation();
  
  const urlParams = new URLSearchParams(searchString);
  
  const [filters, setFilters] = useState({
    search: "",
    purpose: urlParams.get("purpose") || "",
    propertyType: urlParams.get("type") || "",
    province: urlParams.get("province") || "",
    municipality: urlParams.get("municipality") || "",
    minBedrooms: 0
  });
  
  const [priceRange, setPriceRange] = useState([0, 2000000000]);
  const [sortBy, setSortBy] = useState("newest");
  
  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const filteredProperties = useMemo(() => {
    let result = [...properties];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.location.toLowerCase().includes(searchLower) ||
        p.municipality.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.purpose) {
      result = result.filter(p => p.purpose === filters.purpose);
    }
    
    if (filters.propertyType) {
      result = result.filter(p => p.propertyType === filters.propertyType);
    }
    
    if (filters.province) {
      result = result.filter(p => p.province === filters.province);
    }
    
    if (filters.municipality) {
      result = result.filter(p => 
        p.municipality.toLowerCase().includes(filters.municipality.toLowerCase())
      );
    }
    
    if (filters.minBedrooms > 0) {
      result = result.filter(p => (p.bedrooms || 0) >= filters.minBedrooms);
    }
    
    result = result.filter(p => {
      const price = Number(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else {
      result.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }
    
    return result;
  }, [properties, filters, priceRange, sortBy]);

  const formattedProperties: PropertyProps[] = filteredProperties.map((p) => ({
    id: p.id,
    image: p.coverImage || p.images?.[0] || "/attached_assets/generated_images/modern_house_with_pool_exterior.png",
    location: `${p.municipality}, ${p.province}`,
    title: p.title,
    area: Number(p.area),
    bedrooms: p.bedrooms || 0,
    bathrooms: p.bathrooms || 0,
    price: Number(p.price),
    status: p.purpose
  }));

  const clearFilters = () => {
    setFilters({
      search: "",
      purpose: "",
      propertyType: "",
      province: "",
      municipality: "",
      minBedrooms: 0
    });
    setPriceRange([0, 2000000000]);
    navigate("/properties");
  };

  const hasActiveFilters = filters.purpose || filters.propertyType || filters.province || 
    filters.municipality || filters.search || filters.minBedrooms > 0 || 
    priceRange[0] > 0 || priceRange[1] < 2000000000;
  
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-black text-white pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/luanda-hero.jpg')] bg-cover bg-center opacity-30" />
        <div className="container mx-auto relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Nossos Imóveis</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Explore nossa seleção exclusiva de propriedades de luxo em Luanda e arredores. 
            Encontre o lar perfeito ou o investimento ideal.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filters (Sheet) */}
        <div className="lg:hidden mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-full bg-black text-[#FFD700] border border-[#FFD700] hover:bg-gray-900">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar Imóveis
                {hasActiveFilters && <span className="ml-2 bg-[#FFD700] text-black rounded-full w-5 h-5 text-xs flex items-center justify-center">!</span>}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-left font-serif text-xl mb-4">Filtrar Imóveis</SheetTitle>
              </SheetHeader>
              <FiltersContent 
                filters={filters} 
                setFilters={setFilters} 
                priceRange={priceRange} 
                setPriceRange={setPriceRange}
                onClear={clearFilters}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <div className="bg-white p-6 shadow-sm sticky top-24 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-bold flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#FFD700]" />
                Filtros
              </h2>
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Limpar
                </button>
              )}
            </div>
            <FiltersContent 
              filters={filters} 
              setFilters={setFilters} 
              priceRange={priceRange} 
              setPriceRange={setPriceRange}
              onClear={clearFilters}
            />
          </div>
        </aside>

        {/* Properties Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-500 text-sm">
              {isLoading ? (
                "Carregando..."
              ) : (
                <>Mostrando <span className="font-bold text-black">{formattedProperties.length}</span> imóveis</>
              )}
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mais Recentes</SelectItem>
                <SelectItem value="price-asc">Preço: Menor para Maior</SelectItem>
                <SelectItem value="price-desc">Preço: Maior para Menor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Carregando imóveis...</p>
            </div>
          ) : formattedProperties.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <p className="text-gray-500 mb-4">Nenhum imóvel encontrado com os filtros selecionados.</p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formattedProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

interface FiltersContentProps {
  filters: {
    search: string;
    purpose: string;
    propertyType: string;
    province: string;
    municipality: string;
    minBedrooms: number;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    search: string;
    purpose: string;
    propertyType: string;
    province: string;
    municipality: string;
    minBedrooms: number;
  }>>;
  priceRange: number[];
  setPriceRange: (val: number[]) => void;
  onClear: () => void;
}

function FiltersContent({ filters, setFilters, priceRange, setPriceRange, onClear }: FiltersContentProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Buscar</label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Palavra-chave..." 
            className="pl-9"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>
      </div>

      {/* Purpose (Venda/Aluguel) */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Finalidade</label>
        <div className="flex gap-2">
          <Button 
            type="button"
            variant="outline" 
            className={cn(
              "flex-1 transition-colors",
              filters.purpose === "Venda" 
                ? "bg-black text-[#FFD700] border-black hover:bg-gray-800 hover:text-[#FFD700]" 
                : "hover:bg-gray-100"
            )}
            onClick={() => setFilters(prev => ({ ...prev, purpose: prev.purpose === "Venda" ? "" : "Venda" }))}
          >
            Venda
          </Button>
          <Button 
            type="button"
            variant="outline" 
            className={cn(
              "flex-1 transition-colors",
              filters.purpose === "Aluguel" 
                ? "bg-black text-[#FFD700] border-black hover:bg-gray-800 hover:text-[#FFD700]" 
                : "hover:bg-gray-100"
            )}
            onClick={() => setFilters(prev => ({ ...prev, purpose: prev.purpose === "Aluguel" ? "" : "Aluguel" }))}
          >
            Aluguel
          </Button>
        </div>
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Tipo de Imóvel</label>
        <Select 
          value={filters.propertyType} 
          onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value === "all" ? "" : value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos os Tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Tipos</SelectItem>
            <SelectItem value="casa">Casa / Vivenda</SelectItem>
            <SelectItem value="apartamento">Apartamento</SelectItem>
            <SelectItem value="escritorio">Escritório</SelectItem>
            <SelectItem value="terreno">Terreno</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Province */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Província</label>
        <Select 
          value={filters.province} 
          onValueChange={(value) => setFilters(prev => ({ ...prev, province: value === "all" ? "" : value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas as Províncias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Províncias</SelectItem>
            <SelectItem value="Luanda">Luanda</SelectItem>
            <SelectItem value="Benguela">Benguela</SelectItem>
            <SelectItem value="Huíla">Huíla</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Municipality */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Município</label>
        <Select 
          value={filters.municipality} 
          onValueChange={(value) => setFilters(prev => ({ ...prev, municipality: value === "all" ? "" : value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos os Municípios" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Municípios</SelectItem>
            <SelectItem value="Talatona">Talatona</SelectItem>
            <SelectItem value="Miramar">Miramar</SelectItem>
            <SelectItem value="Patriota">Patriota</SelectItem>
            <SelectItem value="Benfica">Benfica</SelectItem>
            <SelectItem value="Ilha de Luanda">Ilha de Luanda</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Faixa de Preço</label>
          <span className="text-xs text-gray-500 font-medium">AOA</span>
        </div>
        <Slider 
          defaultValue={[0, 2000000000]} 
          max={2000000000} 
          step={10000000} 
          value={priceRange}
          onValueChange={setPriceRange}
          className="my-4"
        />
        <div className="flex justify-between text-xs font-medium text-gray-700">
          <span>{new Intl.NumberFormat('pt-AO', { notation: "compact", compactDisplay: "short" }).format(priceRange[0])}</span>
          <span>{new Intl.NumberFormat('pt-AO', { notation: "compact", compactDisplay: "short" }).format(priceRange[1])}+</span>
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Quartos</label>
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((num) => (
            <Button 
              key={num}
              type="button"
              variant="outline" 
              className={cn(
                "transition-colors",
                filters.minBedrooms === num 
                  ? "bg-black text-[#FFD700] border-black" 
                  : "hover:bg-black hover:text-[#FFD700] hover:border-black"
              )}
              onClick={() => setFilters(prev => ({ ...prev, minBedrooms: prev.minBedrooms === num ? 0 : num }))}
            >
              {num}+
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
