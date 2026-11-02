import { contactService } from '#server/services/contact.service.ts';
import type { ContactFormFields, SendContactResponse } from '@/types/Contact.ts';
import type { H3Event } from 'h3';

export default defineEventHandler(
  async (event: H3Event): Promise<SendContactResponse> => {
    const body = await readBody<{ payload: ContactFormFields }>(event);

    return await contactService(event, body.payload);
  },
);
