tar -xzvf dist.tar.gz
NODE_ENV=.env pm2 start --name vocabulary-server dist/index.js