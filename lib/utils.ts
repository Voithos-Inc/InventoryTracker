import { titleCase } from 'title-case';

export const stringIsNumeric = (s: string): boolean => { return /^\d*[.,]?\d*$/.test(s) }

export function getPositiveFloat(text: string) : number | undefined {
  if (text === "") return 0;

  text = text.replace(',', '.');

  if (!stringIsNumeric(text)) return;

  const num = parseFloat(text);
  if (num < 0) return

  if (!isNaN(num)) return num
  // else if (!isNaN(parseFloat(text.substring(0, text.length - 1))) && text.at(text.length - 1) === ".") return num /// CODE HERE is attempt to return if decimal, doesnt work
  else if (text === "" || text === ".") return 0
}

export function anyToTitleCase(text: string) { 
  const t = text.toLowerCase();
  return titleCase(t);
}
