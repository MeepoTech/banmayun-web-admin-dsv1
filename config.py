# this is the config file

# location to store uploaded client packages
dl_base_path = 'http://azy-beta.meepotech.com:808/upload/'
qr_android_path = '/var/www/new-website/upload/android-qr-code.png'
upload_dir = '/var/www/new-website/upload/'
download_root_url = 'http://test.meepotech.com/upload/'
# domain or IP which the redis sever run on
#redis_addr = '0.meepotech.com'

# platforms that we support(client)
platform_list = ['windows', 'linux32', 'linux64',
                 'mac', 'android', 'iphone', 'ipad']

# supported os version
adaptation = {
    'win32':    'XP/Vista/Win7/Win8',
    'win64':    'XP/Vista/Win7/Win8',
    'osx':      'Mac OS X 10.7+',
    'linux32':  ' ',
    'linux64':  ' ',
    'android':  'Android 2.2+',
    'ios':      'iOS 5.0+'
}

# postgres connect information
db_config = {
    'database': 'web',
    'user': 'postgres',
    'password': 'postgres',
    'host': '192.168.200.207',
    'port': '5432'
}
