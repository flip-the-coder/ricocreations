export enum ProductType {
    ALL = "ALL",
    SMOKABLE = "SMOKABLE",
    TOPICAL = "TOPICAL",
    PETS = "PETS",
    EDIBLES = "EDIBLES",
    ACCESSORIES = "ACCESSORIES"
}

export interface Filter {
    photo: string; 
    type: ProductType;
}

// Initialize `Categories` with `Filter` objects including representative photo URLs
export const FilterOptions: Filter[] = [
    { photo: 'https://via.placeholder.com/150?text=All', type: ProductType.ALL },
    { photo: 'https://via.placeholder.com/150?text=Smokable', type: ProductType.SMOKABLE },
    { photo: 'https://via.placeholder.com/150?text=Topical', type: ProductType.TOPICAL },
    { photo: 'https://via.placeholder.com/150?text=PETS', type: ProductType.PETS },
    { photo: 'https://via.placeholder.com/150?text=Edibles', type: ProductType.EDIBLES },
    { photo: 'https://via.placeholder.com/150?text=Accessories', type: ProductType.ACCESSORIES }
];

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    type: ProductType[];
    photos: string[];
}

export const products: Product[] = [
    {
        id: "1",
        name: "Bath Bomb",
        price: 19.99,
        description: "A soothing bath bomb with essential oils to provide a relaxing experience.",
        type: [ProductType.TOPICAL],
        photos: [
            "http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575851469-YBAVZ06F9FZRYOSPMMG9/yasmin.jpg",
            "http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575851005-O22SCLM2200NXLL0COL6/LOVELY+LAVENDER.jpg",
            "http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575849912-ZY71UJ5LWTNRBTZKZR8J/lolita.jpg",
            "http://images.squarespace-cdn.com/content/v1/5c72d15fc46f6d147ea478e5/1570575848050-XIMEV1ZFE18J155X2CN9/CITRUS+ISLAND.jpg"
        ]
    },
    {
        id: "2",
        name: "CBD Vape Pen",
        price: 34.99,
        description: "A sleek vape pen for a smooth and flavorful CBD experience.",
        type: [ProductType.SMOKABLE],
        photos: [
            "https://images.pexels.com/photos/1048306/pexels-photo-1048306.jpeg",
            "https://images.pexels.com/photos/2280543/pexels-photo-2280543.jpeg"
        ]
    },
    {
        id: "3",
        name: "Pet CBD Oil",
        price: 29.99,
        description: "CBD oil specially formulated for pets to help with anxiety and joint pain.",
        type: [ProductType.PETS],
        photos: [
            "https://images.pexels.com/photos/4050293/pexels-photo-4050293.jpeg",
            "https://images.pexels.com/photos/45171/pexels-photo-45171.jpeg"
        ]
    },
    {
        id: "4",
        name: "Gummy Bears",
        price: 15.99,
        description: "Delicious and chewy CBD-infused gummy bears for a sweet treat.",
        type: [ProductType.EDIBLES],
        photos: [
            "https://images.pexels.com/photos/466803/pexels-photo-466803.jpeg",
            "https://images.pexels.com/photos/1047047/pexels-photo-1047047.jpeg"
        ]
    },
    {
        id: "5",
        name: "Glass Pipe",
        price: 24.99,
        description: "A stylish glass pipe for your smoking needs.",
        type: [ProductType.ACCESSORIES],
        photos: [
            "https://images.pexels.com/photos/2696140/pexels-photo-2696140.jpeg",
            "https://images.pexels.com/photos/428378/pexels-photo-428378.jpeg"
        ]
    }
];
