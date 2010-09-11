node-jslint
===========

Easily use [jslint][] from the command line. Pass it the JS file you'd like to lint. For example:

    jslint foo.js

It assumes [nodejs][] globals and tolerates shebangs.

options
-------

-m, --show-members   Prints the members in file and exists
        jslint --show-members foo.js
        /*members
            browser, devel, onevar, undef, nomen, eqeqeq, plusplus, bitwise, 
            newcap, strict, immed, JSLINT, OptionParser, on, printMembers, 
            puts, exit, readFileSync, toString, replace, errors, length, line, 
        */

Installation
------------

You will need three files:

 - optparse.js
    - <http://github.com/jfd/optparse-js/raw/master/lib/optparse.js>
    - Place in your node.js include path (~/.node_libraries/) 
 - fulljslint_export.js
    - <http://github.com/timemachine3030/node-jslint/raw/master/lib/fulljslint_export.js>
    - Place in your node.js include path (~/.node_libraries/) 
 - jslint
    - <http://github.com/timemachine3030/node-jslint/raw/master/bin/jslint>
    - Place in your run time path 

License
-------

You can modify, copy and redistribute this software under the WTFPL, Version 2.
See <http://sam.zoy.org/wtfpl/COPYING> for details.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[jslint]: http://jslint.com/
[nodejs]: http://nodejs.org/
