import logger from '../logger';
import { addEntryToMutable, createMutable } from '../safeNetwork';

import { resolveableMap } from 'safe-schema';
import { man, validate } from 'rdf-check-mate';
//
// pass MD content address
// if existing... fails (use update to udpate)
//
// if non passed is random.
// can be encrypted
//
// pass an array of keyvalue. NFSaddress (resolvable against CAS or DNS):
//
//

// const createNfsList = async ( { mdlocationUri = '', pathsCasArray = [], encrypt = false } ) =>
export const createNfsList = async ( data ) =>
{
    // TODO: create NFS list is analogous to create data w/ schema.

    // we have data
    // we have schema (resolveableMap)
    // so we parse...

    const ourFileList = { entriesList: data };

    logger.trace('Creationinnnnn', ourFileList);
    // Testing with:

    //safe schema defaultValue...
    await man( resolveableMap );

    // specifics of our file list over resolveable map...
    // each is a file...
    // do we want metadata here?

    await validate( resolveableMap, ourFileList );


    // do generic conversion using map.

    logger.trace('valid±±!!!');

    // return null;
    // return createMutable( data );
    // let md;
    //
    // if( ! options.mdlocationUri )
    // {
    //     md = await createMutable();
    //
    // }
    // else
    // {
    //     // setup the MD/RDF from location.
    //     md = await createMutable();
    // }
    //
    // return md;
}

export const addNfsListing = async ( md, key, value ) =>
{
    logger.trace('addNfsListing')
    await addEntryToMutable( { md, key, value } );

    logger.trace('addNfsListing done!!!!! for', key );

}



createNfsList();
