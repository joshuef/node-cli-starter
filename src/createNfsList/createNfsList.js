import logger from '../logger';
import { addEntryToMutable, createMutable } from '../safeNetwork';

import { resolveableMap, safeId } from 'safe-schema';
import { man, validate } from 'rdf-check-mate';
import rdflib from 'rdflib';

import rdfMePlz from '../rdfMePlz';
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

    // TODO: this needs to have an ID to be passed to RDFMEPLZ
    const ourFileList = {
        id          : 'safe://asdadsadsa',
        entriesList : {  'somefile/path': 'safe://asdsadsadsadad' }
    };


    const ourWebId = {
        id     : 'safe://mywebid.gabriel',
        name    : 'Gabriel Viganotti',
        nick    : 'bochaco',
        website : 'safe://mywebsite.gabriel',
        image   : 'safe://mywebsite.gabriel/images/myavatar',
    };

    logger.trace( 'Creationinnnnn', ourFileList );
    // Testing with:

    //safe schema defaultValue...
    await man( resolveableMap );

    // specifics of our file list over resolveable map...
    // each is a file...
    // do we want metadata here?

    await validate( safeId, ourWebId );
    // await validate( resolveableMap, ourFileList );


    // do generic conversion using map.


    // why is this the other way round?
    let graph = await rdfMePlz( ourWebId, safeId );
    // let graph = await rdfMePlz( ourFileList, resolveableMap );

    // logger.trace( 'valid±±!!!', graph, ourFileList.id );

    rdflib.serialize( null, graph, ourFileList.id, 'application/ld+json', ( err, result ) =>
    {
        if( err )
        {
            logger.error( '!!!!!!!!!!!!!!!!!errorrrr', err )
            throw new Error( err );
        }

        console.log( 'SERLIALISEDDDDD' )
        console.log( result )
    } );


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
    logger.trace( 'addNfsListing' )
    await addEntryToMutable( { md, key, value } );

    logger.trace( 'addNfsListing done!!!!! for', key );

}



createNfsList();
