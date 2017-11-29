/* -----------------------------------------------------------------------
   * @ description : This file defines the rest util functions.
----------------------------------------------------------------------- */

export const constructPath = function(obj) {
  let path = obj.path.split('/');
  return path[1] === this.match ? { ...obj, path: `/${this.match}${obj.path}` } : obj;
};
