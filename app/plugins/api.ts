import { type $Fetch } from 'ofetch';
import { useApi }      from '~/composables/api/useApi.ts';

export default defineNuxtPlugin((): { provide: { api: $Fetch } } => {
  const api = useApi();

  return {
    provide: {
      api,
    },
  };
});
