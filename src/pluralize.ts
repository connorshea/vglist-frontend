/**
 * Filter for pluralizing a word based on the amount provided, will simply
 * append an `s` to the singular form by default, or you can pass the plural
 * form as the third argument for irregular pluralizations.
 * 
 * Based on this Gist:
 * https://gist.github.com/ndabAP/d7a338407bb22794418bc64875af14ee
 *
 * Example:
 * 
 *     pluralize(1, 'cookie'); // => cookie
 *     pluralize(2, 'cookie'); // => cookies
 *     pluralize(1, 'octopus', 'octopi'); // => octopus
 *     pluralize(2, 'octopus', 'octopi'); // => octopi
 */
export const pluralize = (amount: number, singular: string, plural: string | null = null): string => {
  if (plural === null) {
    plural = `${singular}s`;
  }
  return (amount > 1 || amount === 0) ? plural : singular;
}
