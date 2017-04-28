const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const secret = 'thecakewasalie';
