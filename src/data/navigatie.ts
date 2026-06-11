export interface NavDoel {
  label: string;
  doelPad: string;
}

/**
 * Single source for navigation targets. Header and footer compose their own
 * display order (both orders come from the design), but the label and path of
 * each target are defined once here.
 */
export const navDoelen = {
  onderdelen: { label: 'Onderdelen', doelPad: '/gebruikte-onderdelen/' },
  autoVerkopen: { label: 'Auto verkopen', doelPad: '/auto-verkopen/' },
  demontage: { label: 'Demontage', doelPad: '/demontage/' },
  overOns: { label: 'Over ons', doelPad: '/over-ons/' },
  contact: { label: 'Contact', doelPad: '/contact/' },
} as const satisfies Record<string, NavDoel>;
