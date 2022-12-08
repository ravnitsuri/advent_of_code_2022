// First one where I needed help...

const fs = require("fs/promises");

let main = async () => {
  try {
    // let input = await fs.readFile("./day7/input_dev", { encoding: "utf-8" });
    let input = await fs.readFile("./day7/input_prod", { encoding: "utf-8" });
    const format = (input) => input.split("\r\n");
    const formattedInput = format(input);

    const printTree = (node, depth = 0) => {
      console.log(
        `${" ".repeat(depth * 2)}- ${node.pathName || node.filename} (${
          node.type === "directory"
            ? `dir, size=${getSize(node)}`
            : `file, size=${node.size}`
        })`
      );
      if (node.type === "directory") {
        for (const child of node.children) {
          printTree(child, depth + 1);
        }
      }
    };

    function getSize(node, directoryCallback = () => {}) {
      if (!(node.type === "directory")) {
        return node.size;
      }
      const directorySize = node.children
        .map((child) => getSize(child, directoryCallback))
        .reduce((a, b) => a + b, 0);

      directoryCallback(node.pathName || node.filename, directorySize);

      return directorySize;
    }

    const createTree = (__formattedInput) => {
      let inputs = __formattedInput;

      let tree = {
        type: "directory",
        pathName: "/",
        parent: null,
        children: [],
      };

      let currentNode;

      for (let currentCommand of inputs) {
        // console.log("currentCommand", currentCommand);

        if (currentCommand.startsWith("$ cd ")) {
          let currentPathName = currentCommand.substring(
            "$ cd ".length,
            currentCommand.length
          );
          // console.log({ currentPathName, cur: currentNode?.pathName });

          if (currentPathName === "..") {
            if (currentNode.parent) currentNode = currentNode.parent;
          } else if (currentPathName === "/") {
            currentNode = tree;
          } else {
            currentNode = currentNode.children.find(
              (child) =>
                child.pathName === currentPathName && child.type === "directory"
            );
          }
        } else if (currentCommand === "$ ls") {
        } else {
          if (currentCommand.startsWith("dir ")) {
            let dirName = currentCommand.substring(
              "dir ".length,
              currentCommand.length
            );
            currentNode.children.push({
              type: "directory",
              pathName: dirName,
              parent: currentNode,
              children: [],
            });
          } else {
            let filename = currentCommand.split(" ")[1];
            let size = Number(currentCommand.split(" ")[0]);
            currentNode.children.push({
              type: "file",
              filename: filename,
              size,
              parent: currentNode,
            });
          }
        }
      }

      return tree;
    };
    const tree = createTree(formattedInput);
    printTree(tree);
    let sizes = [];
    let thresholdSize = 100000;
    let x = getSize(tree, (name, size) => {
      sizes.push({ name, size });
    });
    let output = sizes
      .sort((a, b) => a.size - b.size)
      .filter((x) => x.size < thresholdSize)
      .reduce((a, c) => a + c.size, 0);
    console.log({ x, sizes, output });
  } catch (error) {
    console.log({ error });
  }
};
main();
