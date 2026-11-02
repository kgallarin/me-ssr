import { createAppFetch } from '#server/services/app.service.ts';
import type { ContactFormFields, SendContactResponse } from '@/types/Contact.ts';
import type { H3Event } from 'h3';

export async function contactService(
  event: H3Event,
  payload: ContactFormFields,
): Promise<SendContactResponse> {
  const SEND_CONTACT_MUTATION = `
  mutation SendContact($name: String!, $email: String!, $message: String!) {
    sendContactEmail(name: $name, email: $email, message: $message) {
      success
      message
    }
  }
`;

  const sendContact = createAppFetch(event);

  return await sendContact('', {
    method: 'POST',
    body: {
      query: SEND_CONTACT_MUTATION,
      variables: payload,
    },
  });
}
