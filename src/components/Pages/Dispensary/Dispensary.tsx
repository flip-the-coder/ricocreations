import React, { useEffect, useState } from 'react';
import thirdParty from '../../../api/thirdParty';

const Dispensary = () => {
    const [helper, setHelper] = useState<string[]>([]);

    const getPokemonList = async () => {
        try {
            const response = (await thirdParty.pokemon.getList()).data.results;
            setHelper(response);
            console.log(response);
        } catch (e) {
            console.error(e);
        } finally {
        }
    };

    useEffect(() => {
        console.log('hello there');
        const helpMe = async () => {
            await getPokemonList();
        };
        helpMe();
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
            indeed we are the gods of the new worlds
        </>
    );
};

export default Dispensary;
