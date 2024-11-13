import { Transport } from './Transport';
let API_ROOT_PATH = 'http://flipthecoders.com/api/v1';
const flipTheCoders = {
    getList: () => {
        return Transport.get(`${API_ROOT_PATH}/hello`);
    }
};

// eslint-disable-next-line
export default { flipTheCoders };
