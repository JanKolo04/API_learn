const bcrypt = require('bcrypt');
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser'); 
const { User, validate } = require('../models/user');
const crypto = require('crypto');
const path = require('path'); 
const { nextTick } = require('process');
const router = express.Router();
const app = express();



module.exports = router;