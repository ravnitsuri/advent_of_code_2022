const fs = require("fs/promises");
// const print = (x) => console.log(JSON.stringify(x, null, 4));

// A => Rock x
// B => Paper y
// C => Scissor z

// X => lose
// Y => draw
// Z => win

const calculateMove = (opponentMove, roundResult) => {
  if (opponentMove === "A") {
    switch (roundResult) {
      case "X":
        return "Z";
      case "Y":
        return "X";
      case "Z":
        return "Y";

      default:
        break;
    }
  } else if (opponentMove === "B") {
    switch (roundResult) {
      case "X":
        return "X";
      case "Y":
        return "Y";
      case "Z":
        return "Z";

      default:
        break;
    }
  } else if (opponentMove === "C") {
    switch (roundResult) {
      case "X":
        return "Y";
      case "Y":
        return "Z";
      case "Z":
        return "X";

      default:
        break;
    }
  } else {
    throw new Error("watwatwat");
  }
};

const yourMoveScore = (move) => {
  switch (move) {
    case "X":
      return 1;
    case "Y":
      return 2;
    case "Z":
      return 3;
    default:
      break;
  }
};

const winScore = (opponentMove, yourMove) => {
  let win, lose, draw;
  if (opponentMove === "A") {
    switch (yourMove) {
      case "X":
        draw = true;
        break;
      case "Y":
        win = true;
        break;
      case "Z":
        lose = true;
        break;

      default:
        break;
    }
  } else if (opponentMove === "B") {
    switch (yourMove) {
      case "X":
        lose = true;
        break;
      case "Y":
        draw = true;
        break;
      case "Z":
        win = true;
        break;

      default:
        break;
    }
  } else if (opponentMove === "C") {
    switch (yourMove) {
      case "X":
        win = true;
        break;
      case "Y":
        lose = true;
        break;
      case "Z":
        draw = true;
        break;

      default:
        break;
    }
  } else {
    throw new Error("watwat");
  }

  if (win) {
    return 6;
  } else if (lose) {
    return 0;
  } else if (draw) {
    return 3;
  } else {
    throw new Error("wat");
  }
};

let main = async () => {
  try {
    let input = await fs.readFile("./day2/input_prod", { encoding: "utf8" });
    const format = (input) => input.split("\n").map((_) => _.split(" "));
    const formattedInput = format(input);

    let score = 0;

    for (const [opponentMove, roundResult] of formattedInput) {
      // console.log({ opponentMove, yourMove });
      let yourMove = calculateMove(opponentMove, roundResult);
      score += yourMoveScore(yourMove);
      score += winScore(opponentMove, yourMove);
    }

    console.log({ score });
  } catch (error) {
    console.log({ error });
  }
};

main();
