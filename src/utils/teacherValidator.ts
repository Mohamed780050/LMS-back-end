import Ajv, { JSONSchemaType } from "ajv";
import { teacherInterface } from "../interfaces/interfaces";

const Schema: JSONSchemaType<
  Omit<
    teacherInterface,
    | "resetPasswordToken"
    | "resetPasswordTokenExpire"
    | "verificationCode"
    | "verificationCodeExpire"
  >
> = {
  type: "object",
  properties: {
    userName: {
      type: "string",
      minLength: 5,
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
      minLength: 8,
    },
    avatar: {
      type: "string",
    },
    courses: {
      type: "array",
      items: {
        type: "string",
      },
    },
    students: {
      type: "array",
      items: {
        type: "string",
      },
    },
    refreshToken: {
      type: "string",
      default: "",
    },
    isVerified: {
      type: "boolean",
      default: false,
    },
  },
  required: ["userName", "email", "password"],
};

const ajv = new Ajv();
export default ajv.compile(Schema);
