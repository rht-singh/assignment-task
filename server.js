const express = require('express');
const cluster = require('cluster');
const os = require('os');
const swagger = require('swagger-ui-express');
const YAML = require('yamljs')
const routing = require('./controller/main');
const helmet = require('helmet');
const compression = require('compression');
const swagger_doc = YAML.load('./api.yml')
const app = express(); 



app.use('/api/doc',swagger.serve,swagger.setup(swagger_doc))
app.use('/api/v1',routing);
app.use(helmet());
app.use(compression());



if(cluster.isMaster){
    for(let i=0;i<os.cpus().length;i++){
        cluster.fork();
    }
    cluster.on('end',()=>{
        cluster.fork();
    })
}

else app.listen(8080,()=>{
    console.log('server started with port 8080')
})