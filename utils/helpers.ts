export const pr = <T>(value: T, title: string = "") => {
  console.log("");
  console.log(` -=-=-=-=-=-=-=- ${title} -=-=-=-=-=-=-=- `);
  console.log(value);
  console.log("");
  return value;
};
