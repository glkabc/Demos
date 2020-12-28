import { response, context } from "msw";

function res(...transformers) {
  // Incorporate response delay into the composition itself:
  return response(context.delay(), ...transformers);
}

export { res };
