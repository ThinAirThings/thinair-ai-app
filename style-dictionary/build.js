import StyleDictionary from 'style-dictionary';
console.log('Build started...');
console.log('\n==============================================');


// REGISTER THE CUSTOM FILTERS
StyleDictionary.registerTransform({
    name: 'lineHeight/auto',
    type: 'value',
    matcher: function(token) {
        return typeof token.value === 'object' && 'lineHeight' in token.value;
    },
    transformer: function(token) {
        if ('lineHeight' in token.value){ 
            token.value.lineHeight = 'auto';
        }
        return token.value
    }
});
StyleDictionary.registerTransform({
    name: 'name/custom',
    type: 'name',
    transformer: function(token, options) {
        // Extract the token path (array of path segments)
        const path = token.path;

        // Construct the new name by joining parts of the path.
        // Adjust the logic here based on your specific naming needs.
        // This example assumes a structure like "gradient.glass-stroke.0"
        let newName = path
            .filter(name => name !== 'thinair-web')
            .map(name => name.charAt(0).toUpperCase() + name.slice(1))
            .join('');

        // Capitalize the first letter of each segment and remove hyphens
        newName = newName.replace(/(?:^|-)(\w)/g, (_, c) => c.toUpperCase());

        return newName;
    }
});
// Regsiter Group
StyleDictionary.registerTransformGroup({
    name: 'js',
    transforms: [
        'lineHeight/auto',
        'name/custom',
    ]
});
const __dirname = new URL('.', import.meta.url).pathname;
// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
const StyleDictionaryExtended = StyleDictionary.extend(__dirname + '/config.json');

// FINALLY, BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms();


console.log('\n==============================================');
console.log('\nBuild completed!');