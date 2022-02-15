const { exec } = require('child_process');
const fs = require('fs');

code = `
function main(input) {
    const {
        
    }
    console.log(input.name);
}

main({
    name: "karn",
})
`

input_code = `

process.stdin.resume();
process.stdin.setEncoding('ascii');
input = '';
process.stdin.on('data', function (data) {
    input = data;
});

process.stdin.on('end', function () {
    main(JSON.parse(input));
});
`

input = {
    name: "Klawmprasrerdh"
}



fs.writeFile('test.js', code + input_code, (err) => {})
fs.writeFile('input.json', JSON.stringify(input), (err) => {})

exec(`NODE_ENV=GRADER`)
exec(`node test.js < input.json`, (error, stdout, stderr) => {
    console.log(stdout)
})

