#!/usr/bin/env python

import web
import os
import json
import redis
import time
from config import *
import qr_mod
import db_conn
import qrcode

render = web.template.render("templates")

urls = (
    '/',            'Login',
    '/client',      'Client',
    '/home',        'Home',
    '/stats',	    'Stats',
    '/notice/(\d+)','NoticeDetail',
    '/notice/save', 'NoticeSave',
    '/notice/list', 'NoticeList',
    '/notice/del',  'NoticeDel',
    '/client/del',  'ClientDel',
    '/client/update','ClientUpdate'
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
        sql = "SELECT id,title,content,time,type,summary,cover,pos FROM notice WHERE id=%s"
        rows = db.select(sql,(id,))
        for row in rows:
            cont = {
                'id': row[0],
                'title': row[1],
                'content': row[2],
                'time': row[3],
                'type': row[4],
                'summary': row[5],
                'cover': row[6],
                'pos': row[7]
            }
        return json.dumps(cont)

    def POST(sefl,id):
        form = web.input()
        options = []
        params = []
        for key in form:
            options.append(key+'=%s')
            params.append(form[key])

        optionStr = ','.join(options)
        sql = "UPDATE notice SET " + optionStr + ' where id=%s'
        params.append(id)

        db = db_conn.DBConn()
        db.update(sql,params)
        
        return 'success'

class NoticeSave:
    def POST(self):
        form = web.input()
        title = form['title']
        content = form['content']
        time = form['time']
        type = int(form['type'])
        summary = form['summary']
        cover = form['cover']
        pos = 0

        db = db_conn.DBConn()
        sql = "INSERT INTO notice(title,content,time,type,summary,cover,pos) VALUES(%s,%s,%s,%s,%s,%s,%s)"
        db.insert(sql,(title,content,time,type,summary,cover,pos))
        return 'success'

class NoticeList:
    def GET(self):
        params = web.input(offset=None, count=None)
        db = db_conn.DBConn()
        rows = db.select('SELECT id,title,time,type,pos FROM notice order by pos desc, time desc LIMIT %s OFFSET %s',(params.count,params.offset))
        total= db.select('SELECT COUNT(*) FROM notice',());
        notice = []
        for row in rows:
            cont = {
                'id': row[0],
                'title': row[1],
                'time': row[2],
                'type': row[3],
                'pos': row[4] if row[4] else 0
            }
            notice.append(cont)

        res = {
            'count': len(notice),
            'notice': notice,
            'total': total[0][0]
        }
        return json.dumps(res)

class NoticeDel:
    def POST(self):
        ids = web.input(data={})
        db = db_conn.DBConn()
        sql = 'DELETE FROM notice where id=%s'
        for i in range(0,int(ids['count'])):
            db.delete(sql,(ids[str(i)],))
        return 'success'

class Client:
    def GET(self):
        db = db_conn.DBConn()
        rows = db.select('SELECT * FROM client ORDER BY status DESC',())
        total= db.select('SELECT COUNT(*) FROM client',());
        client = []
        for row in rows:
            cont = {
                'id': row[0],
                'name': row[1],
                'platform': row[2],
                'version': row[3],
                'time': row[4],
                'status': row[5],
                'dlcount': row[6]
            }
            client.append(cont)

        res = {
            'count': len(client),
            'client': client,
            'total': total[0][0]
        }
        return json.dumps(res)

    def POST(self):
        form = web.input(myfile={})

        # ckeck platform
        platform = form['platform']
        if platform not in platform_list:
            return 'invalid platform type'
        # read metadata

        version = form['version']
        filename = form['myfile'].filename
        date = form['time']

        filename = platform+'-'+version+'.'+filename.split('.')[-1];
        # save the file
        output = open(upload_dir + filename, 'w')
        output.write(form['myfile'].value)

        db = db_conn.DBConn()
        sql = "INSERT INTO client(name,platform,version,time,status,dlcount) VALUES(%s,%s,%s,%s,%s,%s)"
        db.insert(sql,(filename,platform,version,date,0,0))

        return 'success'

class ClientDel:
    def POST(self):
        ids = web.input(data={})
        db = db_conn.DBConn()
        sql = 'DELETE FROM client where id=%s'
        for i in range(0,int(ids['count'])):
            db.delete(sql,(ids[str(i)],))
        return 'success'

class ClientUpdate:
    def POST(self):
        data = web.input(data={})
        db = db_conn.DBConn()
        sql = "UPDATE client SET status=%s where id=%s"
        db.update(sql,(data['status'],data['id']))
        
        # create android qrcode
        sql = "SELECT name,platform FROM client WHERE id=%s"
        rows = db.select(sql,(data['id'],))

        if rows[0][1] == 'android' and int(data['status']) == 1:
            qr = qrcode.QRCode(
                version = 2,
                error_correction = qrcode.constants.ERROR_CORRECT_L,
                box_size = 10,
                border = 1
            )
            qr.add_data(dl_base_path + rows[0][0])
            qr.make(fit=True)
            img = qr.make_image()
            img.save(qr_android_path)
            os.system('chmod +r '+qr_android_path)
        return 'success'

app = web.application(urls, globals())
application = app.wsgifunc()

if __name__ == "__main__":
        app.run()
