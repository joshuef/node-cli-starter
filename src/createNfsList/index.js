import "core-js/shim";
import logger from '../logger';
import cliOptions from '../cli-options';
import {addNfsListing, createNfsList} from './createNfsList';

const stdin = process.openStdin();

let data = [];

stdin.resume();
stdin.setEncoding( 'utf8' );

// when interrupt.
process.on( 'SIGINT', function ()
{
    console.log( 'Got a SIGINT. Goodbye cruel world' );
    process.exit( 0 );
} );

let mutableDatum;
const dataObj = {};

stdin.on( 'data', async ( chunk ) =>
{
    const chunkArray =  chunk.split( '\n' ) ;

    chunkArray.forEach( async d =>
    {
        const uriPair = d.split( ' ' );

        const path = uriPair[0];
        const uri = uriPair[1];
        if( !path.length || ! uri.length ) return;


        dataObj[path] = uri;

        // if one doesnt exist.... how do we check that? with --target ops?
        // mutableDatum = mutableDatum || await createNfsList( );

        // data.push( addNfsListing( mutableDatum, path, uri ) );

    } );

} );

stdin.on( 'end', async () =>
{

    // let alldata = await Promise.all( data )

    // alldata.forEach( d => console.log( d ) )

     await createNfsList( dataObj );

    console.log( '-----------------------------' )
    process.exit();
} );


// TODO: check if piping or no... (via args?)
// TODO: check if processing or no... (via args?)

// self executing cli func
( async () =>
{
    logger.info( 's-createNfsList starting' );

    // if( cliOptions. )
    // await createNfsList( cliOptions.get );

    // dont auth exit as we may be piping.
    // process.exit();
} )()
