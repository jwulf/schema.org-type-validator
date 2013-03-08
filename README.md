schema.org-type-validator
=========================

A type validator for schema.org as a node.js module

## Installation ##

If you're using node.js, install it via npm thusly:

    $ npm install schema.org-type-validator
    
## Example Usage ##

Include the module in your project, and create a Validator:

    var schemaTypeValidation = require('schema.org-type-validator');
    
    var validator = new schemaTypeValidation.Validator ();
    
The Validator uses a Stardog triple store with the schema.org loaded into it. 
It assumes that you have one running on 127.0.0.1 with a database called 'schema'.
You can change this if you need to, like this:

    validator.endpoint = 'http://127.0.0.1:5822/';
    validator.username = 'admin';
    validator.password = 'admin';
    validator.database = 'schema';
    validator.configureConnection();
    
Here's what you can do:

Get all the properties of a type:

    validator.getProperties('CreativeWork', function (err, result) {
        for (var prop = 0; prop < result.length; prop ++)
            console.log(result[prop]);
    });
    
Get a list of expected types for a property:

    validator.getExpectedTypes('aggregateRating', function (err, result) {
        for (var type = 0; type < result.length; type ++)
            console.log(result[type]);
    });
    
Check if a given property is a valid property of a type:

    validator.checkIsValidProperty('CreativeWork', 'copyrightHolder', 
        function (err, result) {
            var word = ((result) ? 'is' : 'is not');
            console.log('copyrightHolder ' + word +
                ' a property of CreativeWork');
        }
    );
    
Check if a given type is valid for a property:

    validator.checkIsExpectedType('copyrightHolder', 'Place', 
        function (err, result) {
            var word = ((result) ? 'is' : 'is not');
            console.log('Place ' + word +
                ' a valid type for a copyrightHolder');
        }
    );

## Running the tests ##

Install Jasmine for node:
    
    npm install -g jasmine-node

Run the tests:

    jasmine-node test.spec.js