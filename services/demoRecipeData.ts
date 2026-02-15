// Demo Recipe Data for CaterCare Explorer
// Production-ready sample recipes with AI categorization

import { CategorizedRecipe } from './recipeCategorizationService';

export const demoRecipes: CategorizedRecipe[] = [
    {
        recipeId: 'demo-001',
        recipeName: 'Dampet Ørred med Persillesauce',
        category: {
            primary: 'Fisk',
            secondary: 'Fisk',
            mealType: 'Hovedret',
            styles: ['Klassisk', 'Højtid'],
            confidence: 95,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Ørredfilet 120g pr. person',
            'Persille 50g',
            'Fløde 2 dl',
            'Smør 50g',
            'Hvidvin 1 dl',
            'Salt og peber'
        ]
    },
    {
        recipeId: 'demo-002',
        recipeName: 'Kogt Torsk med Sennepssauce',
        category: {
            primary: 'Fisk',
            secondary: 'Fisk',
            mealType: 'Hovedret',
            styles: ['Klassisk', 'Gammeldags'],
            confidence: 98,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Torsk 150g pr. person',
            'Sennep 100g',
            'Fløde 3 dl',
            'Smør 50g',
            'Salt'
        ]
    },
    {
        recipeId: 'demo-003',
        recipeName: 'Flæskesteg med Rødkål',
        category: {
            primary: 'Grise',
            secondary: 'Grise',
            mealType: 'Hovedret',
            styles: ['Klassisk', 'Højtid', 'Gammeldags'],
            confidence: 99,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Flæskesteg 180g pr. person',
            'Rødkål 1 kg',
            'Æbler 3 stk',
            'Rødvin 2 dl',
            'Sukker 50g',
            'Salt og peber'
        ]
    },
    {
        recipeId: 'demo-004',
        recipeName: 'Frikadeller med Kartofler',
        category: {
            primary: 'Grise',
            secondary: 'Grise',
            mealType: 'Hovedret',
            styles: ['Klassisk', 'Gammeldags'],
            confidence: 97,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Hakket svinekød 500g',
            'Æg 2 stk',
            'Mælk 1 dl',
            'Løg 1 stk',
            'Salt, peber'
        ]
    },
    {
        recipeId: 'demo-005',
        recipeName: 'Hakkebøf med Løg',
        category: {
            primary: 'Okse/Kalv',
            secondary: 'Okse/Kalv',
            mealType: 'Hovedret',
            styles: ['Klassisk'],
            confidence: 96,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Hakket oksekød 180g pr. person',
            'Løg 2 store',
            'Smør til stegning',
            'Salt og peber'
        ]
    },
    {
        recipeId: 'demo-006',
        recipeName: 'Stegt Kylling med Persille',
        category: {
            primary: 'Fjerkræ',
            secondary: 'Fjerkræ',
            mealType: 'Hovedret',
            styles: ['Klassisk', 'Modern'],
            confidence: 94,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Kyllingebryst 150g pr. person',
            'Persille 30g',
            'Hvidløg 2 fed',
            'Olivenolie 50ml',
            'Salt og peber'
        ]
    },
    {
        recipeId: 'demo-007',
        recipeName: 'Grøn Ærtesuppe',
        category: {
            primary: 'Grønne',
            secondary: 'Grønne',
            mealType: 'Suppe',
            styles: ['Modern', 'Klassisk'],
            confidence: 92,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Grønne ærter 500g',
            'Kartofler 300g',
            'Porrer 2 stk',
            'Grøntsagsbouillon 1 liter',
            'Fløde 1 dl'
        ]
    },
    {
        recipeId: 'demo-008',
        recipeName: 'Rødgrød med Fløde',
        category: {
            primary: 'Diverse',
            secondary: 'Diverse',
            mealType: 'Dessert',
            styles: ['Klassisk', 'Gammeldags'],
            confidence: 99,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Jordbær 300g',
            'Hindbær 200g',
            'Ribs 200g',
            'Sukker 150g',
            'Kartoffelmel 50g',
            'Fløde til servering'
        ]
    },
    {
        recipeId: 'demo-009',
        recipeName: 'Æblekage',
        category: {
            primary: 'Diverse',
            secondary: 'Diverse',
            mealType: 'Dessert',
            styles: ['Klassisk', 'Gammeldags'],
            confidence: 98,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Æbler 1 kg',
            'Rasp 200g',
            'Smør 100g',
            'Sukker 100g',
            'Flødeskum til servering'
        ]
    },
    {
        recipeId: 'demo-010',
        recipeName: 'Havregrød med Kanel',
        category: {
            primary: 'Diverse',
            secondary: 'Diverse',
            mealType: 'Grød',
            styles: ['Klassisk'],
            confidence: 100,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Havregryn 1 dl pr. person',
            'Mælk 2 dl',
            'Vand 1 dl',
            'Kanel',
            'Sukker efter smag'
        ]
    },
    {
        recipeId: 'demo-011',
        recipeName: 'Kalvesteg med Svampe',
        category: {
            primary: 'Okse/Kalv',
            secondary: 'Okse/Kalv',
            mealType: 'Hovedret',
            styles: ['Klassisk', 'Højtid'],
            confidence: 96,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Kalvesteg 180g pr. person',
            'Champignon 300g',
            'Hvidløg 3 fed',
            'Timian frisk',
            'Rødvin 2 dl'
        ]
    },
    {
        recipeId: 'demo-012',
        recipeName: 'Spinattærte',
        category: {
            primary: 'Grønne',
            secondary: 'Grønne',
            mealType: 'Hovedret',
            styles: ['Modern', 'International'],
            confidence: 94,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Spinat 500g',
            'Butterdej 1 pk',
            'Feta 200g',
            'Æg 3 stk',
            'Fløde 2 dl'
        ]
    },
    {
        recipeId: 'demo-013',
        recipeName: 'Risengrød med Smør og Kanel',
        category: {
            primary: 'Diverse',
            secondary: 'Diverse',
            mealType: 'Grød',
            styles: ['Klassisk', 'Højtid'],
            confidence: 100,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Grødris 2 dl',
            'Mælk 1 liter',
            'Smør til servering',
            'Kanel',
            'Sukker'
        ]
    },
    {
        recipeId: 'demo-014',
        recipeName: 'Bagt Laks med Dild',
        category: {
            primary: 'Fisk',
            secondary: 'Fisk',
            mealType: 'Hovedret',
            styles: ['Modern', 'Klassisk'],
            confidence: 97,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Laksefilet 150g pr. person',
            'Dild frisk 30g',
            'Citron 1 stk',
            'Olivenolie 50ml',
            'Salt og peber'
        ]
    },
    {
        recipeId: 'demo-015',
        recipeName: 'Kyllingefilet i Karry',
        category: {
            primary: 'Fjerkræ',
            secondary: 'Fjerkræ',
            mealType: 'Hovedret',
            styles: ['International', 'Modern'],
            confidence: 95,
            autoTagged: true,
            taggedAt: new Date().toISOString()
        },
        ingredients: [
            'Kyllingebryst 150g pr. person',
            'Karry 2 spsk',
            'Kokosmælk 400ml',
            'Ingefær 20g',
            'Løg 1 stk'
        ]
    }
];

export default demoRecipes;
