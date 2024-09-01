import { Transport } from './Transport';
let API_ROOT_PATH = 'https://pokeapi.co/api/v2';
const pokemon = {
   getList: () => {
      return Transport.get(`${API_ROOT_PATH}/pokemon?limit=151`);
   },
};

// eslint-disable-next-line
export default { pokemon };
