import { AxiosError } from 'axios';
import { Transport } from '../api/Transport';

export const SERVER_CLIENT_TIMESTAMP_MISMATCH =
  'Server/client timestamp mismatch.';

export function handleError(error: unknown): string {
  let errorMessages = '';

  if (Transport.isAxiosError(error)) {
    const serverError = error as AxiosError;

    if (serverError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const responseData = serverError.response.data as any;

      if (responseData.error_description) {
        if (responseData.relatedMessages) {
          const { relatedMessages } = responseData;
          const isTimestampMismatch =
            relatedMessages.filter((m: string) =>
              m.includes(SERVER_CLIENT_TIMESTAMP_MISMATCH)
            ).length > 0;

          if (isTimestampMismatch) {
            errorMessages = SERVER_CLIENT_TIMESTAMP_MISMATCH;
          }
        } else {
          errorMessages = responseData.error_description;
        }
      } else if (responseData.errors) {
        Object.keys(responseData.errors).forEach((key) => {
          errorMessages += responseData.errors[key].join(',');
        });
      } else if (responseData.customMessage) {
        errorMessages = responseData.customMessage;
      } else if (
        Array.isArray(responseData) &&
        responseData.length > 0 &&
        responseData[0].customMessage
      ) {
        errorMessages = responseData[0].customMessage;
      } else {
        errorMessages = 'Error occurred';
      }
    } else if (serverError.request) {
      // The request was made but no response was received
      console.error(serverError.request);
      errorMessages = 'No response received';
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', serverError.message);
      errorMessages = serverError.message;
    }
  } else {
    // Handle non-Axios errors
    if (error instanceof Error) {
      console.error('Error', error.message);
      errorMessages = error.message;
    } else {
      console.error('Unknown error', error);
      errorMessages = 'An unknown error occurred';
    }
  }

  return errorMessages;
}
