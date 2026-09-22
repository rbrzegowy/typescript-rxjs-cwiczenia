import { map, pipe, scan, tap } from 'rxjs';
import { $ } from './dom.ts';
import { configDefaults } from 'vitest/config';

type WriteToHtmlConfig = {
  add?: InsertPosition;
  customValueFn?: (d: any) => void;
  sanitizeInput?: boolean;
};
export const writeToHtml = <T>(
  selector: string,
  config: WriteToHtmlConfig = { sanitizeInput: true },
) => {
  const element = $(selector) as HTMLElement;
  return tap<T>((value) => {
    if (!element) {
      return;
    }
    const valueToWrite = String(config?.customValueFn?.(value) || value);
    if (config?.add) {
      element.insertAdjacentHTML(config.add, valueToWrite);
    } else if (!config?.sanitizeInput) {
      element.textContent = valueToWrite;
    } else {
      element.innerHTML = valueToWrite;
    }
  });
};
export const sumWithLabel = (label: string) =>
  pipe(
    scan((acc: number, val: number) => (acc += val)),
    map((v) => label + '-' + v),
  );

export const counter = scan((i) => i++, 1);
