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
        version     : "1",
        id          : 'safe://asdadsadsa',
        ':default'  : 'safe://asdasdasdasdasdsadasdadsa',
        entriesList : {
            'somefile/path'    : 'safe://1111111',
            'another/path'     : 'safe://2222222',
            'another/path/sub' : 'safe://33333',
        }
    };


    const ourWebId = {
        id      : 'safe://mywebid.gabriel#me',
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

    // await validate( safeId, ourWebId );
    await validate( resolveableMap, ourFileList );


    // do generic conversion using map.


    // why is this the other way round?
    // let graph = await rdfMePlz( ourWebId, safeId );
    //
    // // logger.trace( 'valid±±!!!', graph, ourFileList.id );
    //
    // rdflib.serialize( null, graph, ourFileList.id, 'text/turtle', ( err, result ) =>
    // // rdflib.serialize( null, graph, ourFileList.id, 'application/ld+json', ( err, result ) =>
    // {
    //     if( err )
    //     {
    //         logger.error( '!!!!!!!!!!!!!!!!!errorrrr', err )
    //         throw new Error( err );
    //     }
    //
    //     logger.info( 'SERLIALISEDDDDD' )
    //     console.log( result )
    // } );
    //
    let anothergraph = await rdfMePlz( ourFileList, resolveableMap );

    //
    // const someMD = {
    //     thing : 'stuff',
    //     more  : 'other'
    // }
    //
    // save( someMD );

    // save(ourFileList).schema(resolveableMap);




    rdflib.serialize( null, anothergraph, ourFileList.id, 'text/turtle', ( err, result ) =>
    // rdflib.serialize( null, graph, ourFileList.id, 'application/ld+json', ( err, result ) =>
    {
        if( err )
        {
            logger.error( '!!!!!!!!!!!!!!!!!errorrrr', err )
            throw new Error( err );
        }

        logger.info( 'SERLIALISEDDDDD THE RESOLVEABLEMAPPP' )
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
