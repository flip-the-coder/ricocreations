import Environment from '../Environment';

export const FILE_STORAGE_API_FILES: string = '/filestorage/api/files';
export const FILE_STORAGE_API: string = '/filestorage/api';
export const FILES_ENDPOINT: string = 'files';
const LINK_ENDPOINT: string = 'link';

export const getImageUrl = (imageUrl: string | undefined | null, link = false): string => {
    if (imageUrl) {
        const endpoint = link ? `${FILES_ENDPOINT}/${LINK_ENDPOINT}` : FILES_ENDPOINT;
        return `${Environment.getOmniBuilderRootPath()}${FILE_STORAGE_API}/${endpoint}${imageUrl}`;
    }
    return '';
};
