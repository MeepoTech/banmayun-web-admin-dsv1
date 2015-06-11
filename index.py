#!/usr/bin/env python

import web
import os
import json
import redis
import time
from config import *
import qr_mod
import db_conn

render = web.template.render("templates")

urls = (
    '/',            'Login',
    '/upload',      'Upload',
    '/home',        'Home',
    '/stats',	    'Stats',
    '/notice/(\d+)','NoticeDetail',
    '/notice/save', 'NoticeSave',
    '/notice/list', 'NoticeList',
)

#r = redis.StrictRedis(host=redis_addr)
r = redis.StrictRedis()

class Stats:
    def GET(self):
	val = r.hget("stats","volume")
	return json.dumps(val)

class Login:
    def GET(self):
        return render.login()


class Home:
    def GET(self):
        return render.index()

class NoticeDetail:
    def GET(self,id):
        db = db_conn.DBConn()
        sql = "SELECT * FROM notice WHERE id=%s" % int(id)
        rows = db.select(sql)
        for row in rows:
            cont = {
                'id': row[0],
                'title': row[1],
                'content': row[2],
                'time': row[3],
                'type': row[4]
            }
        return json.dumps(cont)

    def POST(sefl,id):
        form = web.input(data={})
        title = form['title']
        content = form['content']
        time = form['time']
        type = int(form['type'])

        db = db_conn.DBConn()
        sql = "UPDATE notice SET title=%s,content=%s,time=%s,type=%s where id=%s"
        db.update(sql,(title,content,time,type,id))
        return 'success';

class NoticeSave:
    def POST(self):
        form = web.input(data={})
        title = form['title']
        content = form['content']
        time = form['time']
        type = int(form['type'])

        db = db_conn.DBConn()
        sql = "INSERT INTO notice(title,content,time,type) VALUES(%s,%s,%s,%s)"
        db.insert(sql,(title,content,time,type))
        return 'success'

class NoticeList:
    def GET(self):
        db = db_conn.DBConn()
        rows = db.select('select * from notice')
        res = []
        for row in rows:
            cont = {
                'id': row[0],
                'title': row[1],
                'time': row[3],
                'type': row[4]
            }
            res.append(cont)
        return json.dumps(res)

    def POST(self):
        ids = web.input(data={})
        db = db_conn.DBConn()
        sql = 'DELETE FROM notice where id=%s'
        for i in range(0,int(ids['count'])):
            db.delete(sql,ids[str(i)])
        return 'success'

class Upload:
    def GET(self):
        return """<html><head></head><body>
            <form method="POST" enctype="multipart/form-data" action="">
            <input type="text" name="version" />
            <input type="text" name="platform" />
            <input type="file" name="myfile" />
            <br/>
            <input type="submit" />
            </form>
            </body></html>"""

    def POST(self):
        form = web.input(myfile={})

        # ckeck platform
        platform = form['platform']
        if platform not in platform_list:
            return 'invalid platform type'
        # read metadata

        version = form['version']
        filename = form['myfile'].filename
        date = time.strftime('%Y-%m-%d', time.localtime(time.time()))

        # save the file
        output = open(upload_dir + filename, 'w')
        output.write(form['myfile'].value)

        # store metadata
        redis_key = 'release:' + platform
        meta = {
            'platform': platform,
            'version': version,
            'filename': filename,
            'date': date,
            'adaptation': adaptation[platform],
            'size': str(round(os.path.getsize(upload_dir + filename)/1024/1024.0, 2)) + 'M'
        }

        r.hmset(redis_key, meta)
        if not r.hexists(redis_key, 'downloads'):
            r.hset(redis_key, 'downloads', 0)
        # generate qrcode for android platform
        if "android" in platform:
            download_url = download_root_url + filename
            qr_mod.make(data = download_url, file = qr_path) 
        return 'success'


app = web.application(urls, globals())
application = app.wsgifunc()

if __name__ == "__main__":
        app.run()
