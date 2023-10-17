import { ExecutionContext, createParamDecorator } from '@nestjs/common';

function parseParam<T>(
  queryParam: unknown,
  parserLogic: (param: string, res: any[]) => void,
): T[] | undefined {
  const res = [];
  if (queryParam) {
    const params = !Array.isArray(queryParam) ? [queryParam] : queryParam;
    for (const param of params) {
      if (typeof param === 'string') {
        parserLogic(param, res);
      }
    }
  }
  return res.length ? res : undefined;
}

const multipleSplit = (param: string, res: any[]) => {
  const items = param.split(':');
  if (items.length === 2) {
    res.push(items as [string, string]);
  }
};

const convert = (map: Record<string, string>) => {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(map)) {
    key.split('.').reduce((res, prop, idx, arr) => {
      return (res[prop] = arr.length === idx + 1 ? value : res[prop] || {});
    }, result);
  }

  return result;
};

export const Sort = createParamDecorator(
  (allowedSorts: string[], ctx: ExecutionContext): Record<string, any> => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query as Record<string, unknown>;
    const sortBy = parseParam<[string, string]>(
      query?.sort ?? '',
      multipleSplit,
    );

    if (!sortBy) {
      return {};
    }

    const objectMap: Record<string, string> = Object.fromEntries(
      sortBy?.filter(([key]) => allowedSorts.includes(key)),
    );

    return convert(objectMap);
  },
);
