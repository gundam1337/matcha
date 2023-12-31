const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: 'path-to-your-service-account-json-file.json',
  projectId: 'your-google-cloud-project-id',
});

const bucket = storage.bucket('your-bucket-name');

module.exports = {
  storage,
  bucket
};
