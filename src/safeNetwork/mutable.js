import authenticate from './authenticate';
import logger from '../logger';

let app;
const DEFAULT_TYPE_TAG = 17263;

// TODO: Q. how to persist app for many fetches/efficiency?
export const createMutable = async ( data ) =>
{
    logger.trace('Creating MD', data)




    // let theOptions = {
    //     ...options,
    //     encrypt : false,
    //     typeTag : DEFAULT_TYPE_TAG
    // }
    app = app || await authenticate();
    let md;

    logger.trace('Created md 111111111111111 like')

    //
    // if( !theOptions.encrypt )
    // {
        md = await app.mutableData.newRandomPublic( DEFAULT_TYPE_TAG );
        // md = await app.mutableData.newRandomPublic( theOptions.typeTag );
    // }
    //
    logger.trace('Created md 222222222222222 like')

    // logger.trace('Created MD')
    //
    // return md;
    let setMd
    try {

        setMd= await md.quickSetup( data, 'NFS dataaaaa', 'Something about it' );
        logger.trace('Created md quick like')
        // logger.trace('Createeeeee', await setMd.getNameAndTag())
    } catch (e) {
        logger.error('[[[[[[[[[[[]]]]]]]]]]]',e)

        throw new Error( e )
    }
    logger.trace('hmmmmmmmmmmmmmmmmmmmmmmmmme')

    return md;
}


// export const addEntryToMutable = async ( { md, location, entryKey, entryPath, typeTag = DEFAULT_TYPE_TAG } ) =>
export const addEntryToMutable = async ( options = { } ) =>
{
    logger.trace('Adding entry to MD')
    let theOptions = {
        ...options,
        encrypt : false,
        typeTag : DEFAULT_TYPE_TAG,
    }

    if( ! options.key || !options.value ) throw new Error( 'No data to be adding to MD....' )

    app = app || await authenticate();

    let ourMd = options.md ; // || get the address....

    // try // TODO: Do checks against existing things.
    // optionally do encryption too.
    const mutation = await app.mutableData.newMutation();

    await mutation.insert( options.key, options.value );

    logger.trace( 'mutation inserted successfully:');

    try{
        await ourMd.applyEntriesMutation( mutation );

    }
    catch( e )
    {
        logger.error(e)
    }

    logger.trace( 'MData added successfully:', options.key );

}
