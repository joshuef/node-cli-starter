#!/usr/bin/env node
import "core-js/shim";

import logger from './logger';
import cliOptions from './cli-options';
import { ipcSend } from './safeNetwork/bootstrap';

export const delay = time => new Promise( resolve => setTimeout( resolve, time ) );

// logger.info('Root index was called', cliOptions)


( async () =>
{
    // logger.warn('all things passed in', cliOptions)
    logger.warn('all things passed in argv', process.argv)
    const response = cliOptions.response;
    const pid = cliOptions.pid;

    if ( pid === undefined )
    {
        throw Error( '--pid undefined' )
    }

    if ( response === undefined )
    {
        throw Error( '--response undefined' )
    }


    logger.warn( 'ipcSend(' + cliOptions.pid + ',' + cliOptions.response + ')' )
    await ipcSend( String( cliOptions.pid ), cliOptions.response )

    logger.warn( 'root of all safe' , pid, response  );

    await delay(1000)
    process.exit();
} )()
