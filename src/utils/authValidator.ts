import Ajv, { JSONSchemaType } from "ajv";
import { authInterface } from "../interfaces/interfaces";
const Schema: JSONSchemaType<authInterface> = {
  type: "object",
  properties: {
    identifier: {
      type: "string",
      minLength: 5,
    },
    password: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["identifier", "password"],
};
const ajv = new Ajv();
export default ajv.compile(Schema);
