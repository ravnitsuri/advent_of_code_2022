const fs = require("fs/promises");

let main = async () => {
  try {
    let input = await fs.readFile("./day4/input_prod", { encoding: "utf-8" });
    const format = (input) =>
      input.split("\r\n").map((__it) =>
        __it
          .split(",")
          .map((_it) => _it.split("-").map(Number))
          .map((it) => ({ x: it[0], y: it[1] }))
      );

    const formattedInput = format(input);

    let output = 0;

    for (const [elf1, elf2] of formattedInput) {
      const { x: x1, y: y1 } = elf1;
      const { x: x2, y: y2 } = elf2;

      // range(line) is x->y
      //1 -----
      //2  ---

      //1 -----
      //2 ---

      //1 -----
      //2   ---

      //1  ---
      //2 -----

      //1   ---
      //2 -----

      //1 ---
      //2 -----

      const condition = (x2 >= x1 && y2 <= y1) || (x1 >= x2 && y1 <= y2);

      if (condition) {
        output++;
      }
    }

    console.log({
      x: JSON.stringify(formattedInput[formattedInput.length - 1]),
      output,
    });
  } catch (error) {
    console.log({ error });
  }
};
main();
