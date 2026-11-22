import type { DeepPartial } from '#app/config';
import type { NavLink } from '@/types/Props.ts';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const navLinkSeeder = (isTemplateType: boolean = false) => {
  const label = faker.word.sample(9);
  const routeNameExample = faker.word.sample(1);
  if (isTemplateType) {
    return {
      label: '',
      to: '',
      icon: '',
    };
  }

  return {
    label,
    to: `/${routeNameExample}`,
    icon: faker.word.sample(1),
  };
};

export const createNavLink = (
  overrides?: DeepPartial<NavLink>,
  isTemplateType: boolean = false,
): NavLink => defu(overrides, navLinkSeeder(isTemplateType)) as NavLink;

export const createNavLinks = (
  quantity: number,
  overrides?: DeepPartial<NavLink>,
  isTemplateType: boolean = false,
): NavLink[] => {
  return Array.from({ length: quantity }, (): NavLink =>
    createNavLink(overrides, isTemplateType),
  );
};
