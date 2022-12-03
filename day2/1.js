const fs = require("fs/promises");
const print = (x) => console.log(JSON.stringify(x, null, 4));

let main = async () => {
  try {
    let input = await fs.readFile("./day2/input_dev", { encoding: "utf8" });
    const format = (input) =>
      input
        .split("\r\n")
        // .map((_) => _.split("\r\n").map((_) => parseInt(_)));
    const formattedInput = format(input);
    print(formattedInput);
    // let winnerSum = 0;

    // for (const currentBoy of formattedInput) {
    //   const sum = currentBoy.reduce((a, c) => a + c);
    //   if (sum > winnerSum) winnerSum = sum;
    // }

    console.log({ winnerSum });
  } catch (error) {
    console.log({ error });
  }
};
main();
