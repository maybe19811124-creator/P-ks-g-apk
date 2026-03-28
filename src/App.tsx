import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calculator, ChevronRight, Info, Scale, Package, Layers, Hash, Printer, Download } from 'lucide-react';
import { RECIPES } from './constants/recipes';
import { Recipe, UnitType } from './types';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [inputValue, setInputValue] = useState<string>('1');
  const [subItemCounts, setSubItemCounts] = useState<Record<string, string>>({});
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const numericInputValue = useMemo(() => {
    const parsed = parseFloat(inputValue.replace(',', '.'));
    return isNaN(parsed) ? 0 : parsed;
  }, [inputValue]);

  const handleWeightChange = (valStr: string) => {
    setInputValue(valStr);
    // If we have subItems, clear them when weight is manually changed
    if (selectedRecipe?.subItems) {
      setSubItemCounts({});
    }
  };

  const handlePiecesChange = (valStr: string) => {
    const val = parseFloat(valStr.replace(',', '.'));
    const safeVal = isNaN(val) ? 0 : val;
    if (selectedRecipe?.piecesPerUnitWeight) {
      const calculated = safeVal / selectedRecipe.piecesPerUnitWeight;
      // Round to 4 decimals to avoid float noise but keep it as string for the input
      setInputValue(calculated.toFixed(4).replace(/\.?0+$/, ''));
    }
  };

  const handleSubItemChange = (subItemId: string, valStr: string) => {
    if (!selectedRecipe?.subItems) return;
    
    const newCounts = { ...subItemCounts, [subItemId]: valStr };
    setSubItemCounts(newCounts);
    
    // Calculate total units based on ratios
    const totalUnits = selectedRecipe.subItems.reduce((sum, item) => {
      const val = parseFloat((newCounts[item.id] || '0').replace(',', '.'));
      const count = isNaN(val) ? 0 : val;
      return sum + (count * item.ratio);
    }, 0);
    
    // Round to 4 decimal places to avoid floating point noise
    setInputValue(totalUnits.toFixed(4).replace(/\.?0+$/, ''));
  };

  const currentPieces = useMemo(() => {
    if (selectedRecipe?.piecesPerUnitWeight) {
      return Math.round(numericInputValue * selectedRecipe.piecesPerUnitWeight);
    }
    return 0;
  }, [selectedRecipe, numericInputValue]);

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(recipe =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const flourWeight = useMemo(() => {
    if (!selectedRecipe) return 0;
    
    const baseFlourWeight = selectedRecipe.flourRatio * numericInputValue;
    
    // Calculate what the total weight would be with this base flour weight
    const otherIngredientsPercentage = selectedRecipe.ingredients.reduce((sum, ing) => {
      if (!ing.percentage) return sum;
      const weightFactor = (ing.unit === 'kg' || ing.unit === 'liter') ? 1 : (ing.unit === 'db' ? 0.05 : 0);
      return sum + (ing.percentage / 100) * weightFactor;
    }, 0);
    
    const totalMultiplier = 1 + otherIngredientsPercentage;
    const estimatedTotalWeight = baseFlourWeight * totalMultiplier;
    
    // Target weight candidates
    let targetWeight = numericInputValue;
    if (selectedRecipe.unitType === UnitType.BATCH) {
       // For BATCH, we don't have a single target weight unless specified.
       // We'll use the estimated weight as target to avoid snapping unless it's a known standard.
       if (selectedRecipe.id === 'zsemle') {
         targetWeight = numericInputValue * 3;
       } else if (selectedRecipe.id === 'kifli') {
         targetWeight = numericInputValue * 2;
       } else {
         targetWeight = estimatedTotalWeight;
       }
    }
    
    // If estimated is close to target (within 5%), snap it to the target weight
    // This fixes rounding errors in the provided flourRatio vs the sum of percentages.
    if (targetWeight > 0 && Math.abs(estimatedTotalWeight - targetWeight) / targetWeight < 0.05) {
       return targetWeight / totalMultiplier;
    }

    return baseFlourWeight;
  }, [selectedRecipe, numericInputValue]);

  const calculatedIngredients = useMemo(() => {
    if (!selectedRecipe) return [];
    return selectedRecipe.ingredients.map(ing => ({
      ...ing,
      value: ing.percentage ? (flourWeight * ing.percentage) / 100 : 0
    }));
  }, [selectedRecipe, flourWeight]);

  const totalWeight = useMemo(() => {
    if (!selectedRecipe) return 0;
    // Sum all ingredients. Assume 1 db = 0.05kg (50g)
    const ingredientsSum = calculatedIngredients.reduce((sum, ing) => {
      const weight = ing.unit === 'db' ? ing.value * 0.05 : ing.value;
      return sum + weight;
    }, 0);
    return flourWeight + ingredientsSum;
  }, [selectedRecipe, flourWeight, calculatedIngredients]);

  const getUnitIcon = (type: UnitType) => {
    switch (type) {
      case UnitType.PIECE: return <Hash className="w-4 h-4" />;
      case UnitType.KG: return <Scale className="w-4 h-4" />;
      case UnitType.BATCH: return <Package className="w-4 h-4" />;
      case UnitType.STRETCH: return <Layers className="w-4 h-4" />;
      default: return <Calculator className="w-4 h-4" />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans relative overflow-x-hidden">
      {/* Decorative Background Images - Hidden on print */}
      <div className="fixed inset-0 z-0 pointer-events-none no-print overflow-hidden opacity-20">
        <img 
          src="https://picsum.photos/seed/bakery1/800/600" 
          alt="" 
          className="absolute -top-20 -left-20 w-96 h-96 object-cover rounded-full blur-sm rotate-12"
          referrerPolicy="no-referrer"
        />
        <img 
          src="https://picsum.photos/seed/bread/800/600" 
          alt="" 
          className="absolute top-1/4 -right-20 w-80 h-80 object-cover rounded-full blur-md -rotate-12"
          referrerPolicy="no-referrer"
        />
        <img 
          src="https://picsum.photos/seed/pastry/800/600" 
          alt="" 
          className="absolute -bottom-20 left-1/3 w-72 h-72 object-cover rounded-full blur-sm rotate-45"
          referrerPolicy="no-referrer"
        />
        <img 
          src="https://picsum.photos/seed/croissant/800/600" 
          alt="" 
          className="absolute bottom-1/4 -left-10 w-64 h-64 object-cover rounded-full blur-lg"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Content Overlay to ensure readability */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20 no-print">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-black text-white p-2 rounded-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">Tamás sütemény kalkulátora</h1>
            </div>
            <div className="flex items-center gap-2">
              {selectedRecipe && (
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="md:hidden flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-bold text-sm"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Vissza
                </button>
              )}
              {!isStandalone && (
                <>
                  {deferredPrompt ? (
                    <button
                      onClick={handleInstall}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition-colors font-medium text-sm shadow-lg"
                    >
                      <Download className="w-4 h-4" />
                      Telepítés
                    </button>
                  ) : (
                    <div className="hidden sm:flex items-center gap-1 text-[10px] text-gray-400 font-medium uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-md">
                      <Info className="w-3 h-3" />
                      Telepítés: Menü → Telepítés
                    </div>
                  )}
                </>
              )}
              {selectedRecipe && (
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-xl transition-colors font-medium text-sm shadow-lg"
                >
                  <Printer className="w-4 h-4" />
                  Nyomtatás
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 flex-grow w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recipe List Section */}
            <section className={`space-y-6 no-print ${selectedRecipe ? 'hidden md:block' : 'block'}`}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Recept keresése..."
                  className="w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
                {filteredRecipes.map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      setInputValue(recipe.unitType === UnitType.PIECE ? '10' : '1');
                      setSubItemCounts({});
                      setShowOriginal(false);
                    }}
                    className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between group backdrop-blur-sm ${
                      selectedRecipe?.id === recipe.id
                        ? 'bg-black text-white shadow-xl scale-[1.02]'
                        : 'bg-white/80 hover:bg-white border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${selectedRecipe?.id === recipe.id ? 'bg-white/10' : 'bg-gray-100'}`}>
                        {getUnitIcon(recipe.unitType)}
                      </div>
                      <span className="font-medium">{recipe.name}</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${selectedRecipe?.id === recipe.id ? 'translate-x-1' : 'text-gray-300 group-hover:translate-x-1'}`} />
                  </button>
                ))}
              </div>
            </section>

            {/* Calculator Section */}
            <section className={`print-area ${!selectedRecipe ? 'hidden md:block' : 'block'}`}>
              <AnimatePresence mode="wait">
                {selectedRecipe ? (
                  <motion.div
                    key={selectedRecipe.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white/95 backdrop-blur-md rounded-3xl border border-gray-200 shadow-2xl overflow-hidden print:shadow-none print:border-none print:bg-white"
                  >
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50 print:bg-white">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold">{selectedRecipe.name}</h2>
                        <button
                          onClick={() => setShowOriginal(!showOriginal)}
                          className="no-print flex items-center gap-1 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs font-bold transition-colors"
                        >
                          <Info className="w-3 h-3" />
                          {showOriginal ? 'Kalkulátor' : 'Eredeti recept'}
                        </button>
                      </div>
                      
                      {!showOriginal ? (
                        <div className="space-y-4">
                          {selectedRecipe.subItems && (
                            <div className="bg-blue-50/30 p-4 rounded-2xl border border-blue-100/50 space-y-4 no-print">
                              <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">{selectedRecipe.name} típusok (db)</h3>
                              <div className="grid grid-cols-1 gap-3">
                                {selectedRecipe.subItems.map((item) => (
                                  <div key={item.id} className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-blue-700 w-24 shrink-0">{item.name}</span>
                                    <div className="relative flex-grow">
                                      <input
                                        type="text"
                                        inputMode="decimal"
                                        value={subItemCounts[item.id] ?? ''}
                                        onChange={(e) => handleSubItemChange(item.id, e.target.value)}
                                        className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl text-lg font-bold focus:border-blue-400 focus:outline-none transition-colors"
                                        placeholder="0"
                                      />
                                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 text-xs font-bold">db</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <p className="text-[10px] text-blue-400 font-medium italic">
                                Tipp: Itt add meg a darabszámokat, és alul látod az összesített lisztet!
                              </p>
                            </div>
                          )}

                          {selectedRecipe.piecesPerUnitWeight && (
                            <label className="block">
                              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                                Darabszám (db)
                              </span>
                              <div className="relative">
                                <input
                                  type="text"
                                  inputMode="decimal"
                                  value={currentPieces || ''}
                                  onChange={(e) => handlePiecesChange(e.target.value)}
                                  className="w-full px-4 py-4 bg-blue-50 border-2 border-blue-100 rounded-2xl text-2xl font-bold focus:border-blue-400 focus:outline-none transition-colors no-print"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 font-medium no-print">
                                  db
                                </div>
                              </div>
                              <p className="text-[10px] text-blue-400 mt-1 font-medium uppercase tracking-tighter no-print">
                                Tipp: Írd be hány darabot szeretnél, és kiszámolom a súlyt!
                              </p>
                            </label>
                          )}

                          <label className="block">
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                              Mennyiség ({selectedRecipe.unitType})
                            </span>
                            <div className="relative">
                              <input
                                type="text"
                                inputMode="decimal"
                                value={inputValue}
                                onChange={(e) => handleWeightChange(e.target.value)}
                                className="w-full px-4 py-4 bg-white border-2 border-gray-200 rounded-2xl text-2xl font-bold focus:border-black focus:outline-none transition-colors print:border-none print:p-0"
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium print:static print:translate-y-0 print:mt-1">
                                {selectedRecipe.unitType}
                              </div>
                            </div>
                          </label>
                        </div>
                      ) : (
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-inner">
                          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Eredeti recept szövege:</h3>
                          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
                            {selectedRecipe.originalText}
                          </pre>
                        </div>
                      )}
                    </div>

                    {!showOriginal && (
                      <div className="p-6 space-y-6">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Összetevők</h3>
                          <div className="space-y-3">
                            {/* Flour is always the base */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 print:bg-white print:border-b print:rounded-none">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-black print:hidden" />
                                <span className="font-semibold">Liszt</span>
                              </div>
                              <div className="text-right">
                                <span className="text-xl font-bold">{flourWeight.toFixed(3).replace(/\.?0+$/, '')}</span>
                                <span className="ml-1 text-gray-500 font-medium">kg</span>
                              </div>
                            </div>

                            {calculatedIngredients.map((ing, idx) => (
                              <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors print:rounded-none print:border-b print:px-0">
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-gray-300 print:hidden" />
                                  <span className="font-medium text-gray-700">{ing.name}</span>
                                  <span className="text-xs text-gray-400 font-mono print:text-gray-600">({ing.percentage?.toFixed(1)}%)</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-xl font-bold">
                                    {ing.unit === 'db' ? Math.round(ing.value) : ing.value.toFixed(3)}
                                  </span>
                                  <span className="ml-1 text-gray-500 font-medium">{ing.unit}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {selectedRecipe.notes && (
                          <div className="p-4 bg-blue-50/50 rounded-2xl flex gap-3 items-start print:bg-white print:border print:rounded-none">
                            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5 print:hidden" />
                            <p className="text-sm text-blue-700 leading-relaxed print:text-black">
                              <strong className="hidden print:inline">Megjegyzés: </strong>
                              {selectedRecipe.notes}
                            </p>
                          </div>
                        )}

                        <div className="pt-6 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">Össztömeg</span>
                            <div className="text-right">
                              <span className="text-3xl font-black">
                                {totalWeight.toFixed(3).replace(/\.?0+$/, '')}
                              </span>
                              <span className="ml-1 text-gray-500 font-bold">kg</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 no-print bg-white/50 backdrop-blur-sm">
                    <Calculator className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-lg font-medium">Válassz egy receptet a listából a számításhoz</p>
                  </div>
                )}
              </AnimatePresence>
            </section>
          </div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          .print-area { width: 100% !important; margin: 0 !important; padding: 0 !important; }
          body { background: white !important; }
          main { max-width: 100% !important; padding: 0 !important; }
          .grid { display: block !important; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e5e5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d1d1;
        }
        /* Hide number input spinners */
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}} />
    </div>
  );
}
