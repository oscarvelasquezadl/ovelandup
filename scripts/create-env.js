const fs = require('fs');
require('dotenv').config();

fs.writeFileSync('./.env', `APP_NAME="${process.env.APP_NAME}"\n`);