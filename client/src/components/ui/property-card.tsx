import { MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export interface PropertyProps {
  id: string;
  image: string;
  location: string;
  title: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  status?: string;
}

export function PropertyCard({ property }: { property: PropertyProps }) {
  const isVenda = property.status === "Venda";
  const isAluguel = property.status === "Aluguel";
  
  return (
    <Card className="group overflow-hidden border-0 shadow-lg rounded-none bg-white hover:shadow-xl transition-shadow duration-300" data-testid={`card-property-${property.id}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Status Badge - Venda ou Aluguel */}
        {property.status && (
          <div 
            className={cn(
              "absolute top-4 left-4 px-4 py-2 text-xs font-bold uppercase tracking-widest shadow-lg",
              isVenda && "bg-[#FFD700] text-black",
              isAluguel && "bg-blue-600 text-white",
              !isVenda && !isAluguel && "bg-white/90 backdrop-blur-sm text-black"
            )}
          >
            {property.status}
          </div>
        )}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm p-2 text-white rounded-sm shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
      </div>

      <CardHeader className="p-6 pb-2">
        <div className="flex items-center gap-2 text-[#FFD700] mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wide">{property.location}</span>
        </div>
        <h3 className="font-serif text-lg font-bold leading-tight text-black line-clamp-2 min-h-[3rem]">
          {property.title}
        </h3>
      </CardHeader>

      <CardContent className="p-6 pt-2 pb-4">
        <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-1">
            <span className="text-[#FFD700] font-bold">{property.area}</span> m²
          </div>
          <div className="w-px h-3 bg-gray-300" />
          <div className="flex items-center gap-1">
            <span className="text-[#FFD700] font-bold">{property.bedrooms}</span> Quartos
          </div>
          <div className="w-px h-3 bg-gray-300" />
          <div className="flex items-center gap-1">
            <span className="text-[#FFD700] font-bold">{property.bathrooms}</span> Banheiros
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className={cn(
            "block text-xs font-medium uppercase mb-1",
            isVenda && "text-[#FFD700]",
            isAluguel && "text-blue-600",
            !isVenda && !isAluguel && "text-gray-400"
          )}>
            {isAluguel ? "Valor/Mês" : "Valor"}
          </span>
          <span className="font-serif text-xl font-bold text-black">
            {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(property.price)}
          </span>
        </div>
        <Link href={`/property/${property.id}`}>
          <a className={cn(
            "text-xs font-bold uppercase tracking-widest border-b-2 transition-colors pb-0.5",
            isVenda && "text-black hover:text-[#FFD700] border-[#FFD700]",
            isAluguel && "text-black hover:text-blue-600 border-blue-600",
            !isVenda && !isAluguel && "text-black hover:text-[#FFD700] border-[#FFD700]"
          )}>
            Ver Detalhes
          </a>
        </Link>
      </CardFooter>
    </Card>
  );
}
