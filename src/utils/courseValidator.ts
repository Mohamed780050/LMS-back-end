import Ajv, { JSONSchemaType } from "ajv";
import { courseInterface } from "../interfaces/interfaces";
const schema: JSONSchemaType<courseInterface> = {
  type: "object",
  properties: {
    courseName: {
      type: "string",
      default: "",
    },
    description: { type: "string", default: "" },
    image: {
      type: "object",
      properties: {
        public_id: { type: "string", default: "" },
        url: { type: "string", default: "" },
        secure_url: { type: "string", default: "" },
        width: { type: "number", default: 0 },
        height: { type: "number", default: 0 },
        format: { type: "string", default: "" },
        resource_type: { type: "string", default: "" },
        created_at: { type: "string", default: "" },
        asset_folder: { type: "string", default: "" },
        size: { type: "number", default: 0 },
      },
      required: [],
    },
    price: { type: "number", default: 0 },
    isPublished: { type: "boolean", default: false },
    date: {
      type: "object",
      properties: {
        normal: { type: "string", default: "" },
        full: { type: "string", default: "" },
      },
      default: { normal: "", full: "" },
      required: [],
    },
    rating: { type: "number", default: 0 },
    category: { type: "string", default: "" },
    teacherId: { type: "string" },
    completed: { type: "number", default: 0 },
    total: { type: "number", default: 6 },
    students: { type: "array", items: { type: "string" }, default: [] },
    chapters: { type: "array", items: { type: "string" }, default: [] },
    attachments: { type: "array", items: { type: "string" }, default: [] },
  },
  required: ["teacherId"],
};

const ajv = new Ajv();
export default ajv.compile(schema);
