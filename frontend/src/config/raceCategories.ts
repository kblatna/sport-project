/**
 * Race categories configuration
 * Defines age groups, categories, and race distances for different participant types
 *
 * This centralized configuration makes it easier to update race categories
 * without modifying component code. In the future, this could be fetched from an API.
 */

export interface RaceOption {
    label: string
    value: string
}

export interface AgeGroupRule {
    min: number
    max: number
    options: RaceOption[]
}

export interface CategoryOptions {
    label: string
    value: string
}

/**
 * Category options based on age
 */
export const getCategoryOptions = (age: number | null): CategoryOptions[] => {
    if (age === null) return []

    if (age <= 17) {
        return [
            { label: 'Dívka', value: 'girl' },
            { label: 'Chlapec', value: 'boy' }
        ]
    } else {
        return [
            { label: 'Žena', value: 'female' },
            { label: 'Muž', value: 'male' }
        ]
    }
}

/**
 * Race rules for different categories
 * Each category has age-based rules determining available race distances
 */
export const RACE_RULES: Record<string, AgeGroupRule[]> = {
    female: [
        {
            min: 18,
            max: 39,
            options: [{ label: '15 km (3 kola) - Z15', value: 'Z15' }]
        },
        {
            min: 40,
            max: 49,
            options: [{ label: '15 km (3 kola) - ZV15', value: 'ZV15' }]
        },
        {
            min: 50,
            max: Infinity,
            options: [{ label: '15 km (3 kola) - ZW15', value: 'ZW15' }]
        }
    ],
    male: [
        {
            min: 18,
            max: 39,
            options: [
                { label: '15 km (3 kola) - M15', value: 'M15' },
                { label: '30 km (6 kol) - M30', value: 'M30' }
            ]
        },
        {
            min: 40,
            max: 49,
            options: [
                { label: '15 km (3 kola) - V15', value: 'V15' },
                { label: '30 km (6 kol) - V30', value: 'V30' }
            ]
        },
        {
            min: 50,
            max: 59,
            options: [
                { label: '15 km (3 kola) - W15', value: 'W15' },
                { label: '30 km (6 kol) - W30', value: 'W30' }
            ]
        },
        {
            min: 60,
            max: Infinity,
            options: [
                { label: '15 km (3 kola) - WV15', value: 'WV15' },
                { label: '30 km - WV30', value: 'WV30' }
            ]
        }
    ],
    girl: [
        {
            min: 0,
            max: 5,
            options: [{ label: '140 m - Z1', value: 'Z1' }]
        },
        {
            min: 6,
            max: 7,
            options: [{ label: '350 m - Z2', value: 'Z2' }]
        },
        {
            min: 8,
            max: 9,
            options: [{ label: '700 m - Z3', value: 'Z3' }]
        },
        {
            min: 10,
            max: 12,
            options: [{ label: '5 km (2 kola) - Z5', value: 'Z5' }]
        },
        {
            min: 13,
            max: 14,
            options: [{ label: '7,5 km (3 kola) - Z7', value: 'Z7' }]
        },
        {
            min: 15,
            max: 17,
            options: [{ label: '10 km (4 kola) - Z10', value: 'Z10' }]
        }
    ],
    boy: [
        {
            min: 0,
            max: 5,
            options: [{ label: '140 m - M1', value: 'M1' }]
        },
        {
            min: 6,
            max: 7,
            options: [{ label: '350 m - M2', value: 'M2' }]
        },
        {
            min: 8,
            max: 9,
            options: [{ label: '700 m - M3', value: 'M3' }]
        },
        {
            min: 10,
            max: 12,
            options: [{ label: '5 km (2 kola) - M5', value: 'M5' }]
        },
        {
            min: 13,
            max: 14,
            options: [{ label: '7,5 km (3 kola) - M7', value: 'M7' }]
        },
        {
            min: 15,
            max: 17,
            options: [{ label: '10 km (4 kola) - M10', value: 'M10' }]
        }
    ]
}

/**
 * Get race options for a specific category and age
 * @param category - The participant category (female, male, girl, boy)
 * @param age - The participant's age
 * @returns Array of available race options or empty array if no match
 */
export const getRaceOptions = (category: string, age: number | null): RaceOption[] => {
    if (!category || age === null || age === undefined || !RACE_RULES[category]) {
        return []
    }

    const rule = RACE_RULES[category].find(({ min, max }) => age >= min && age <= max)
    return rule ? rule.options : []
}

/**
 * Check if a category requires manual race selection
 * @param category - The participant category
 * @returns true if the category allows multiple race options
 */
export const requiresRaceSelection = (category: string): boolean => {
    return category === 'male'
}
