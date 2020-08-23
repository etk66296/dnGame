#!/usr/bin/python
import subprocess
import os, shutil
try:
    print 'delete /var/www/html/index.html'
    os.remove('/var/www/html/index.html')
except:
    print '/var/www/html/index.html not found'
try:
    print 'delete var/www/html/score.php'
    os.remove('/var/www/html/score.php')
except:
    print '/var/www/html/score.php not found'
try:
    print 'delete /var/www/html/*.js'
    os.remove('/var/www/html/*.js')
except:
    print '/var/www/html/*.js not found'
try:
    print 'delete folder /var/www/html/src'
    shutil.rmtree('/var/www/html/src')
except:
    print '/var/www/html/src not found'
try:
    print 'delete folder /var/www/html/statics'
    shutil.rmtree('/var/www/html/statics')
except:
    print '/var/www/html/statics not found'
print 'copyFiles'
def copytree(src, dst, symlinks=False, ignore=None):
    for item in os.listdir(src):
        s = os.path.join(src, item)
        d = os.path.join(dst, item)
        if os.path.isdir(s):
            try:
                shutil.copytree(s, d, symlinks, ignore)
            except:
                print '...'
        else:
            try:
                shutil.copy2(s, d)
            except:
                print '...'
copytree('./', '/var/www/html')
