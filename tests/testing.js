import { e, eCss } from "../embel.esm.js";

const { Span, Details, Summary, Ul, Li, H2 } = e;

const OK_COLOR = "#060";
const FAIL_COLOR = "#600";

function TestValidation(input, processor, onResult) {
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

  const styles = eCss({
    color: didFail ? FAIL_COLOR : OK_COLOR,
  });

  onResult(didFail);
  Li(() =>
    Span(
      styles,
      didFail
        ? `FAIL: (${Array.isArray ? input.map((v) => JSON.stringify(v)).join(", ") : JSON.stringify(v)}): ${description}`
        : `SUCCESS: (${Array.isArray ? input.map((v) => JSON.stringify(v)).join(", ") : JSON.stringify(v)})`,
    ),
  );
}

/**
 * @template T
 * @param {string} case_name
 * @param {T[]} inputs
 * @param {(...data: T) => {didFail: boolean, description: string}} processor
 */
export function TestCase(case_name, inputs, processor) {
  let ok_counter = 0;
  let total_counter = 0;

  const onResult = (ref, didFail) => {
    total_counter++;
    if (!didFail) {
      ok_counter++;
    }

    ref.style.color = ok_counter == total_counter ? OK_COLOR : FAIL_COLOR;
    ref.innerText = `${case_name} (${ok_counter}/${total_counter})`;
  };

  Details(() => {
    const case_ref = Summary(case_name);
    Ul(() => {
      for (let input of inputs) {
        TestValidation(input, processor, (r) => onResult(case_ref, r));
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
