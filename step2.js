const fs = require('fs');
const axios = require('axios');

const input = process.argv[2]

function cat(path){
    fs.readFile(path,'utf8', (err,data) => {
        if (err) {
            console.log('Error reading file:');
            console.error(err);
            process.exit(1);
        }
        console.log(`file contents: ${data}`)
    } )
}

async function webCat(url){
    try {
        let resp = await axios.get(url);
        console.log(resp.data)
    } catch(e){
        console.log('Webisite not found!', e)
    }
}

// Good url
// webCat('http://google.com');

// Bad url
// webCat('http://rithmschool.com/no-such-path');


if (input.includes('http:')) {
    console.log('param is url');
    webCat(input);

} else if (input.includes('.txt')){
    console.log('param is text file');
    cat(input);
} else {
    console.log('neither file nor url');
}