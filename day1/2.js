const fs = require("fs/promises");
const print = (x) => console.log(JSON.stringify(x, null, 4));

let main = async () => {
  try {
    let input = await fs.readFile("./day1/input_prod", { encoding: "utf8" });
    const sumReducer = (a, c) => a + c;
    const format = (input) =>
      input
        .split("\r\n\r\n")
        .map((_) => _.split("\r\n").map((_) => parseInt(_)))
        .map((_) => _.reduce(sumReducer)).sort((a, b) => b-a);
    const formattedInput = format(input);
    formattedInput.length = 3
    const output = formattedInput.reduce(sumReducer)
    print(output);
    // let winnerSum = 0;

    // for (const currentBoy of formattedInput) {
    //   const sum = currentBoy.reduce((a, c) => a + c);
    //   if (sum > winnerSum) winnerSum = sum;
    // }

    // console.log({ winnerSum });
  } catch (error) {
    console.log({ error });
  }
};
main();
