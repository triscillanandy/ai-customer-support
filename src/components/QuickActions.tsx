import React from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface QuickActionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  products?: Product[];
  onProductSelect?: (product: Product) => void;
}

export function QuickActions({ suggestions, onSelect, products, onProductSelect }: QuickActionsProps) {
  return (
    <div className="mb-4">
      {/* Text suggestions */}
      <div className="flex flex-wrap gap-2 mb-3">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Product recommendations */}
      {products && products.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Products:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white border border-gray-200 rounded-lg p-2 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onProductSelect && onProductSelect(product)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-20 object-cover rounded-md mb-2"
                />
                <p className="text-xs font-medium text-gray-800 truncate">{product.name}</p>
                <p className="text-xs text-blue-600 font-semibold">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}