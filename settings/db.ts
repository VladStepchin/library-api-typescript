import mongoose from 'mongoose';

module.exports = ({ uri, options }:{uri: any, options: any}) =>
 new Promise((resolve, reject) => mongoose.connect(uri, options, (err) => {
  if (err) {
    return reject(err);
  }
  return resolve(1);
}));
