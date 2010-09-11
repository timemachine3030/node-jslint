#!/usr/bin/env node
// jslint wrapper for nodejs 
//
// Adapted from rhino.js. Copyright 2002 Douglas Crockford 
//
// Adapted by Reid Burke (http://github.com/reid/node-jslint) 
//
// Additions by Daniel Lopretto (http://daniellopretto.com)
//
// JSLINT is provided by jslint.js modified to export the global
//
// Dependencies: 
//  - Optparse: http://github.com/jfd/optparse-js/

/*jslint 
    white: true, browser: true, onevar: true, undef: true, nomen: true,
    eqeqeq: true, plusplus: true, bitwise: true, regexp: false, newcap: true,
    immed: true, strict: true */

/*global 
    JSLINT: true, require: true, process: false, __filename */

"use strict";

(function (args) {
    var file, i, input, len, options = {}, parserOptions, 
    success, switches, 

    /**
     * This default list of options are assumptions,
     * override with the jslint syntax in your file.
     * See: http://www.jslint.com/
     */
    lint_options = {
        browser: true,
        devel: true,
        onevar: true,
        undef: true,
        nomen: true,
        eqeqeq: true,
        plusplus: true,
        bitwise: true,
        regexp: true,
        newcap: true,
        strict: true,
        immed: true,
        fragment: true
    }, 
    /**
    * Includes:
    */
    fs = require("fs"),
    optparse = require('optparse'),
    sys = require("sys"),
    jslint = require("jslint").JSLINT,

    /**
     * Members:
     */

    getFileContents = function (filename) {
        var input;
        if (!filename) {
            process.binding('stdio').writeError(parserOptions.banner);
            process.exit(1);
        }
        input = fs.readFileSync(filename);
        if (!input) {
            process.binding('stdio').writeError("jslint: Couldn't open file '" + filename + "'.");
            process.exit(1);
        } else {
            input = input.toString("utf8");
        }
        // remove shebang (lifted from node.js)
        input = input.replace(/^\#\!.*/, "");
        return input;
    },
    printErrors = function (results) {
        var error_obj,
            tools = require('tools');
        if (!results) {
            for (i = 0; i < jslint.errors.length; i += 1) {
                error_obj = jslint.errors[i];
                if (error_obj) {
                    process.binding('stdio').writeError(file + ": on line " + error_obj.line + ":" + error_obj.character +
                    ": " + error_obj.reason + "\n");
                }
            }
        }
    },
    printMembers = function () {
        var i = 0, 
        print = [],
        scafold = '    ';

        input = getFileContents(file);
        success = jslint(input);

        for (i in jslint.data().member) {
            if (typeof(i) === "string") {
                if ((scafold.length + i.length) > 72) {
                    print += scafold + "\n";
                    scafold = '    ';
                } else {
                    scafold += i + ", ";
                }
            }
        }
        sys.puts("/*members\n" + print + "*/");
    };

    // Array of command line options:
    switches = [
        ['-h', '--help', 'Shows help sections'],
        ['-m', '--show-members', 'Prints the members in file and exists']
    ];

    parserOptions = new optparse.OptionParser(switches);

    parserOptions.on(2, function (value) {
        file = value;
    });

    parserOptions.on("show-members", function () {
        options.printMembers = true;
    });

    parserOptions.banner = 'Usage: ' + __filename + " [options] file.js\n";


    // Take action according to command line options
    parserOptions.parse(args);

    if (options.printMembers) {
        printMembers();
    } else {
        input = getFileContents(file);
        success = jslint(input, lint_options);
        printErrors(success);
    }

}(process.ARGV));
// vim: set ft=javascript: 
