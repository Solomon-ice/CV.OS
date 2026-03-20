const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });
console.log('MONGODB_URI:', process.env.MONGODB_URI);
