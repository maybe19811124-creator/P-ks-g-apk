import { Recipe, UnitType } from '../types';

export const RECIPES: Recipe[] = [
  {
    id: 'tepertos-pogacsa',
    name: 'Tepertős Pogácsa',
    flourRatio: 0.075,
    unitType: UnitType.PIECE,
    ingredients: [
      { name: 'Élesztő', percentage: 5, unit: 'kg' },
      { name: 'Só', percentage: 3, unit: 'kg' },
      { name: 'Margarin', percentage: 15, unit: 'kg' },
      { name: 'Tepertő', percentage: 25, unit: 'kg' },
      { name: 'Bors', percentage: 1, unit: 'kg' },
      { name: 'Tigris', percentage: 0.5, unit: 'kg' },
      { name: 'Víz', percentage: 40, unit: 'kg' },
    ],
    notes: 'Kis tepertős pogácsa készítésekor 1 kg-hoz 0.7 kg liszt',
    originalText: 'TEPERTŐS POGÁCSA:\nLiszt:dbx0.075kg\nElésztő:5%\nSó: 3%\nMargarin:15%\nTepertő:25%\nBors:1%\nTigris:0.5%\nVíz:40%\nKis tepertős pogácsa készítésekor 1 kg-hoz 0.7 kg liszt'
  },
  {
    id: 'vajas-pogacsa',
    name: 'Vajas Pogácsa',
    flourRatio: 0.078,
    unitType: UnitType.PIECE,
    ingredients: [
      { name: 'Élesztő', percentage: 5, unit: 'kg' },
      { name: 'Só', percentage: 3, unit: 'kg' },
      { name: 'Margarin', percentage: 25, unit: 'kg' },
      { name: 'Víz', percentage: 40, unit: 'kg' },
    ],
    originalText: 'VAJAS POGÁCSA:\nLiszt:dbx 0.078kg\nÉlesztő:5%\nSó: 3%\nMargarin:25%\nVíz:40%'
  },
  {
    id: 'tejfolos-pogacsa',
    name: 'Tejfölös Pogácsa',
    flourRatio: 0.7,
    unitType: UnitType.KG,
    ingredients: [
      { name: 'Élesztő', percentage: 5, unit: 'kg' },
      { name: 'Só', percentage: 3, unit: 'kg' },
      { name: 'Margarin', percentage: 30, unit: 'kg' },
      { name: 'Tigris', percentage: 0.5, unit: 'kg' },
      { name: 'Tejföl', percentage: 40, unit: 'kg' },
    ],
    originalText: 'TEJFÖLÖS POGÁCSA\nLiszt:kg x 0,7\nÉlesztő:5%\nSó:3%\nMargarin:30%\nTigris:0,5%\nTejföl:40%'
  },
  {
    id: 'pite',
    name: 'Pite',
    flourRatio: 0.55,
    unitType: UnitType.KG,
    ingredients: [
      { name: 'Élesztő', percentage: 5, unit: 'kg' },
      { name: 'Só', percentage: 1, unit: 'kg' },
      { name: 'Cukor', percentage: 10, unit: 'kg' },
      { name: 'Margarin', percentage: 35.7, unit: 'kg' },
      { name: 'Tejpor', percentage: 3, unit: 'kg' },
      { name: 'Tojáspor', percentage: 2, unit: 'kg' },
      { name: 'Víz', percentage: 33, unit: 'kg' },
    ],
    notes: '1 lemez = 3kg / 42 db',
    originalText: 'PITE:\nLiszt:Tészta súly x 0.55 /1 lemez=3kg/42 db/\nÉlesztő:5%\nSó: 1%\nCukor:10%\nMargarin:35.7%\nTejpor: 3%\nTojáspor:2%\nVíz: 33%',
    piecesPerUnitWeight: 14 // 42 db / 3 kg = 14 db/kg
  },
  {
    id: 'pizza',
    name: 'Pizza',
    flourRatio: 0.07, // Base unit = 1 egység
    unitType: UnitType.PIECE,
    subItems: [
      { id: 'normal', name: 'Pizza (Normál)', ratio: 3 },
      { id: 'papucs', name: 'Pizza (Papucs)', ratio: 0.5 },
      { id: 'lepeny', name: 'Pizza (Zöldfűszeres lepény)', ratio: 1 }
    ],
    ingredients: [
      { name: 'Élesztő', percentage: 5, unit: 'kg' },
      { name: 'Só', percentage: 2, unit: 'kg' },
      { name: 'Cukor', percentage: 2, unit: 'kg' },
      { name: 'Tejpor', percentage: 2, unit: 'kg' },
      { name: 'Tojáspor', percentage: 2, unit: 'kg' },
      { name: 'Burgonyapehely', percentage: 5, unit: 'kg' },
      { name: 'Étolaj', percentage: 10, unit: 'kg' },
      { name: 'Tigris', percentage: 0.5, unit: 'kg' },
      { name: 'Víz', percentage: 50, unit: 'kg' },
    ],
    notes: 'Normál pizza: 3 egység | Papucs: 0.5 egység | Lepény: 1 egység (1 egység = 0.07kg liszt)',
    originalText: 'PIZZA:\nLiszt:0.07kg x egység\nNormál: 3 egység\nPapucs: 0.5 egység\nLepény: 1 egység\nÉlesztő:5%\nSó:2%\nCukor:2%\nTejpor:2%\nTojáspor:2%\nBurgonyapehely:5%\nÉtolaj:10%\nTigris:0.5%\nVíz:50%'
  },
  {
    id: 'gyurt-stangli',
    name: 'Gyúrt Stangli',
    flourRatio: 0.7,
    unitType: UnitType.KG,
    ingredients: [
      { name: 'Élesztő', percentage: 4, unit: 'kg' },
      { name: 'Só', percentage: 4, unit: 'kg' },
      { name: 'Margarin', percentage: 50, unit: 'kg' },
      { name: 'Tejföl', percentage: 40, unit: 'kg' },
      { name: 'Tigris', percentage: 0.5, unit: 'kg' },
    ],
    originalText: 'GYÚRT STANGLI:\nLiszt:0.7xkg\nÉlesztő:4%\nSó:4%\nMargarin:50%\nTejföl:40%\nTigris:0.5%'
  },
  {
    id: 'perec',
    name: 'Perec',
    flourRatio: 0.75,
    unitType: UnitType.KG,
    ingredients: [
      { name: 'Élesztő', percentage: 4, unit: 'kg' },
      { name: 'Só', percentage: 2, unit: 'kg' },
      { name: 'Cukor', percentage: 6, unit: 'kg' },
      { name: 'Zsír', percentage: 40, unit: 'kg' },
      { name: 'Víz', percentage: 40, unit: 'kg' },
    ],
    originalText: 'PEREC:\nLiszt:0.75xkg\nÉlesztő:4%\nSó:2%\nCukor:6%\nZsír:40%\nVíz40%'
  },
  {
    id: 'zsemle',
    name: 'Zsemle',
    flourRatio: 1.9,
    unitType: UnitType.BATCH,
    subItems: [
      { id: 'zsemle-db', name: 'Zsemle (db)', ratio: 1 / 30 }
    ],
    ingredients: [
      { name: 'Élesztő', percentage: 5, unit: 'kg' },
      { name: 'Só', percentage: 1.7, unit: 'kg' },
      { name: 'Tigris', percentage: 0.5, unit: 'kg' },
      { name: 'Sikér', percentage: 2, unit: 'kg' },
      { name: 'Víz', percentage: 51, unit: 'kg' },
    ],
    notes: '1 prés = 3kg tészta',
    originalText: 'ZSEMLE:\nLiszt:1.9kg/prés\nElésztő:5%\nSó:1.7%\nTigris:0.5%\nSikér:2%\nVíz:51%\n1prés:3kg'
  },
  {
    id: 'vajas',
    name: 'Vajas',
    flourRatio: 1.8,
    unitType: UnitType.STRETCH,
    ingredients: [
      { name: 'Élesztő', percentage: 5, unit: 'kg' },
      { name: 'Leveles mix', percentage: 20, unit: 'kg' },
      { name: 'Víz', percentage: 55, unit: 'kg' },
      { name: 'Leveles margarin', percentage: 37.5, unit: 'kg' },
    ],
    originalText: 'VAJAS\nLiszt:1,8kg x ny\u00fajt\u00e1s\n\u00c9leszt\u0151:5%\nLeveles mix:20%\nV\u00edz:55%\nLeveles margarin:37,5%'
  },
  {
    id: 'retes',
    name: 'Rétes',
    flourRatio: 2,
    unitType: UnitType.STRETCH,
    subItems: [
      { id: 'retes-db', name: 'Rétes (db)', ratio: 1/60 },
      { id: 'kremeslap-cs', name: 'Krémeslap (csomag)', ratio: 1/8 },
      { id: 'kremes-db', name: 'Krémes (db)', ratio: 1/64 },
      { id: 'oznyelv-db', name: 'Őznyelv (db)', ratio: 1/30 },
      { id: 'habrolo-db', name: 'Habroló (db)', ratio: 1/180 },
      { id: 'stangli-pogacsa', name: 'Stangli, pogácsa', ratio: 1.09375 }
    ],
    ingredients: [
      { name: 'Só', percentage: 2, unit: 'kg' },
      { name: 'Cukor', percentage: 2, unit: 'kg' },
      { name: 'Margarin', percentage: 2, unit: 'kg' },
      { name: 'Víz', percentage: 51, unit: 'kg' },
      { name: 'Leveles margarin', percentage: 75, unit: 'kg' },
    ],
    notes: '1 nyújtás: 3.2 kg tészta, Leveles margarin: 1.5kg | 60db rétes: 1 nyújtás | 8 csomag krémeslap: 1 nyújtás | 64 krémes / 4 lemez: 1 nyújtás | 30db őznyelv: 1 nyújtás | Stangli, pogácsa: 3.5kg / 2 szimpla, 2 dupla nyújtás | 1 nyújtásnyi tésztával és 2kg leveles margarinnal: 180db habroló (1 csomag 10db)',
    originalText: 'RÉTES:\nLiszt:Nyújtás x2 kg\nSó:2%\nCukor:2%\nMargarin:2%\nVíz:51%\nLeveles margarin:75%\n1 nyújtás: 3.2 kg,Leveles margarin:1.5kg\n60db rétes:1 nyújtás\n8 csomag krémeslap:1 nyújtás\n64 krémes/4 lemez/:1 nyújtás\n30db őznyelv:1 nyújtás\nStangli,pogácsa:3.5kg /2 szimpla,2 dupla nyújtás/\n1 nyújtásnyi tésztával és 2kg leveles margarinnal:\n180db habroló/1 csomag 10db/'
  },
  {
    id: 'hokifli',
    name: 'Hókifli, Sörkifli, Papucs',
    flourRatio: 0.5,
    unitType: UnitType.KG,
    ingredients: [
      { name: 'Élesztő', percentage: 3, unit: 'kg' },
      { name: 'Só', percentage: 1, unit: 'kg' },
      { name: 'Margarin', percentage: 50, unit: 'kg' },
      { name: 'Tigris', percentage: 0.5, unit: 'kg' },
      { name: 'Tejföl', percentage: 50, unit: 'kg' },
    ],
    originalText: 'H\u00d3KIFLI,S\u00d6RKIFLI,PAPUCS\nLiszt:0.5xkg\n\u00c9leszt\u0151: 3%\nS\u00f3:1%\nMargarin:50%\nTigris:0.5%\nTejf\u00f6l:50%'
  },
  {
    id: 'bandi-bagett',
    name: 'Bandi Bagett',
    flourRatio: 0.05,
    unitType: UnitType.PIECE,
    ingredients: [
      { name: 'Só', percentage: 1.5, unit: 'kg' },
      { name: 'Élesztő', percentage: 10, unit: 'kg' },
      { name: 'Gamma Uni', percentage: 0.5, unit: 'kg' },
      { name: 'Falusi burgonyás mix', percentage: 30, unit: 'kg' },
      { name: 'Kukoricás, Fűszeres mix', percentage: 10, unit: 'kg' },
      { name: 'Víz', percentage: 70, unit: 'kg' },
      { name: 'Leveles margarin', percentage: 25, unit: 'kg' },
    ],
    originalText: 'BANDI BAGETT\nLiszt:0,05 x db\nS\u00f3:1,5%\n\u00c9leszt\u0151:10%\nGamma Uni:0,5%\nFalusi burgony\u00e1s mix:30%\nKukoric\u00e1s,F\u0171szeres mix:10%\nV\u00edz:70%\nLeveles margarin:25%'
  },
  {
    id: 'kifli',
    name: 'Kifli',
    flourRatio: 1.23,
    unitType: UnitType.BATCH,
    subItems: [
      { id: 'hot-dog', name: 'Hot-dog (db)', ratio: 1.5 / 30 },
      { id: 'nagykifli', name: 'Nagykifli (db)', ratio: 1.8 / 30 },
      { id: 'vinceller', name: 'Vincellér (db)', ratio: 1.05 / 30 },
      { id: 'korpas', name: 'Korpás (db)', ratio: 1.05 / 30 },
      { id: 'vajas-tejes-sos', name: 'Vajas, tejes, sós (db)', ratio: 1 / 30 },
      { id: 'diak-kifli', name: 'Diák kifli (db)', ratio: 0.9 / 30 },
      { id: 'egyenes-kifli', name: 'Egyenes kifli (db)', ratio: 1 / 30 },
      { id: 'sajtos', name: 'Sajtos (db)', ratio: 1.2 / 30 }
    ],
    ingredients: [
      { name: 'Élesztő', percentage: 5, unit: 'kg' },
      { name: 'Só', percentage: 1.7, unit: 'kg' },
      { name: 'Cukor', percentage: 3, unit: 'kg' },
      { name: 'Margarin', percentage: 6, unit: 'kg' },
      { name: 'Tejpor', percentage: 3, unit: 'kg' },
      { name: 'Víz', percentage: 44, unit: 'kg' },
    ],
    notes: 'Tejjel is készíthető (30% tej, 18% víz) | Prések: Hot-dog: 3kg | Nagykifli: 3,6kg | Vincellér: 2,1kg | Korpás: 2,1kg | Vajas, tejes, sós: 2kg | Diák kifli: 1,8kg | Egyenes kifli: 2kg | Sajtos: 2,4kg',
    originalText: 'KIFLI\nLiszt:prés x1,2kg\nÉlesztő:5%\nSó:1,7%\nCukor:3%\nMargarin:6%\nTejpor:3% vagy Tej:30%\nVíz:44% vagy Tejjel:18%\nPrések:\nHot-dog:3kg\nNagykifli:3,6kg\nVincellér:2,1kg\nKorpás:2,1kg\nVajas,tejes,sós:2kg\nDiák kifli:1,8kg\nEgyenes kifli:2kg\nSajtos:2,4kg'
  },
  {
    id: 'kalacs',
    name: 'Kalács',
    flourRatio: 0.58,
    unitType: UnitType.KG,
    subItems: [
      { id: 'puffancs-12', name: 'Puffancs (12dkg)', ratio: 4.2/30 },
      { id: 'puffancs-16', name: 'Puffancs (16dkg)', ratio: 5.4/30 },
      { id: 'kis-pres', name: 'Kis prés', ratio: 2.1 },
      { id: 'fonott-kalacs', name: 'Fonott kalács (0.5kg)', ratio: 2.8/30 },
      { id: 'banan', name: 'Orosházi banán (db)', ratio: 2.7/30 },
      { id: 'kiskifli', name: 'Kiskifli (db)', ratio: 2.7/30 },
      { id: 'almas-kifli', name: 'Almás fahéjas kifli (db)', ratio: 2.7/30 },
      { id: 'nagykifli', name: 'Kelt nagykifli (db)', ratio: 2.7/15 },
      { id: 'virag', name: 'Virág (db)', ratio: 3.6/30 },
      { id: 'lepeny', name: 'Lepény (db)', ratio: 0.4 },
      { id: 'negyedes', name: 'Negyedes kalács (db)', ratio: 0.28 },
      { id: 'brios', name: 'Briós (db)', ratio: 0.14 },
      { id: 'cukros-kifli', name: 'Cukros kifli (db)', ratio: 0.14 },
      { id: 'kulcsos-db', name: 'Kulcsos kalács (db)', ratio: 0.7 },
      { id: 'forma-kalacs', name: 'Forma kalács/kuglóf', ratio: 0.56 },
      { id: 'kelt-csiga', name: 'Kelt csiga (db)', ratio: 4/45 }
    ],
    ingredients: [
      { name: 'Élesztő', percentage: 5, unit: 'kg' },
      { name: 'Só', percentage: 1, unit: 'kg' },
      { name: 'Cukor', percentage: 10, unit: 'kg' },
      { name: 'Margarin', percentage: 10, unit: 'kg' },
      { name: 'Tojáspor', percentage: 2, unit: 'kg' },
      { name: 'Tejpor', percentage: 3, unit: 'kg' },
      { name: 'Víz', percentage: 40, unit: 'kg' },
    ],
    notes: `Puffancs: 12dkg, 1 prés: 4,2kg | 16dkg-os Puffancs: 18dkg, 1 prés: 5,4kg | Kis prés: 2,1kg | 0,5kg-os Fonott kalács: 9dkg 1 szál, 2,8kg 1 prés, 0,56kg 1 tészta | Banánprés, kiskifli, Almás fahéjas kifli: 2,7kg (Kelt nagykiflinél 2 db összecsípve 18dkg) | Virág: 12dkg 1 tészta, 3,6kg 1 prés | Lepény: 12db 40dkg tészta/nagy tepsi | Túró töltelék: 1kg túró, 0,15kg liszt, 0,3kg tejföl, 0,3kg cukor, 1db tojás | Negyedes, briós, cukros kifli, kulcsos kalács: 2,1kg/prés | Forma kalács, kuglóf 0,5kg-os: 0,56kg, 1 prés: 4,2kg | Kelt csiga: 1 nyújtás / 45db (4kg)`,
    originalText: 'KALÁCS\nLiszt:Tészta súly x 0,58\nÉlesztő:5%\nSó:1%\nCukor:10%\nMargarin:10%\nTojáspor:2%\nTejpor:3%\nVíz:40%\nPuffancs:12dkg 1 prés:4,2kg\n16dkg-os Puffancs:18dkg 1 prés:5,4kg\nKis prés:2,1kg\n0,5kg-os Fonott kalács:9dkg 1 szál,2,8 kg 1 prés, 0,56kg 1 tészta\nBanánprés,kiskifli,Almás fahélyas kifli:2,7kg Kelt nagykiflinél 2 db összecsípve 18dkg\nVirág:12dkg 1 tészta,3,6kg 1 prés\nLepény:12db 40dkg tészta/nagy tepsi/\nTúró:1kg\nLiszt:0,15kg\nTejföl:0,3kg\nCukor:0,3kg\nTojás:1db\nNegyedes,briós,cukros kifli,kulcsos kalács: 2,1kg/prés\nForma kalács,kuglóf 0,5kg-os:0,56kg 1prés:4,2kg\nKelt csiga:1nyújtás/45db 4kg'
  },
  {
    id: 'poffeteg',
    name: 'Pöffeteg',
    flourRatio: 1.12 / 3, // Normalized to 1kg total weight if needed, but let's use the 3kg batch as base
    unitType: UnitType.KG,
    ingredients: [
      { name: 'Cukor', percentage: (0.6 / 1.12) * 100, unit: 'kg' },
      { name: 'Margarin', percentage: (0.44 / 1.12) * 100, unit: 'kg' },
      { name: 'Kakaó', percentage: (0.24 / 1.12) * 100, unit: 'kg' },
      { name: 'Sütőpor', percentage: (0.01 / 1.12) * 100, unit: 'kg' },
      { name: 'Tej', percentage: (0.3 / 1.12) * 100, unit: 'liter' },
      { name: 'Csokoládé', percentage: (0.3 / 1.12) * 100, unit: 'kg' },
      { name: 'Tojás', percentage: (6 / 1.12) * 100, unit: 'db' },
    ],
    notes: 'Eredeti recept 3kg-hoz: 1.12kg liszt, 0.6kg cukor, 0.44kg margarin, 0.24kg kakaó, 0.01kg sütőpor, 0.3L tej, 0.3kg csoki, 6db tojás',
    originalText: 'PÖFFETEG 3kg\nLiszt:1,12kg\nCukor:0,6kg\nMargarin:0,44kg\nKakaó:0,24kg\nSütőpor:0,01kg\nTej:0,3 liter\nCsokoládé:0,3kg\nTojás:6db'
  }
];
