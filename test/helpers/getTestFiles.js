import { readdir } from 'fs';

export const getTestFiles = (fullPath) => {
  return new Promise((resolve, reject) => {
    readdir(fullPath, (error, files) => {
      if (error) reject(error);
      resolve(files);
    });
  });
};
