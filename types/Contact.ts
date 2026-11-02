import type { ApiResponseError } from '@/types/Api.ts';

export interface FormWrapper<FieldsType, ErrorsType extends ApiResponseError> {
  fields: FieldsType;
  errors: ErrorsType;
  isFaulty: boolean;
  isDirty: boolean;
  isProcessing: boolean;
  setErrors: (errors: Partial<ErrorsType>) => void;
  setErrorResponse: (error: ApiResponseError | unknown) => void;
  clearErrors: () => void;
  reset: () => void;
  getChangedFields: () => Partial<FieldsType>;
  getFields: (fields: (keyof FieldsType)[]) => Partial<FieldsType>;
}

export interface ContactFormFields {
  name: string;
  email: string;
  message: string;
}

// inside mutation
export interface SendContactResponse {
  data: {
    sendContactEmail: {
      success: boolean;
      message: string;
    };
  };
}
