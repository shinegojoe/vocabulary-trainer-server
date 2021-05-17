const axios = require('axios')
const fs = require('fs')

const deployServer = () => {
  const url = `http://203.204.160.248:3002/api/deployServer`
  fs.readFile( __dirname + '/dist.tar.gz', function (err, data) {
    if (err) {
      throw err; 
    }
    // console.log(data)
    const dataString = data.toString('binary')
  
    // const deploy = axios.post(url, {data: dataString})
    const deploy = axios({
      method: 'POST',
      url: url,
      data: {data: dataString},
      params: { name: 'vocabulary-server' }
    })

    deploy.then(()=> {
      console.log('deploy done')
    }).catch((e)=> {
      console.log('e')
    })
  });
}

deployServer()