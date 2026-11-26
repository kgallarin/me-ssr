import type { DeepPartial } from '#app/config';
import type { NavLink } from '@/types/Props.ts';
import { faker } from '@faker-js/faker';
import { defu } from 'defu';

const navLinkSeeder = (isTemplateType: boolean = false) => {
  const label = faker.word.sample(9);

  const faIcons = ['fa-times', 'fa-heart', 'fa-bars', 'fa-heart'];
  const routeNameExample = ['/', '/about', '/me', '/contact'];
  if (isTemplateType) {
    return {
      label: '',
      to: '',
      icon: '',
    };
  }

  return {
    label,
    to: faker.helpers.arrayElement(routeNameExample),
    icon: faker.helpers.arrayElement(faIcons),
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
