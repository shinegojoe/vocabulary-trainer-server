rm -r dist
cp -r src dist
tar -zcvf dist.tar.gz dist
node deploy.js