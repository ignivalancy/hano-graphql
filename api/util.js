/* -----------------------------------------------------------------------
   * @ description : This file defines the rest util functions.
----------------------------------------------------------------------- */

export const constructPath = function(obj) {
  let path = obj.path.split('/');
  if (path[1] === this.match) return obj;
  obj.path = `/${this.match}${obj.path}`;
  return obj;
};
