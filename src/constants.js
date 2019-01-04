import path from 'path';

export const outputFolder = path.resolve( __dirname, 'vocabs' );
export const outputFolderSchemaDefinitions = path.resolve( __dirname, 'schemaDefinitions' );

export const vocabMapFileName = 'vocabMap.json'
export const logFileName = 'node-cli-starter.log'

export const RDF_NFS_TYPE_TAG = 15238;
export const MAX_FILE_SIZE = 20 * 1024 * 1024;
export const UPLOAD_CHUNK_SIZE = 1000000;
