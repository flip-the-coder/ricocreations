import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react';
import Gallery from '../../ImageGallery/Gallery';
import { Product, products, ProductType, FilterOptions } from '../../../models/Product';
import CategoryFilter from './CategoryFilter/CategoryFilter';
import { HomeStyles } from './Home.style';
import { useStores } from '../../../hooks/useStores';
import flipTheCoders from '../../../api/flipTheCoders';

const Home: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<ProductType>(ProductType.ALL);
    const { cartStore } = useStores();
    const { MainContainer, ProductContainer, Description, ProductList, ImagesContainer, QuantityPicker } = HomeStyles;

    const handleCategoryChange = (category: ProductType) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        const getInitialJavaApiCall = async () => {
            const message = (await flipTheCoders.flipTheCoders.getList()).data;
            console.log(message);
        };
        getInitialJavaApiCall();
    }, []);

    const filteredProducts =
        selectedCategory === ProductType.ALL
            ? products
            : products.filter((product) => product.type.includes(selectedCategory));

    const handleIncreaseQuantity = (product: Product) => {
        const cartItem = cartStore.cart.find((item) => item.id === product.id);
        if (cartItem) {
            cartStore.updateItemQuantity(cartItem.id, cartItem.quantity + 1);
        }
    };

    const handleDecreaseQuantity = (product: Product) => {
        const cartItem = cartStore.cart.find((item) => item.id === product.id);
        if (cartItem && cartItem.quantity > 1) {
            cartStore.updateItemQuantity(cartItem.id, cartItem.quantity - 1);
        } else {
            cartStore.removeFromCart(product.id);
        }
    };

    const renderQuantityPicker = (product: Product) => {
        const cartItem = cartStore.cart.find((item) => item.id === product.id);
        return (
            <QuantityPicker>
                <button onClick={() => handleDecreaseQuantity(product)}>-</button>
                <div>{cartItem?.quantity || 0}</div>
                <button onClick={() => handleIncreaseQuantity(product)}>+</button>
            </QuantityPicker>
        );
    };

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
                        {cartStore.cart.find((item) => item.id === product.id) ? (
                            renderQuantityPicker(product)
                        ) : (
                            <button onClick={() => cartStore.addToCart(product)}>Add to Cart</button>
                        )}
                    </ProductContainer>
                ))}
            </ProductList>
        </MainContainer>
    );
};

export default observer(Home);
