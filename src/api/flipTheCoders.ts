import { AxiosPromise } from 'axios';
import { Transport } from './Transport';

//API_ROOT_PATH = 'http://localhost:8080/api';

let API_ROOT_PATH = 'http://localhost:8080/api';
const flipTheCoders = {
    verifyConnection: (): AxiosPromise<string> => {
        return Transport.get(`${API_ROOT_PATH}/initialize/healthcheck`);
    },
    // L85Y8HCXQYPQSR16YGN7AQ3T
    contactUs: (message: {
        name: string;
        email: string;
        phone: string;
        availability: string;
        reason: string;
    }): AxiosPromise<string> => {
        return Transport.post(`${API_ROOT_PATH}/contact/send`, message);
    }
};

// eslint-disable-next-line
export default { flipTheCoders };
