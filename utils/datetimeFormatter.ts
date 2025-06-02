export function tableDateFormatter(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
  });
  return formatter.format(date);
}
