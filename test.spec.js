var library = require('./index.js');

var validator = new library.Validator();
var CreativeWorkProperties = [ 'http://schema.org/about',
              'http://schema.org/accountablePerson',
              'http://schema.org/alternativeHeadline',
              'http://schema.org/associatedMedia',
              'http://schema.org/audience',
              'http://schema.org/audio',
              'http://schema.org/author',
              'http://schema.org/comment',
              'http://schema.org/contentLocation',
              'http://schema.org/contentRating',
              'http://schema.org/contributor',
              'http://schema.org/copyrightHolder',
              'http://schema.org/copyrightYear',
              'http://schema.org/dateCreated',
              'http://schema.org/dateModified',
              'http://schema.org/datePublished',
              'http://schema.org/discussionUrl',
              'http://schema.org/editor',
              'http://schema.org/encoding',
              'http://schema.org/encodings',
              'http://schema.org/genre',
              'http://schema.org/headline',
              'http://schema.org/inLanguage',
              'http://schema.org/isFamilyFriendly',
              'http://schema.org/keywords',
              'http://schema.org/mentions',
              'http://schema.org/provider',
              'http://schema.org/publisher',
              'http://schema.org/publishingPrinciples',
              'http://schema.org/sourceOrganization',
              'http://schema.org/text',
              'http://schema.org/thumbnailUrl',
              'http://schema.org/version',
              'http://schema.org/video'],
aggregateRatingExpectedTypes = [ 'http://www.w3.org/2002/07/owl#Thing',
              'http://schema.org/Intangible',
              'http://schema.org/Rating',
              'http://schema.org/AggregateRating',
              'http://schema.org/Thing' ];
              
validator.endpoint = 'http://127.0.0.1:5822/';
validator.username = 'admin';
validator.password = 'admin';
validator.database = 'schema';
validator.configureConnection();

describe ("getProperties", function () {
    it("returns the complete set of properties", function (done) {
        validator.getProperties('CreativeWork', function (err, results){
            expect(results.length).toEqual(CreativeWorkProperties.length);
            for (var result = 0; result < results.length; result ++)
            {
                expect(CreativeWorkProperties.indexOf(results[result])).not.toEqual (-1);
            }
            done();
        });
    });
});

describe("checkIsValidProperty", function () {
   it("correctly identifies a valid property", function (done){
       validator.checkIsValidProperty('CreativeWork', 'about', function(err,result) {
           expect(result).toBe(true);
           done();
        }); 
    });
    
    it("correctly identifies an invalid property", function (done){
       validator.checkIsValidProperty('CreativeWork', 'PostalWhatever', function(err, result){
            expect(result).toBe(false);
            done();
       }); 
    }); 
});

describe('checkIsExpectedType', function (){
    it('correctly identifies when a property type matches', function (done){
        validator.checkIsExpectedType('aggregateRating', 'Rating', function (err, result){
            expect(result).toBe(true);
            done();
        });
    }); 
    
    it('correctly identifies when a property type does not match', function (done){
        validator.checkIsExpectedType('aggregateRating', 'Person', function (err, result){
            expect(result).toBe(false);
            done();
        });
    }); 
});

describe('getExpectedTypes', function () {
    it('Returns the correct list of expected types', function (done){
       validator.getExpectedTypes('aggregateRating', function (err, result){
            expect(result.length).toBe(aggregateRatingExpectedTypes.length);
            for (var eachResult = 0; eachResult < result.length; eachResult ++)
                expect(aggregateRatingExpectedTypes.indexOf(result[eachResult])).not.toEqual(-1);
            done();
       }); 
    });
});

describe('checkIsValidTypeInSchema'), function() {
    it('Correctly identifies a valid type', function (done){
        validator.checkIsValidTypeInSchema('Event', function(err, result){
            expect(result).ToEqual(true);
        done();
        });
    });
    it('Correctly identifies an invalid type', function (done){
        validator.checkIsValidTypeInSchema('Random6789x^', function(err, result){
            expect(result).ToEqual(false);
            done();
        });
    });
});
}