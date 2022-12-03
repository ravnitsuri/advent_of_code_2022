const fs = require("fs/promises");

const convertToPriority = (word) => {
  let wordMap = {};
  let wordStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let startIdx = 1;
  for (let char of wordStr) {
    wordMap[char] = startIdx;
    startIdx++;
  }
  return wordMap[word];
};

const findCommonChar = (s1, s2) => {
  for (let char of s1) {
    if (s2.includes(char)) {
      return char;
    }
  }
};

let main = async () => {
  try {
    let input = await fs.readFile("./day3/input_prod", { encoding: "utf-8" });
    const format = (input) =>
      input
        .split("\n")
        .map((_) => [
          _.substring(0, _.length / 2),
          _.substring(_.length / 2, _.length),
        ]);
    const formattedInput = format(input);

    let output = 0;

    for (const [s1, s2] of formattedInput) {
      let char = findCommonChar(s1, s2);
      let priority = convertToPriority(char);
      output += priority;
    }

    console.log({ formattedInput, output });
  } catch (error) {
    console.log({ error });
  }
};
main();
