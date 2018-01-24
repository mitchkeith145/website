const rimraf = require('rimraf');
const fs = require('fs');
const unzip = require('unzip');

console.log('cleaning old directory... started');
rimraf('./mitchkeith', (err) => {

    if (err === null || typeof err === 'undefined') {
        console.log('cleaning old directory... finished');

        console.log('creating new directory... started');
        fs.exists('./mitchkeith', (exists) => {
            if (!exists) {
                fs.mkdir('./mitchkeith', (err) => {
                    if (err === null || typeof err === 'undefined') {
                        console.log('creating new directory... finished');
						console.log('archive copied... started');
						fs.copyFile('/home/ec2-user/mitchkeith.zip', './mitchkeith/mitchkeith.zip', (err) => {
							if (err === null || typeof err === 'undefined') {
								console.log('archive copied... success');
								console.log('unpacking archive... started');
								fs.createReadStream('./mitchkeith/mitchkeith.zip').pipe(unzip.Extract({ path: './mitchkeith' })).on('close', (err) => {
									if (err === null || typeof err === 'undefined') {								
										console.log('unpacking archive... finished');
									} else {
										console.log('unpacking archive... finished, but in error');
										console.log(err);
									}
								});
							}
						});
                    }
                });
            } else {
                console.log('creating new directory... aborted because old folder already exists');
            }
        });

    } else {
        console.log('cleaning old directory... finished in error');
		console.log(err);
    }
    

});
