import { Transport } from '../api/Transport';

const downloadFile = async (fileUrl: string, fileName?: string) => {
   if (!fileUrl || fileUrl.length === 0) return;

   try {
      const response = await Transport.getFile(fileUrl);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName ? fileName : getFileName(fileUrl);
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   } catch (e) {
      console.error('Something went wrong downloading a file', e);
   }
};

const getFileName = (fileUrl: string) => {
   return fileUrl.replace(/^.*[\\/]/, '');
};

export const FileUtils = {
   downloadFile,
   getFileName,
};
