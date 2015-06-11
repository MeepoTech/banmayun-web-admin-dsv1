#!/usr/bin/python

import psycopg2
from config import db_config

#TODO: exception handling
class DBConn:
    '''Connect to postgres'''
    def __init__(self):
        self.conn = psycopg2.connect(database = db_config['database'],
                                     user     = db_config['user'],
                                     password = db_config['password'],
                                     host     = db_config['host'],
                                     port     = db_config['port'])
        self.cur = self.conn.cursor()

    def __del__(self):
        self.conn.close()
        
    def insert(self,sql,args):
        self.cur.execute(sql,args)
        self.conn.commit()

    def update(self,sql,args):
        self.cur.execute(sql,args)
        self.conn.commit()

    def select(self,sql):
        self.cur.execute(sql)
        rows = self.cur.fetchall()
        return rows
    
    def delete(self,sql,args):
        self.cur.execute(sql,args)
        self.conn.commit()
