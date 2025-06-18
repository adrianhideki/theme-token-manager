function isObject(item: unknown) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export default function deepMerge<T>(
  base: Record<string, unknown>,
  target: Record<string, unknown>
) {
  const output = Object.assign({}, base);

  if (!(isObject(base) && isObject(target))) {
    return base as T;
  }

  Object.keys(target).forEach((field) => {
    const isObjectInTarget = isObject(target[field]);
    const isObjectInBaseOrUndefined =
      isObject(base[field]) || base?.[field] === undefined;

    if (isObjectInTarget && isObjectInBaseOrUndefined) {
      if (!(field in base)) {
        Object.assign(output, { [field]: target[field] });
      } else
        output[field] = deepMerge(
          base[field] as Record<string, unknown>,
          target[field] as Record<string, unknown>
        );
    } else {
      Object.assign(output, { [field]: target[field] });
    }
  });

  return output as T;
}
