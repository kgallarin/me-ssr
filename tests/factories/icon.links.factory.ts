import type { DeepPartial } from '#app/config';
import type { FaIconSingle, IconLink } from '@/types/Icons.ts';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const iconLinkSeeder = (isTemplateType: boolean = false) => {
  const name = faker.word.sample(10);
  const url = faker.internet.url();

  if (isTemplateType) {
    return {
      id: '',
      name: '',
      url: '',
      icon: [] as FaIconSingle,
      classColor: '',
    };
  }

  return {
    id: faker.string.sample(5),
    name,
    url,
    icon: faker.helpers.multiple(() => faker.word.sample(4), { count: 2 }),
    classColor: faker.word.sample(3),
  };
};

export const createIconLink = (
  overrides?: DeepPartial<IconLink>,
  isTemplateType: boolean = false,
): IconLink => defu(overrides, iconLinkSeeder(isTemplateType)) as IconLink;

export const createIconLinks = (
  quantity: number,
  overrides?: DeepPartial<IconLink>,
  isTemplateType: boolean = false,
): IconLink[] => {
  return Array.from({ length: quantity }, (): IconLink =>
    createIconLink(overrides, isTemplateType),
  );
};
