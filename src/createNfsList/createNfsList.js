import logger from '../logger';
import { addEntryToMutable, createMutable } from '../safeNetwork';


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
    return createMutable( data );
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
