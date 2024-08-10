import { AxiosPromise } from 'axios';
import { Transport } from './Transport';

let API_ROOT_PATH = '/omnibuilder/api/v1';
if (process.env.REACT_APP_OMNI_BUILDER_API && process.env.NODE_ENV === 'development') {
    API_ROOT_PATH = process.env.REACT_APP_OMNI_BUILDER_API;
}

export interface CropScale {
    widthPercentage: number;
    heightPercentage: number;
}

export interface OutputSize {
    width: number;
    height: number;
}

export interface CaptureImageInput {
    cropScale: CropScale;
    outputSize: OutputSize;
}

const configuration = {
    captureImage: (configId: string, captureImageInput: CaptureImageInput) => {
        return Transport.post(`${API_ROOT_PATH}/configuration/${configId}/image`, captureImageInput, undefined, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/jpg'
            }
        });
    }
};

export interface ConfiguratorStartup {
    alternativeId: string;
    clientId: string | null;
    createSavedDesign: boolean;
}

export interface LoadConfiguratorInput {
    alternativeId: string;
    quoteId: string;
    lineItemMasterId: string;
}

export interface UserBuilderResult {
    builderId: string;
}

const builders = {
    getUserBuilder: (): AxiosPromise<UserBuilderResult> => {
        return Transport.get(`${API_ROOT_PATH}/builders`);
    }
};

export default {
    configuration,
    builders
};
