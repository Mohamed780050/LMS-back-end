import Ajv, { JSONSchemaType } from "ajv";
import { studentInterface } from "../interfaces/interfaces";
const Schema: JSONSchemaType<Omit<studentInterface, "courses" | "avatar">> = {
  type: "object",
  properties: {
    userName: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  required: ["email", "userName", "password"],
};
const ajv = new Ajv();
export default ajv.compile(Schema);
