import React, { useEffect, useState } from 'react';
import thirdParty from '../../../api/thirdParty';

const Dispensary = () => {
    const [helper, setHelper] = useState<string[]>([]);

    const getPokemonList = async () => {
        try {
            const response = (await thirdParty.pokemon.getList()).data.results;
            setHelper(response);
        } catch (e) {
            console.error(e);
        } finally {
        }
    };

    useEffect(() => {
        const catchThePokemon = async () => {
            await getPokemonList();
        };
        catchThePokemon();
    }, [helper]);

    return (
        <>
            <div>
                {helper.map((c: any) => {
                    return (
                        <>
                            {c.name}
                            <br />
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default Dispensary;
