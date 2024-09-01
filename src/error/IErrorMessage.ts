export interface IErrorMessage {
   error: string;
   message: string;
   customMessage: string;
}

export function processErrorMessages(errorMessages: IErrorMessage[]): string {
   const result = errorMessages.map((errorMsg) => [
      errorMsg.message,
      errorMsg.customMessage,
   ]);
   return result.join(' / ');
}
