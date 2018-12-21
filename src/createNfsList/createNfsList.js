import logger from '../logger';
import { addEntryToMutable, createMutable } from '../safeNetwork';

import { FilesMap, FileItem } from 'safe-schema';
import { shepherd } from 'semantic-shepherd';

import { resolveableMap, safeId } from 'safe-schema';
import { man, validate } from 'rdf-check-mate';
import rdflib from 'rdflib';


const fakeDefaultData = {
    'somefile/path'    : 'safe://1111111',
    'another/path'     : 'safe://2222222',
    'another/path/sub' : 'safe://33333'
}

logger.warn( `If FilesMap returns undefined, you need ot remember:
    right now, we need to build all the RDF deps (and probably link em),
    nothing is published yet! the type of FilesMap is: ${typeof FilesMap}` );
// const createNfsList = async ( { mdlocationUri = '', pathsCasArray = [], encrypt = false } ) =>
export const createNfsList = async ( data = fakeDefaultData ) =>
{
    // TODO:

    // Step 1: Create FilesMap.
    // generate random XOR address for this (or use a target)
    // use RDF consistent typetag

    // Step 2: Create FileItem for each file...
    // 2.1 Convert entries object to target / date / size....
    // some info may not be needed as XOU URL has it... (mimetype...?)

    // Step 3: Add entry to FilesMap, using KEY as id.


    // TODO: this needs to have an ID to be passed to RDFMEPLZ
    const ourFilesMap = {
        version : "1",
        id      : 'safe://asdadsadsa',
        default : 'safe://asdadsadsa',
    };

    logger.trace( 'Creationinnnnn NFS', ourFilesMap );

    //safe schema defaultValue...
    const result = await man( FilesMap );
    logger.trace( 'man outcome',result )
    const valid =  await validate( FilesMap, ourFilesMap );
    logger.trace( 'validity check outcome',valid )

    let rdfObj = await shepherd( ourFilesMap, FilesMap );

    rdflib.serialize( null, rdfObj, ourFilesMap.id, 'text/turtle', ( err, result ) =>
    {
        if( err )
        {
            logger.error( '!!!!!!!!!!!!!!!!!errorrrr', err )
            throw new Error( err );
        }

        logger.info( 'SERLIALISEDDDDD THE RESOLVEABLEMAPPP' )
        console.log( result )
    } );


    logger.trace( 'And our data to be saving:', data );

    //yes this is not the most efficient. But for now, stands
    Object.keys( data ).forEach( async ( location ) =>
    {
        console.log( 'location', location )
        console.log( 'xorUrl', data[ location ] )

        const target = data[ location ];

        const fileItem = {
            id :`${ourFilesMap.id}/${location}`,
            target
        };
        //safe schema defaultValue...
        // const result = await man( FileItem );
        // logger.trace( 'man outcome',result )
        const valid =  await validate( FileItem, ourFilesMap );
        logger.trace( 'validity check outcome or fileItem',valid )

        let thisItem = await shepherd( fileItem, FileItem );
        rdflib.serialize( null, thisItem, fileItem.id, 'text/turtle', ( err, result ) =>
        {
            if( err )
            {
                logger.error( '!!!!!!!!!!!!!!!!!errorrrr', err )
                throw new Error( err );
            }

            console.log( 'fileitem', result )
        } );
    } )


}

export const addNfsListing = async ( md, key, value ) =>
{
    logger.trace( 'addNfsListing' )
    await addEntryToMutable( { md, key, value } );

    logger.trace( 'addNfsListing done!!!!! for', key );

}



createNfsList();
