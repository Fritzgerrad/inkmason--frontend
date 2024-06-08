import { z } from 'zod';

interface ErrorType {
  [c: string]: unknown;
}

interface ResponseType {
  data: null | {};
  errors: null | {};
}
export const validateSchema = (schema: z.ZodSchema, data: unknown) => {
  const response: ResponseType = {
    data: null,
    errors: null,
  };
  try {
    const validatedData = schema.parse(data);
    response.data = validatedData;
  } catch (error) {
    let formattedErrors = {};
    if (error instanceof z.ZodError) {
      formattedErrors = error.issues.reduce((acc: ErrorType, issue) => {
        const path = issue.path.join('.');
        const message = issue.message;

        // Check if path contains nested object (e.g., "parent.child")
        if (path.includes('.')) {
          const [objectName, field] = path.split('.');

          acc[objectName] = acc[objectName] || {};
          // @ts-ignore
          acc[objectName][field] = message;
        } else {
          // @ts-ignore
          acc[path] = message;
        }

        return acc;
      }, {});
    }
    response.errors = formattedErrors;
  }
  return response;
};
