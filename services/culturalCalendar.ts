/**
 * CULTURAL CALENDAR SERVICE
 * 
 * Enforces Danish traditions and 'Livretter' (Favorites).
 * Source: Standard Danish Culinary Tradition + Hospital/Care Home Tradition.
 */

interface HolidayRule {
    name: string;
    month: number; // 1-12
    day: number;
    requiredKeywords: string[]; // Dish MUST contain one of these
    description: string;
}

const HOLIDAYS: HolidayRule[] = [
    { name: 'Nytårsdag', month: 1, day: 1, requiredKeywords: ['torsk', 'hamburgerryg', 'grønlangkål'], description: 'Torsk eller Hamburgerryg' },
    { name: 'Fastelavn', month: 2, day: 15, requiredKeywords: ['boller', 'kakao'], description: 'Fastelavnsboller (approx date)' }, // Date varies, hardcoded for 2026/2025 approx check
    { name: 'Påske (Søndag)', month: 4, day: 5, requiredKeywords: ['lam', 'æg', 'kylling'], description: 'Lam eller Påskefrokost' }, // Approx for 2026
    { name: 'Store Bededag', month: 5, day: 1, requiredKeywords: ['hveder'], description: 'Varme Hveder' }, // If still celebrated in food culture
    { name: 'Sankt Hans', month: 6, day: 23, requiredKeywords: ['grill', 'pølser', 'kartoffelsalat', 'jordbær'], description: 'Grillmad eller Jordbær' },
    { name: 'Mortens Aften', month: 11, day: 10, requiredKeywords: ['and', 'gås'], description: 'Andesteg' },
    { name: 'Lillejuleaften', month: 12, day: 23, requiredKeywords: ['risengrød', 'jule'], description: 'Risengrød' },
    { name: 'Juleaften', month: 12, day: 24, requiredKeywords: ['and', 'flæskesteg', 'risalamande'], description: 'And og Flæskesteg' },
    { name: 'Julefrokost', month: 12, day: 25, requiredKeywords: ['sild', 'laks', 'kål', 'medister'], description: 'Julefrokost klassikere' },
];

const LIVRETTER = [
    'Frikadeller',
    'Karbonader',
    'Krebinetter',
    'Stegt flæsk',
    'Boller i karry',
    'Hakkebøf',
    'Farseret porre',
    'Brændende kærlighed',
    'Tarteletter',
    'Æggekage'
];

export function checkCulturalCompliance(dateStr: string, dishName: string): { isCompliant: boolean, message?: string, isHoliday: boolean } {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dishLower = dishName.toLowerCase();

    // 1. Check Holidays
    const holiday = HOLIDAYS.find(h => h.month === month && h.day === day);
    if (holiday) {
        const hasRequired = holiday.requiredKeywords.some(kw => dishLower.includes(kw));
        if (!hasRequired) {
            return {
                isCompliant: false,
                isHoliday: true,
                message: `MISSING TRADITION: ${holiday.name} kræver ${holiday.description}`
            };
        }
        return { isCompliant: true, isHoliday: true };
    }

    return { isCompliant: true, isHoliday: false };
}

export function isLivret(dishName: string): boolean {
    const dishLower = dishName.toLowerCase();
    return LIVRETTER.some(l => dishLower.includes(l.toLowerCase()));
}
