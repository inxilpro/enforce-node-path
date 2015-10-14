'use strict';

var path = require('path');
var tape = require('tape');	
var enforceNodePath = require('./index');

function run() {
	enforceNodePath(__dirname);
}

tape('enforce-node-path', function (t) {
	t.plan(3);

    process.env.NODE_PATH = null;
    t.throws(run, /NODE_PATH/, 'Should trigger an error with NODE_PATH unset.');

    process.env.NODE_PATH = path.join(__dirname, 'node_modules');
    t.throws(run, /NODE_PATH/, 'Should trigger an error with NODE_PATH set to a different path.');

    process.env.NODE_PATH = __dirname;
    t.doesNotThrow(run, 'Should not trigger an error with NODE_PATH set properly.');
});