import { Kind } from 'graphql/language';

export const typeDefs = `
                scalar JSON
                `;

export const scalarType = {
  description:
    'The `JSON` scalar type represents JSON values as specified by ' +
    '[ECMA-404](http://www.ecma-international.org/' +
    'publications/files/ECMA-ST/ECMA-404.pdf).',

  __parseValue(value) {
    return value; // value from the client
  },
  __serialize(value) {
    return value; // value sent to the client
  },
  __parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING:
      case Kind.BOOLEAN:
        return ast.value;
      case Kind.INT:
      case Kind.FLOAT:
        return parseFloat(ast.value);
      case Kind.OBJECT: {
        const value = Object.create(null);
        ast.fields.forEach(field => {
          value[field.name.value] = parseLiteral(field.value);
        });

        return value;
      }
      case Kind.LIST:
        return ast.values.map(parseLiteral);
      default:
        return null;
    }
  },
};

export const resolvers = {
  JSON: scalarType,
};
