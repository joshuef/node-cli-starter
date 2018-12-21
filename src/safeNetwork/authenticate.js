import { initialiseApp } from '@maidsafe/safe-node-app';
import log from 'bristol';


const appInfo = {
    id           : 'net.maidsafe.test.javascript.id',
    name         : 'NodeJS CLI Uploader Test',
    vendor       : 'MaidSafe.net Ltd',
    forceUseMock : true
};


const publicNamesContainerPerms = {
    // _public as used for webId directory for now...
    _public      : ['Insert', 'Update', 'Delete'],
    _publicNames : ['Insert', 'Update', 'Delete'],
};

const authenticate = async ( ) =>
{
    let app;
    try
    {

        app = await initialiseApp( appInfo, null, {
            forceUseMock: true,
            enableExperimentalApis : true
        } );

        if( process.env.NODE_ENV === 'test' )
        {
            await app.auth.loginForTest( null, publicNamesContainerPerms );
        }
        else
        {
            console.warn( 'Nothing has been set up with attempting to auth. Use NODE_ENV=test')
            // TODO: STUFF
            // await app.auth.loginForTest( null, publicNamesContainerPerms );

        }
    }
    catch( err )
    {
        log.error( err.message, err.lineNumber )
    }

    return app;

}


export default authenticate;
