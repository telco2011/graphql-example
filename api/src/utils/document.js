import Table from 'cli-table';

const printRoutes = (server) => {
  const routes = server._router.stack;
  const table = new Table({ head: ['', 'Name', 'Path'] });

  console.log('\nAPI for this service \n');
  printLabel();

  for (let key in routes) {
    if (routes.hasOwnProperty(key)) {
      let val = routes[key];
      if(val.route) {
        val = val.route;
        let _o = {};
          _o[val.stack[0].method]  = [ val.path, val.path ];
          table.push(_o);
      }
    }
  }

  console.log(table.toString());

  printLabel();

  return table;
};

const printLabel = () => {
  console.log('\n********************************************');
  console.log('\t\tEXPRESS ROUTES');
  console.log('********************************************\n');
};

export default printRoutes;
