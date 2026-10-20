import {} from "../embel.esm.js";
import { TestCase, TestSubject } from "./testing.js";

// TODO: Write tests
TestSubject("One", () => {
  TestCase(
    "Odd",
    [
      [1, 1],
      [2, 0],
      [3, 1],
    ],
    (input, expected) => {
      const output = input % 3;
      return {
        didFail: output != expected,
        description: `Got "${output}", but expected "${expected}"`,
      };
    },
  );
});
