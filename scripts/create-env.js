const fs = require('fs');

fs.writeFileSync('./.env', `API=${process.env.APP_NAME}\n`);