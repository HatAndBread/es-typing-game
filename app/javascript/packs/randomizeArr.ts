const randomizeArr = (arr: string[]): string[] => {
  const copy = arr.map((e) => e);
  const randoArr = [];
  while (copy.length > 0) {
    const ran = Math.floor(Math.random() * copy.length);
    randoArr.push(copy.splice(ran, 1)[0]);
  }
  return randoArr;
};

export { randomizeArr };
