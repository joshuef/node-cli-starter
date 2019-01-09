/*
MIT License

APPLICABLE TO THIS FILE ONLY: safe-app-cli.js which is adapted from
https://github.com/project-decorum/decorum-lib/src/Safe.ts
commit: 1d08f743e60c7953169290abaa37179de3508862

Copyright (c) 2018 Benno Zeeman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

/**
 * Authorise app, and/or request access to shared Mutable Data via SAFE Browser
 *
 * This code injects two methods into the nodejs SAFE API object, one for
 * app authorisation and one to request access to a shared Mutable Data.
 */

import fs from 'fs';
import path from 'path';
import ipc from 'node-ipc';
import { initialiseApp, fromAuthUri } from '@maidsafe/safe-node-app';
import cliOptions from '../cli-options';
import {PID_LOCATION} from '../constants';

import logger from '../logger';
// const debug = require('debug')('safenetworkjs:cli')
// const fs = require( 'fs' )
// const ipc = require( 'node-ipc' )
// const path = require( 'path' )
// const Safe = require( '@maidsafe/safe-node-app' )

/* console to file
// process.__defineGetter__('stderr', function () { return fs.createWriteStream(path.join(__dirname, '/pid-' + process.pid + '-error.log'), {flags: 'a'}) })
// process.__defineGetter__('stdout', function () { return fs.createWriteStream(path.join(__dirname, '/pid-' + process.pid + '-debug'), {flags: 'a'}) })

// var fs = require('fs')
var util = require('util')
var logFile = fs.createWriteStream(path.join('/home/mrh/src/fuse/safenetwork-fuse/pid-' + process.pid + '-debug'), {flags: 'w'})
var logStdout = process.stdout

debug = function (d) {
  logFile.write(util.format(d) + '\n')
  logStdout.write(util.format(d) + '\n')
}
*/

// No stdout from node-ipc
// ipc.config.silent = true

// Request permissions on a shared MD
const fromUri = async ( app, uri ) =>
{
    await app.auth.openUri( uri )

    const uri2 = await ipcReceive( String( process.pid ) )

    return app.auth.loginFromURI( uri2 ) // TODO change to loginFromUri for v0.9.1
}

// Request authorisation
export const bootstrap = async ( appInfo, appContainers, containerOpts, appInitOptions ) =>
{
    logger.info( '__dirname: ' + String( __dirname ) )
    logger.info( '\nSafe.bootstrap()\n  with appInfo: ' + JSON.stringify( appInfo ) +
    '  appInitOptions: ' + JSON.stringify( appInitOptions ) )

    const options = {
        libPath : getLibPath(),
        ...appInitOptions
    }

    // if ( cliOptions.pid !== undefined )
    // {
    //     if ( cliOptions.response === undefined )
    //     {
    //         throw Error( '--uri undefined' )
    //     }
    //
    //     logger.info( 'ipcSend(' + cliOptions.pid + ',' + cliOptions.response + ')' )
    //     await ipcSend( String( cliOptions.pid ), cliOptions.response )
    //
    //     process.exit()
    // }

    // let uri
    // if ( cliOptions.response !== undefined )
    // {
    //     uri = cliOptions.response
    // }
    // else
    // {
    await authorise( process.pid, appInfo, appContainers, containerOpts, options )
    logger.info( 'ipcReceive awaiting...(' + process.pid + ')' )
    let uri = await ipcReceive( String( process.pid ) )

    logger.info( 'ipcReveiddededddd!!!!!!!', uri )
    // }

    // TODO revert to safe-node-app v0.9.1: call fromAuthUri() instead of fromAuthURI()
    return fromAuthUri( appInfo, uri, null, options )
}

async function authorise ( pid, appInfo, appContainers, containerOpts, options )
{
    // For development can provide a pre-compiled cmd to receive the auth URL
    // This allows the application to be run and debugged using node
    if ( !appInfo.customExecPath )
    {
        appInfo.customExecPath = [
            path.resolve( __dirname, '..', 'index.js' ),
            '--pid',
            String( pid ),
            '--response'
        ];

        const platform = process.platform;

        // we use a special app to send on the args, as we can't register a scheme to just the script.
        if( platform === 'darwin' )
        {
            appInfo.customExecPath = [
                path.resolve( __dirname, '..', '..', 'url-helper.app' ),
                // '--args', //for osx to pass on...
                // '--pid',
                // String( pid ),
                // '--response'
            ];

            fs.writeFile( PID_LOCATION, String( pid ), 'utf8', function ( err )
            {
                logger.info('pid written ')
                if ( err ) return console.log( err );
            } );

            appInfo.bundle = 'com.maidsafe.knock-on';
        }

        logger.info( 'setting custom exec path:', appInfo.customExecPath )
    }
    logger.info( 'call Safe.initializeApp()...' )

    // TODO: trying js app instead of bash


    // TODO revert to safe-node-app v0.9.1: call initialiseApp() instead of initializeApp()
    const app = await initialiseApp( appInfo, undefined, options );
    const registeredScheme = app.auth.registeredAppScheme;

    const knockOnPlistLocation = path.resolve( __dirname, '../../url-helper.app/Contents/Info.plist' );
    // const knockOnPlistLocation = path.resolve( __dirname, '../../KnockOn.app/Contents/Info.plist' );



    logger.info( 'call app.auth.genAuthUri()...' )
    const uri = await app.auth.genAuthUri( appContainers, containerOpts )


    logger.info( 'scheme we registered:', registeredScheme )
    logger.info( 'Your plist please....', knockOnPlistLocation )
    fs.readFile( knockOnPlistLocation, 'utf8', function ( err,data )
    {
        if ( err )
        {
            return console.log( err );
        }

        var result = data.replace( /safe-xxx/g, registeredScheme );

        fs.writeFile( knockOnPlistLocation, result, 'utf8', function ( err )
        {
            logger.info('plist updated')
            if ( err ) return console.log( err );
        } );
    } );

    logger.info( 'bootstrap.authorise() with appInfo: ' + JSON.stringify( appInfo ) +
    'appContainers: ' + JSON.stringify( appContainers ) )
    await app.auth.openUri( uri.uri )
    logger.info( 'wait a mo' )
}

const ipcReceive = async ( id ) =>
{
    logger.info( 'ipcReceive setup....(' + id + ')' )
    return new Promise( ( resolve ) =>
    {
        ipc.config.id = id

        ipc.serve( () =>
        {
            ipc.server.on( 'auth-uri', ( data ) =>
            {
                logger.info( 'on(auth-uri) handling data.message: ' + data.message )
                resolve( data.message )
                ipc.server.stop()
            } )
        } )

        ipc.server.start()
    } )
}

export const ipcSend = async ( id, data ) =>
{
    logger.info( 'ipcSend(' + id + ', ' + data + ')' )

    return new Promise( ( resolve ) =>
    {
        ipc.config.id = id + '-cli'

        ipc.connectTo( id, () =>
        {
            ipc.of[id].on( 'connect', () =>
            {
                logger.info( 'on(connect)' )
                ipc.of[id].emit( 'auth-uri', { id: ipc.config.id, message: data } )

                resolve()
                ipc.disconnect( 'world' )
            } )
        } )
    } )
}

/**
 * @returns
 */
function getLibPath ()
{
    const roots = [
        path.join( __dirname, '../..' ),
        // path.dirname( process.argv[1] )
    ]

    const locations = [
        'node_modules/@maidsafe/safe-node-app/src/native'
    ]

    for ( const root of roots )
    {
        for ( const location of locations )
        {
            const dir = path.join( root, location )

            if ( fs.existsSync( dir ) )
            {
                logger.info( 'getLibPath() returning: ', dir )
                return dir
            }
        }
    }

    logger.info( 'No library directory found.' )
    throw Error( 'No library directory found.' )
}

// module.exports = Safe
