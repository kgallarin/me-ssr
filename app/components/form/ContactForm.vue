<script setup lang="ts">
  import { ref } from 'vue';

  import type { ContactFormFields } from '@/types/Contact.ts';
  import BaseContainer from '@components/base/BaseContainer.vue';
  import BaseInput from '@components/base/BaseInput.vue';
  import { toTypedSchema } from '@vee-validate/zod';
  import type { FetchError } from 'ofetch';
  import { z } from 'zod';
  import { useContactForm } from '~/composables/contact/useContactForm.ts';

  const successMessage = ref('');

  const createContactFormSchema = toTypedSchema(
    z.object({
      attributes: z.object({
        name: z
          .string({
            message: 'Please let me know what should I call you',
          })
          .min(4, { message: 'a decent length?' }),

        email: z
          .string({
            message: 'Your active email so I can response back',
          })
          .email({
            message: 'A valid one please',
          })
          .min(1, { message: 'Let me know your email' }),

        message: z
          .string({
            message: 'Let me know your message',
          })
          .min(10, { message: 'At least 10 characters will do.' }),
      }),
    }),
  );

  const {
    defineField,
    errors,
    submitCount,
    setApiErrorsToForm,
    handleSubmit,
    resetForm,
  } = useAppForm({
    schema: createContactFormSchema,
  });

  const [name] = defineField('attributes.name');
  const [email] = defineField('attributes.email');
  const [message] = defineField('attributes.message');

  const { submitForm } = useContactForm();
  const isProcessing = ref(false);
  const generalErrors = ref('');

  const submit = handleSubmit(async (values) => {
    isProcessing.value = true;
    try {
      const response = await submitForm(values.attributes as ContactFormFields);
      successMessage.value = response.data.sendContactEmail.message;

      resetForm();
    } catch (e) {
      setApiErrorsToForm(e);

      const err = e as FetchError<{ message?: string }>;
      generalErrors.value =
        err?.data?.message ||
        err?.statusMessage ||
        'An unexpected error occurred. Please try again.';

      isProcessing.value = false;
    } finally {
      isProcessing.value = false;
    }
  });
</script>

<template>
  <base-container class="py-16 md:py-32">
    <h3 class="mb-16 font-proxima text-3xl font-light">Or send me an email</h3>

    <div
      v-if="successMessage"
      class="mb-8 rounded-md bg-green-100 p-4 text-green-700"
    >
      {{ successMessage }}
    </div>

    <form @submit.prevent="submit">
      <div v-if="generalErrors" class="mb-4 text-red-500">
        {{ generalErrors }}
      </div>

      <base-input
        v-model="name"
        label="Name or alias"
        placeholder="How should I call you?"
        :error="
          submitCount > 0 && errors['attributes.name']
            ? errors['attributes.name']
            : ''
        "
      />

      <base-input
        v-model="email"
        type="email"
        label="Email"
        placeholder="your_awesome@email.com"
        :error="
          submitCount > 0 && errors['attributes.email']
            ? errors['attributes.email']
            : ''
        "
      />

      <base-input
        v-model="message"
        type="textarea"
        label="Message"
        placeholder="What's on your mind?"
        :error="
          submitCount > 0 && errors['attributes.message']
            ? errors['attributes.message']
            : ''
        "
        rows="4"
      />

      <div class="flex justify-end">
        <button
          type="submit"
          :disabled="isProcessing"
          class="focus:ring-primary-dark w-full rounded-md bg-primary px-6 py-3 font-proxima text-lg font-medium text-secondary hover:bg-secondary hover:text-primary focus:border-transparent focus:outline-none focus:ring-2 disabled:opacity-50 md:w-fit"
        >
          {{ isProcessing ? 'Sending...' : 'Send' }}
        </button>
      </div>
    </form>
  </base-container>
</template>
