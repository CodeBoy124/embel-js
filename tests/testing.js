import { e } from "../embel.esm.js";

const { Span, Details, Summary, Ul, Li, H2 } = e;

function TestValidation(input, processor, onFail) {
  let { didFail, description } = {
    didFail: true,
    description: "Could not execute test due to a fail",
  };

  try {
    const processOutput = processor(...input);
    didFail = processOutput.didFail;
    description = processOutput.description;
  } catch (e) {
    description = e.message;
  }

  if (didFail) {
    onFail();
    Li(() =>
      Span(
        `FAIL (${Array.isArray ? input.map((v) => JSON.stringify(v)).join(", ") : JSON.stringify(v)}): ${description}`,
      ),
    );
  }
}

/**
 * @template T
 * @param {string} case_name
 * @param {T[]} inputs
 * @param {(...data: T) => {didFail: boolean, description: string}} processor
 */
export function TestCase(case_name, inputs, processor) {
  const onFail = (ref) => {
    ref.style.color = "red";
  };

  Details(() => {
    const case_ref = Summary(case_name);
    Ul(() => {
      for (let input of inputs) {
        TestValidation(input, processor, () => onFail(case_ref));
      }
    });
  });
}

/**
 *
 * @param {string} subject_name
 * @param {eComponentDef_T} body
 */
export function TestSubject(subject_name, body) {
  H2(subject_name);
  body();
}
