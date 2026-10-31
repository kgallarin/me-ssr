// scroll reveal
export type ScrollRevealDirections = 'up' | 'down' | 'left' | 'right' | 'none';
export interface ScrollRevealOptions {
  animateOnce?: boolean;
  animateOnlyScrollDown?: boolean;
  direction?: MaybeRefOrGetter<ScrollRevealDirections>;
  distance?: MaybeRefOrGetter<number>;
  threshold?: number;
}
