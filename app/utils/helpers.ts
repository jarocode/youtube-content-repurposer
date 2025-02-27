export const truncateText = (text: string, limit: number): string => {
  const words = text?.split(" ");
  if (words?.length <= limit) return text;
  return words?.slice(0, limit).join(" ") + "...";
};
