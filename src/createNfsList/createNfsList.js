import { authenticate } from '../safeNetwork';
import logger from '../logger';


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

const createNfsList = async ( { mdlocationUri, pathsCasArray, encrypt = false } ) =>
{
    if( ! mdlocationUri )
    {

    }
}

export const nfsListing = async ( uri ) =>
{
    try
    {
        let app = await authenticate();
        const data = await app.webFetch( uri );
        logger.info( 'data received:' , data.body.toString() )
    }
    catch( err )
    {
        logger.error( 'an error in nfsListing: ',err )
        throw err;
    }

}

export default nfsListing
