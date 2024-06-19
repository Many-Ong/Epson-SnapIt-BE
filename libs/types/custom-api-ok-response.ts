import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const CustomApiOkResponse = (model: any, isArray = false) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          statusCode: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
          data: isArray
            ? {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              }
            : {
                $ref: getSchemaPath(model),
              },
        },
      },
    }),
  );
};
