const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Add custom routes for multi updates
server.put('/:resource/', (req, res) => {
    const resource = req.params.resource;
    const dataResource = router.db.get(resource);
    const dataResponse = [];
    Array.isArray(req.body) && req.body?.forEach(item => {
        const result = dataResource.replaceById(item.id, item).value();
        if (result) dataResponse.push(result);
    });
    res.jsonp(dataResponse);
});

// Add custom routes for multi remove
server.delete('/:resource/', (req, res) => {
    const resource = req.params.resource;
    const dataResource = router.db.get(resource);
    const dataResponse = [];
    Array.isArray(req.body) && req.body?.forEach(item => {
        const result = dataResource.removeById(item.id).value();
        if (result) dataResponse.push(result);
    });
    res.jsonp(dataResponse);
});

server.use(router);
const PORT = process?.env?.PORT_API || 3003;
server.listen(PORT, () => {
  console.log(`JSON Server is running in ${PORT}`);
});
