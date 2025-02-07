export enum ProductType {
    ALL = 'ALL',
    SMOKABLE = 'SMOKABLE',
    TOPICAL = 'TOPICAL',
    PETS = 'PETS',
    EDIBLES = 'EDIBLES',
    ACCESSORIES = 'ACCESSORIES'
}

export interface Filter {
    photo: string;
    type: ProductType;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    type: ProductType[];
    photos: string[];
    rating: number; // Added rating field
    quantity: number;
}

export const FilterOptions: Filter[] = [
    {
        photo: 'http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575851469-YBAVZ06F9FZRYOSPMMG9/yasmin.jpg',
        type: ProductType.ALL
    },
    {
        photo: 'http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575851005-O22SCLM2200NXLL0COL6/LOVELY+LAVENDER.jpg',
        type: ProductType.SMOKABLE
    },
    {
        photo: 'http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575849912-ZY71UJ5LWTNRBTZKZR8J/lolita.jpg',
        type: ProductType.TOPICAL
    },
    {
        photo: 'http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575848050-XIMEV1ZFE18J155X2CN9/CITRUS+ISLAND.jpg',
        type: ProductType.PETS
    },
    {
        photo: 'http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575851469-YBAVZ06F9FZRYOSPMMG9/yasmin.jpg',
        type: ProductType.EDIBLES
    }, // Reusing one of the existing photos
    {
        photo: 'http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575851005-O22SCLM2200NXLL0COL6/LOVELY+LAVENDER.jpg',
        type: ProductType.ACCESSORIES
    } // Reusing another existing photo
];

export const products: Product[] = [
    {
        id: '1',
        name: 'Bath Bomb',
        price: 19.99,
        description: 'A soothing bath bomb with essential oils to provide a relaxing experience.',
        type: [ProductType.TOPICAL, ProductType.SMOKABLE],
        photos: [
            'http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575851469-YBAVZ06F9FZRYOSPMMG9/yasmin.jpg',
            'http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575851005-O22SCLM2200NXLL0COL6/LOVELY+LAVENDER.jpg',
            'http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575849912-ZY71UJ5LWTNRBTZKZR8J/lolita.jpg',
            'http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575848050-XIMEV1ZFE18J155X2CN9/CITRUS+ISLAND.jpg'
        ],
        rating: 4,
        quantity: 0
    },
    {
        id: '2',
        name: 'CBD Vape Pen',
        price: 34.99,
        description: 'A sleek vape pen for a smooth and flavorful CBD experience.',
        type: [ProductType.SMOKABLE],
        photos: ['https://images.pexels.com/photos/2280543/pexels-photo-2280543.jpeg'],
        rating: 4.5,
        quantity: 0
    },
    {
        id: '3',
        name: 'Pet CBD Oil',
        price: 29.99,
        description: 'CBD oil specially formulated for pets to help with anxiety and joint pain.',
        type: [ProductType.PETS],
        photos: [
            'https://images.pexels.com/photos/4050293/pexels-photo-4050293.jpeg',
            'https://images.pexels.com/photos/45171/pexels-photo-45171.jpeg'
        ],
        rating: 4,
        quantity: 0
    },
    {
        id: '4',
        name: 'Gummy Bears',
        price: 15.99,
        description: 'Delicious and chewy CBD-infused gummy bears for a sweet treat.',
        type: [ProductType.EDIBLES],
        photos: [],
        rating: 4.5,
        quantity: 0
    },
    {
        id: '5',
        name: 'Glass Pipe',
        price: 24.99,
        description: 'A stylish glass pipe for your smoking needs.',
        type: [ProductType.ACCESSORIES],
        photos: [],
        rating: 4,
        quantity: 0
    }
];
