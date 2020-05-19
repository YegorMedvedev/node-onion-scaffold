import * as swaggerJSDoc from "swagger-jsdoc";

import {getPackageJson} from "../config";

const getOptions = () => {
  const packageJsonDetails = getPackageJson();
  const version = packageJsonDetails.version.split("#")[0];

  return {
    definition: {
      openapi: "3.0.2",
      info: {
        version,
        title: packageJsonDetails.name,
      },
      schemas: {},
    },
    apis: ["**/api/controllers/**/*/*.ts", "**/api/controllers/**/*/*.js", "**/api/**/*/*.yaml"],
  };
};

/**
 * @description
 * Use closure principle here in order to reduce Swagger specification build time
 * It takes ages and depends on amount of methods in /api/http
 */
let swaggerJsDocObject: Record<string, any> | undefined;

export const getSwaggerSpecification = (): Promise<Record<string, any>> => {
  if (swaggerJsDocObject != null) {
    return Promise.resolve(swaggerJsDocObject);
  }

  return new Promise((resolve, reject) => {
    try {
      swaggerJsDocObject = swaggerJSDoc(getOptions());
      resolve(swaggerJsDocObject);
    } catch (e) {
      reject(e);
    }
  });
};
