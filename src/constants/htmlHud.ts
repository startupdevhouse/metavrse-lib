import { HTMLHudElementType, HTMLHudSupportedTags } from '../types';

export const HTML_HUD_SUPPORTED_TAG_NAMES: ReadonlyArray<HTMLHudSupportedTags> =
  ['div', 'img', 'input'];

export const HTML_HUD_SUPPORTED_DROP_TYPES = <const>[
  'htmlHud.div',
  'htmlHud.img',
  'htmlHud.input',
];

export const HTML_HUD_ELEMENT_TYPE_NAME_MAP: Record<
  HTMLHudElementType,
  string
> = {
  hud: 'hud',
  'square-floating': 'square (floating)',
  'square-inline': 'square (inline)',
  text: 'text',
  image: 'image',
  input: 'input',
};

/**
 * @description Elements that cannot nest children
 * @docs {@link https://developer.mozilla.org/en-US/docs/Glossary/Empty_element}
 */
export const HTML_HUD_EMPTY_ELEMENTS = <const>[
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
];

export const HTML_HUD_EMPTY_ELEMENTS_DROP_TYPES = HTML_HUD_EMPTY_ELEMENTS.map(
  (t) => `htmlHud.${t}`
) as Array<`htmlHud.${typeof HTML_HUD_EMPTY_ELEMENTS[number]}`>;
