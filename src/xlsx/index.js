import { main } from "./core/xlsx-main.js";

async function example() {
  await main(null, { tempDir: "temp", outDir: "out" });
  console.log("success!");
}

example();
