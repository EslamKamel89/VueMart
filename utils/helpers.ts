export const pr = <T>(value: T, title: string = "") => {
  console.log("");
  console.log(` -=-=-=-=-=-=-=- ${title} -=-=-=-=-=-=-=- `);
  console.log(value);
  console.log("");
  return value;
};

export const sleep = async (time: number) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
};
