import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Gallery from '../../ImageGallery/Gallery';
import { Product, products, ProductType, FilterOptions } from '../../../models/Product';
import CategoryFilter from './CategoryFilter/CategoryFilter';
import { HomeStyles } from './Home.style';

const Home: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<ProductType>(ProductType.ALL);
    const { MainContainer, ProductContainer, ImagesContainer, Description, ProductList } = HomeStyles;

    const handleCategoryChange = (category: ProductType) => {
        setSelectedCategory(category);
    };

    const filteredProducts =
        selectedCategory === ProductType.ALL
            ? products
            : products.filter((product) => product.type.includes(selectedCategory));

    return (
        <MainContainer>
            <CategoryFilter
                filterOptions={FilterOptions}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />
            <ProductList>
                {filteredProducts.map((product: Product) => (
                    <ProductContainer key={product.id}>
                        <ImagesContainer>
                            <Gallery photos={product.photos} />
                        </ImagesContainer>
                        <h2>{product.name}</h2>
                        <Description>{product.description}</Description>
                        <p>Price: ${product.price.toFixed(2)}</p>
                    </ProductContainer>
                ))}
            </ProductList>
        </MainContainer>
    );
};

export default observer(Home);
