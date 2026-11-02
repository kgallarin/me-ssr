import type { ContactFormFields, SendContactResponse } from '@/types/Contact.ts';

export function useContactForm() {
  const { $api } = useNuxtApp();
  async function submitForm(
    payload: ContactFormFields,
  ): Promise<SendContactResponse> {
    return await $api('/contact', {
      method: 'POST',
      body: {
        payload,
      },
    });
  }

  return {
    submitForm,
  };
}
