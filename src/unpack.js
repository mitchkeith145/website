const rimraf = require('rimraf');
const fs = require('fs');

console.log('cleaning old directory... started');
rimraf('./mitchkeith', (err) => {

    if (typeof err === 'undefined') {
        console.log('cleaning old directory... finished');

        console.log('creating new directory... started');
        fs.exists('./mitchkeith', (exists) => {
            if (!exists) {
                fs.mkdir('./mitchkeith', (err) => {
                    if (typeof err === 'undefined') {
                        console.log('creating new directory... finished');
                    }
                });
            } else {
                console.log('creating new directory... aborted because old folder already exists');
            }
        });

    } else {
        console.log('cleaning old directory... finished in error');
        err.printStackTrace();
    }
    

});