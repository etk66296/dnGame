#!/usr/bin/python

import subprocess
import os, shutil

try:
    print 'delete /var/www/html/index.html'
    os.remove('/var/www/html/index.html')
except:
    print '/var/www/html/index.html not found'
try:
    print 'delete /var/www/html/build.py'
    os.remove('/var/www/html/build.py')
except:
    print '/var/www/html/index.html not found'
try:
    print 'delete folder /var/www/html/src'
    shutil.rmtree('/var/www/html/src')
except:
    print '/var/www/html/src not found'
try:
    print 'delete folder /var/www/html/assets'
    shutil.rmtree('/var/www/html/assets')
except:
    print '/var/www/html/assets not found'
try:
    print 'delete folder /var/www/html/doc'
    shutil.rmtree('/var/www/html/doc')
except:
    print '/var/www/html/assets not found'

# copy the new files
print 'copyFiles'
def copytree(src, dst, symlinks=False, ignore=None):
    for item in os.listdir(src):
        s = os.path.join(src, item)
        d = os.path.join(dst, item)
        if os.path.isdir(s):
            try:
                print 'copy directoy: ' + s + ' --> '  + d
                shutil.copytree(s, d, symlinks, ignore)
            except:
                print 'error copying a directory' + s + ' --> '  + d
        else:
            try:
                print 'copy file: ' + s + ' --> '  + d
                shutil.copy2(s, d)
            except:
                print 'error copying file' + s + ' --> '  + d
copytree('./', '/var/www/html')
