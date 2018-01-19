'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var typeDefs = exports.typeDefs = '\n                # Business List\n                type BusinessRecord {\n                  business_id: String\n                  name: String\n                  location: [String]\n                  display_address: String\n                  image_url: String\n                  types: [String]\n                  hasPhoto: Boolean\n                  user_count: Int\n                  distance: String\n                }\n                # Indiecore\n                type Business {\n                  list: [BusinessRecord]\n                  places_count: String\n                  total_count: String\n                }\n                type Query {\n                  business (\n                    longitude: String!\n                    latitude: String!\n                    sort: String\n                    offset: String\n                  ): Business\n                }';

var resolvers = exports.resolvers = {
  Query: {
    business: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(root, _ref, context) {
        var longitude = _ref.longitude,
            latitude = _ref.latitude,
            _ref$sort = _ref.sort,
            sort = _ref$sort === undefined ? '0' : _ref$sort,
            _ref$offset = _ref.offset,
            offset = _ref$offset === undefined ? '0' : _ref$offset;

        var _ref3, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios2.default.post('http://indiecore.ignivadigital.net/api/v1/business/records', {
                  userId: 'ogLXurwhuFpw4qj6x',
                  token: 'RJuNYkab5G4ocWNSzOhEBcpgcqr2dyUFKIny7Ppib4E',
                  longitude: longitude,
                  latitude: latitude,
                  sort: sort,
                  offset: offset
                });

              case 2:
                _ref3 = _context.sent;
                data = _ref3.data;

                if (!data.success) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', data);

              case 6:
                throw new Error(data.error_text);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function business(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return business;
    }()
  },
  Business: {
    list: function list(_ref4) {
      var places_list = _ref4.places_list;

      return places_list;
    }
  }
};