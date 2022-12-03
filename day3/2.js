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

const findCommonChar = (s1, s2, s3) => {
  for (let char of s1) {
    if (s2.includes(char) && s3.includes(char)) {
      return char;
    }
  }
};

let main = async () => {
  try {
    let input = await fs.readFile("./day3/input_prod", { encoding: "utf-8" });
    const format = (input) =>
      input.split("\n").reduce((a, c) => {
        if (!a.length) {
          a.push([c]);
        } else {
          if (a[a.length - 1].length < 3) {
            a[a.length - 1].push(c);
          } else {
            a[a.length] = [c];
          }
        }
        return a
      }, []);
    const formattedInput = format(input);

    let output = 0;

    for (const [s1, s2, s3] of formattedInput) {
      let char = findCommonChar(s1, s2, s3);
      let priority = convertToPriority(char);
      output += priority;
    }

    console.log({ formattedInput, output });
  } catch (error) {
    console.log({ error });
  }
};
main();
