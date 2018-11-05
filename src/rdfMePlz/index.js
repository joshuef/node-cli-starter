import logger from '../logger';
import rdflib from 'rdflib';

// take rdf lib.

// set up vocabs from context.

// loop through schema.... apply from object.


const ohMyMakeMeRDF = async ( dataObject, schema ) =>
{
    logger.warn( 'You want to make RDF data. OH MY', schema['@context'] )

    const vocabs = {};

    const idUri = dataObject['@id'] || dataObject.id;

    if( !idUri ) throw new Error( 'No "id" passed to make RDF (should be a url).' )

    //lets get a simple vocab object setup for RDF
    Object.entries( schema['@context'] ).forEach( ( [ voc, uri ] ) =>
    {
        vocabs[voc] = rdflib.Namespace( uri );
    } )
    // Object.values( schema['@context'] ).map( voc => rdflib.Namespace(voc) )

    logger.trace( 'RDFd vocabs::::', vocabs );

    const creatingGraph = rdflib.graph();

    //do we need to do MD creation here??? (ideally not....)
    // const profile = {
    //     uri : 'TO BE DEFINEDDDD',
    // }
    // TODO: Create MD for this.
    // BUT FOR HERE. we just pass in the location of this dataaaa....

    const id = rdflib.sym( idUri );

    const schemaPropertyArray = schema['@graph'];

    logger.trace( 'schemaPropertyArray vocabs::::', schemaPropertyArray );

    schemaPropertyArray.forEach( prop =>
    {


        // Object.entries( dataObject ).forEach( ([key, value]) => {
        const label = prop['rdfs:label'];
        const typeInfoArray = prop['@id'].split( ':' );

        const vocabToUse = typeInfoArray[0];
        const vocabType = typeInfoArray[1];

        logger.trace( 'label????????????????????????????????????????::::', label, vocabToUse, vocabType );


        if( label && dataObject[ label ] )
        {
            logger.warn( 'THIS EXISTSSSSSSSSSSS', label );
            logger.warn( 'dataObject[ label ]dataObject[ label ]dataObject[ label ]dataObject[ label ]', dataObject[ label ] );

            // for each schema prop item:

            try {

                // `tODO:` ccheck what kind of type to be adding: 'literal' etc....
                if( typeof dataObject[ label ] === 'string' )
                {
                    logger.warn( 'setting string', label );

                    creatingGraph.add( id, vocabs[ vocabToUse ]( vocabType ), rdflib.literal( dataObject[ label ] )  );
                }

                if( Array.isArray( dataObject[ label ] ) )
                {
                    logger.warn( 'setting array', label );
                    creatingGraph.add( id, vocabs[ vocabToUse ]( vocabType ), rdflib.list( dataObject[ label ] )  );
                }

            } catch (e) {
                console.error('>>>>>>>.problem adding to graph',e);
                logger.error('was passing::::::::::: id:', id );
                logger.error('was passing::::::::::: vocab:', vocabs[ vocabToUse ](vocabType) );
                logger.error('was passing::::::::::: label:', dataObject[ label ] );
            }


            // creatingGraph.add( id, vocabstype'), vocabs.safe('PersonalProfileDocument') );


            // rdf.add(id, vocabs.RDFS('type'), vocabs.FOAF('PersonalProfileDocument'));
            // rdf.add(id, vocabs.DCTERMS('title'), rdf.literal(`${profile.name}'s profile document`));
            // rdf.add(id, vocabs.FOAF('maker'), webIdWithHashTag);
            // rdf.add(id, vocabs.FOAF('primaryTopic'), webIdWithHashTag);
            //
            // rdf.add(webIdWithHashTag, vocabs.RDFS('type'), vocabs.FOAF('Person'));
            // rdf.add(webIdWithHashTag, vocabs.FOAF('name'), rdf.literal(profile.name));
            // rdf.add(webIdWithHashTag, vocabs.FOAF('nick'), rdf.literal(profile.nick));
            //
            // if (profile.image) { rdf.add(webIdWithHashTag, vocabs.FOAF('image'), rdf.literal(profile.image)); } // TODO: this needs to be created as an LDP-NR
            //
            // if (profile.website) { rdf.add(webIdWithHashTag, vocabs.FOAF('website'), rdf.literal(profile.website)); }
            //
            //   // TODO: Test to make sure image/website are optional.
            //
            // if (postsLocation) {
            //   rdf.add(webIdPosts, vocabs.RDFS('type'), vocabs.SAFETERMS('Posts'));
            //   rdf.add(webIdPosts, vocabs.DCTERMS('title'), rdf.literal('Container for social apps posts'));
            //   rdf.add(webIdPosts, vocabs.SAFETERMS('xorName'), rdf.literal(postsLocation.name.toString()));
            //   rdf.add(webIdPosts, vocabs.SAFETERMS('typeTag'), rdf.literal(postsLocation.typeTag.toString()));
            // }

        }

    } )

    return creatingGraph
    // TODO: the schemas themselves need a name / location, for us to add that 'THis' 'IS type' 'resolveable...'

    // TODO: do theys chemas need a schemaDefinition type?
    // and therefore name / uri... which we link to as part of the vocab...

    // THIS IS TYPE SAFE(resolveableMap)



}


export default ohMyMakeMeRDF;
