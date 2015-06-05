#!/usr/bin/env python

import qrcode
import sys

def make(data, file):
    qr=qrcode.QRCode(version=3, error_correction=qrcode.constants.ERROR_CORRECT_L, border=1)
    qr.add_data(data)
    qr.make(fit=True)
    img=qr.make_image()
    img.save(file)

if __name__=='__main__':
    if len(sys.argv) == 3:
        make(sys.argv[1], sys.argv[2])
    else:
        print "usage: qr_mod url path"
        print "e.g. python qr_mod.py 'http://xx.meepotech.com/upload/android.apk' '/var/www/campus-website/upload/qr_android.png'" 
