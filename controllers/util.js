/* -----------------------------------------------------------------------
   * @ description : This is the util controller layer.
----------------------------------------------------------------------- */

import { uploader, imageFilter } from '../utilities/universal';
import { failAction, successAction } from '../utilities/rest';
// import Messages from '../utilities/messages';
// import logger from '../utilities/logger';

const UPLOAD_PATH = 'assets/';
const fileOptions = { dest: UPLOAD_PATH, fileFilter: imageFilter };

export const downloadFile = {
  directory: {
    path: UPLOAD_PATH,
    redirectToSlash: false,
    index: false
  }
};

export const uploadFile = async (request, h) => {
  const { payload } = request;
  const file = payload['file'];
  try {
    const data = await uploader(file, fileOptions);
    return successAction(data);
  } catch (error) {
    failAction(error.message);
  }
};
