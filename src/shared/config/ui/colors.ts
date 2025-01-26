import tailwindColors from 'tailwindcss/colors';

// Remove deprecated colors in default tailwind palette to fix warning
// @ts-expect-error: ignore a compile error like this unreachable code
delete tailwindColors.lightBlue;
// @ts-expect-error: ...
delete tailwindColors.warmGray;
// @ts-expect-error: ...
delete tailwindColors.trueGray;
// @ts-expect-error: ...
delete tailwindColors.coolGray;
// @ts-expect-error: ...
delete tailwindColors.blueGray;

const customColors = {
  white: {
    50: '#ffffff', // Adjust all shades of white to be '#ffffff'
  },
};

/**
 * Extend default Tailwind color palette with missing Mantine colors
 * NOTE: Mantine supports only 10 colors in each color-shade
 */
const colors = {
  ...tailwindColors,
  // Mantine colors, that's missing in tw palette
  // generate colors through https://mantine.dev/colors-generator
  ...customColors,
};

export { colors };
