<?php
class Mysql {
    private $host;
    private $user;
    private $pwd;
    private $dbName;
    private $charset;
    private $conn = null; // �������ӵ���Դ
    public function __construct() {
        // Ӧ�����ڹ��췽����,��ȡ�����ļ�
        // Ȼ����������ļ�������˽������
        // �˴���û�������ļ�,��ֱ�Ӹ�ֵ
/*
		$this->host = 'localhost';
        $this->user = 'root';
        $this->pwd = 'root';
        $this->dbName = 'yunke_db2';
*/
		$this->host = 'rds93tr95z4t3s44ocsl.mysql.rds.aliyuncs.com';
        $this->user = 'yunke_user';
        $this->pwd = 'cnzlat2014KE';
        $this->dbName = 'yunke_db';


        // ����
        $this->connect($this->host,$this->user,$this->pwd);
        // �л���
        $this->switchDb($this->dbName);
        // �����ַ���
        $this->setChar($this->charset);
    }
    // ��������
    private function connect($h,$u,$p) {
        $conn = mysql_connect($h,$u,$p);
        $this->conn = $conn;
    }
    // �����л����ݿ�,��վ���ʱ��,�����õ���ֹһ����
    public function switchDb($db) {
        $sql = 'use ' . $db;
        $this->query($sql);
    }
    // ���������ַ���
    public function setChar($char) {
        $sql = 'set names ' .  $char;
        $this->query($sql);
    }
    // ������sql��ѯ
    public function query($sql) {
        return mysql_query($sql,$this->conn);
    }
    public function fetch($rs){
    	if(!$rs) {
            return false;
        }
    	return mysql_fetch_assoc($rs);
    }
    // �����ȡ���ж��е�select ���
    public function getAll($sql) {
        $list = array();
        $rs = $this->query($sql);
        if(!$rs) {
            return false;
        }
        while($row = mysql_fetch_assoc($rs)) {
            $list[] = $row;
        }
        return $list;
    }
    // ��ȡһ�е�select ���
    public function getRow($sql) {
        $rs = $this->query($sql);
        if(!$rs) {
            return false;
        }
        return mysql_fetch_assoc($rs);
    }
    // ��ȡһ��������ֵ
    public function getOne($sql) {
        $rs = $this->query($sql);
        if(!$rs) {
            return false;
        }
        $row = mysql_fetch_row($rs);
        return $row[0];
    }
    public function close() {
        mysql_close($this->conn);
    }
}
