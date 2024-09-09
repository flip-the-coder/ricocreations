import { useState } from 'react';

const useExpandableCards = (initialOpenIndices: number[] = []) => {
    const [openCardIndices, setOpenCardIndices] = useState<number[]>(initialOpenIndices);

    const toggleCard = (index: number) => {
        setOpenCardIndices((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
    };

    return { openCardIndices, toggleCard };
};

export default useExpandableCards;
