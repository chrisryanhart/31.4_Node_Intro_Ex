const fs = require('fs');
const axios = require('axios');
let type;

const input = process.argv[2];

const writeFile = process.argv[3];
const readFile = process.argv[4];
const argv = process.argv;


function cat(path,type){
    fs.readFile(path,'utf8', function(err,data) {
            if (err) {
                console.log('Error reading file:');
                console.error(err);
                process.exit(1);
            }
            // if write, call write()
            if (type === "write"){
                writeToFile(writeFile,data);
            }

            console.log(`file contents: ${data}`);
            resultArr.push(data);
        })
    }
    


async function webCat(url,type){
    resultArr.length = 0;

    try {
        let resp = await axios.get(url);
        
        if (type){
            writeToFile(writeFile,resp.data)
        }
        console.log(resp.data)

    } catch(e){
        console.log('Webisite not found!', e)
    }
}

// url
// axios.get
function writeToFile(writeFile,data){

    fs.writeFile(writeFile,data,"utf8", err => {
        if (err){
            console.log('Couldnt write to file: ', err);
        }
        console.log('Successfully wrote to file.')
    });

}


// Good url
// webCat('http://google.com');

// Bad url
// webCat('http://rithmschool.com/no-such-path');

console.log('before the input boolean')
if (input === '--out' && writeFile && readFile){
    // call read/write func
    console.log('reading/writing file');

    let type = 'write'
    if (readFile.includes('.txt')){
        cat(readFile,type)
    } else {
        webCat(readFile,type)
    }

    // writeToFile(readFile,writeFile);
} else if (input.includes('http:')) {
    console.log('param is url');
    webCat(input);
} else if (input.includes('.txt')){
    console.log('param is text file');
    cat(input);
} else {
    console.log('Wrong input!');
}