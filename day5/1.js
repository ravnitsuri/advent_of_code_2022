const fs = require("fs/promises");

let main = async () => {
  try {
    let input = await fs.readFile("./day5/input_dev", { encoding: "utf-8" });
    // let input = await fs.readFile("./day5/input_prod", { encoding: "utf-8" });
    const format = (input) => input.split("\r\n").map((it) => it.match(/\d+/g));

    const formattedInput = format(input);

    //     [D]
    // [N] [C]
    // [Z] [M] [P]
    //  1   2   3

    let devMap = ["zn", "mcd", "p"];

    //             [Q]     [G]     [M]
    //             [B] [S] [V]     [P] [R]
    //     [T]     [C] [F] [L]     [V] [N]
    // [Q] [P]     [H] [N] [S]     [W] [C]
    // [F] [G] [B] [J] [B] [N]     [Z] [L]
    // [L] [Q] [Q] [Z] [M] [Q] [F] [G] [D]
    // [S] [Z] [M] [G] [H] [C] [C] [H] [Z]
    // [R] [N] [S] [T] [P] [P] [W] [Q] [G]
    //  1   2   3   4   5   6   7   8   9
    let prodMap = ["rslfq", "nzqgpt", "smqb", "tgzjhcbq", "phmbnfs", "pcqnslvg", "wcf", "qhgzwvpm", "gzdlcnr"];

    let GameMap = devMap;
    // let GameMap = prodMap;

    // move 1 from 2 to 1

    //     [D]
    // [N] [C]
    // [Z] [M] [P]
    //  1   2   3

    const makeMove = (__GameMap, [quantity, startLocation, endLocation]) => {
      let output = __GameMap;
      for (let i = 0, l = quantity; i < l; i++) {
        let temp = output[startLocation - 1].split("");
        let popped = temp.pop();
        output[startLocation - 1] = temp.join("");
        output[endLocation - 1] = output[endLocation - 1] + popped;
      }
      return output;
    };

    let outputFn = (__GameMap) => {
      let map = __GameMap;

      for (const input of formattedInput) {
        // console.log(input);
        map = makeMove(map, input);
      }

      map = map.map(it => it[it.length - 1]).join('')

      return map;
    };

    const output = outputFn(GameMap);

    console.log({
      // formattedInput: formattedInput[0].toString(),
      output,
    });
  } catch (error) {
    console.log({ error });
  }
};
main();
