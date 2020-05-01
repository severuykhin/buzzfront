const simpleSSHDeploy = require('simple-ssh-deploy');
const path = require('path');

const config = {
    auth: {
        host: '45.128.204.62',
        username: 'feedler',
        password: 'd85GyrHZ'
    },
    localFiles: path.resolve(__dirname, '../build/**/*.*'),
    remotePath: '/var/www/buzzwords.feedler.ru/public_html',
    silent: false 
};

simpleSSHDeploy(config)
    .then(() => {
        console.log('Deploy succeded');
    })
    .catch(error => {
        console.log(error);
    });