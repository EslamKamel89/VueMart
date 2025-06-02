export function tableDateFormatter(date: Date | string) {
  const formatter = new Intl.DateTimeFormat("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
  });
  if (typeof date == "string") {
    return formatter.format(Date.parse(date));
  }
  return formatter.format(date);
}
