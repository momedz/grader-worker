
function main(input) {
    console.log(input.name);
}


process.stdin.resume();
process.stdin.setEncoding('ascii');
input = '';
process.stdin.on('data', function (data) {
    input = data;
});

process.stdin.on('end', function () {
    main(JSON.parse(input));
});
