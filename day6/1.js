const fs = require("fs/promises");

let main = async () => {
  try {
    let input = await fs.readFile("./day6/input_dev", { encoding: "utf-8" });
    // let input = await fs.readFile("./day6/input_prod", { encoding: "utf-8" });
    const format = (input) => input.split("\r\n");

    const formattedInput = format(input);

    for (let i = 0, l = formattedInput.length; i < l; i++) {
      let output = 0;
      let currentInput = formattedInput[i];
      let buffer = [];

      console.log(
        "Input::",
        currentInput.toString(),
        "buffer::",
        buffer.toString()
      );

      let queue = [];
      let currInput = currentInput.split("");
      for (let j = 0, m = currInput.length; j < m; j++) {
        let val = currInput[j];
        if (queue.length < 4) {
          queue.push(val);
        } else {
          queue.shift(val);
          queue.push(val);
        }

        let set = new Set(queue);
        // console.log("queue", queue.toString(), set, j);
        if (set.size === 4) {
          output = j + 1;
          break;
        }
      }

      console.log({
        formattedInput: currentInput.toString(),
        output,
      });
    }
  } catch (error) {
    console.log({ error });
  }
};
main();
