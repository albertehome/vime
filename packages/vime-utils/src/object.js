import { is_object, is_array } from './unit';

export const create_prop = (
  object,
  key,
  descriptor,
) => Object.defineProperty(object, key, descriptor);

/**
 * Performs a deep merge of `source` into `target`.
 * Mutates `target` only but not its objects and arrays.
 *
 * @see https://stackoverflow.com/a/48218209
 */
export const merge_obj_deep = (target, source) => {
  if (!is_object(target) || !is_object(source)) {
    return source;
  }

  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (is_array(targetValue) && is_array(sourceValue)) {
      // eslint-disable-next-line no-param-reassign
      target[key] = targetValue.concat(sourceValue);
    } else if (is_object(targetValue) && is_object(sourceValue)) {
      // eslint-disable-next-line no-param-reassign
      target[key] = merge_obj_deep({ ...targetValue }, sourceValue);
    } else {
      // eslint-disable-next-line no-param-reassign
      target[key] = sourceValue;
    }
  });

  return target;
};
