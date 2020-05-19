import {config} from "dotenv";
import {resolve} from "path";

config({
  path: resolve(__dirname, `../../../config/${process.env.NODE_ENV}.env`),
});
