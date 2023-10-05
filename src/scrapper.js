const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');
const {dump} = require('js-yaml');

// Directory path where your .js files are located
const sourceDirectory = 'src/components';

// Directory path where you want to save the .yml files
const targetDirectory = 'src/yaml';

// Create the target directory if it doesn't exist
if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory);
}

// Read all files in the source directory
fs.readdir(sourceDirectory, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const jsFiles = files.filter(file => path.extname(file) === '.js');

    jsFiles.forEach(jsFile => {
        const filePath = path.join(sourceDirectory, jsFile);

        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.error(`Error reading ${jsFile}:`, err);
                return;
            }

            const $ = cheerio.load(data);
            const keyValues = {};

            $('[id][data-name]').get().map(element => {
                const idValue = $(element).attr('id').replace(/['{}]/g, '');
                const dataNameValue = $(element).attr('data-name').replace(/['{}]/g, '');
                keyValues[dataNameValue] = `'#${idValue}'`
            });

            let yamlOutput = '';
            for (const key in keyValues) {
                yamlOutput += `${key}: ${keyValues[key]}\n`;
            }

            // Create a new .yml file in the target directory
            const ymlFileName = jsFile.replace('.js', '.yml');
            const ymlFilePath = path.join(targetDirectory, ymlFileName);

            fs.writeFileSync(ymlFilePath, yamlOutput);

            console.log(`YAML Output for ${jsFile} written to ${ymlFileName}`);
        });
    });
});
