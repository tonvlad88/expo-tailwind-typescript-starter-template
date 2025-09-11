export const rgb = (value: string, alpha = 1) => {
  return `rgba(${value}, ${alpha})`;
};

export const resolveColor = (theme: any, key: string, alpha = 1): string => {
  const value = theme?.colors?.[key] ?? "0,0,0";
  return rgb(value, alpha);
};
