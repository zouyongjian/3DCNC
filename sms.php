<?php
require_once "mysql.class.php";
$action=$_GET["action"];
$html=<<<EOT
<html>
<head>
<title>sms</title>
<meta charset="utf-8">
</head>
<body>
<table align="center" cellpadding='0' cellspacing='0' border='1'>
<tr>
	<td>序号</td>
	<td>姓名</td>
	<td>手机</td>
	<td>归属地</td>
	<td>提交时间</td>
	<td>短信通知</td>
</tr>
{%smstrs}
</table>
</body>
</html>
EOT;
$smstrs=<<<EOT
<tr>
	<td>%1</td>
	<td>%2</td>
	<td>%3</td>
	<td>%4</td>
	<td>%5</td>
	<td>%6</td>
</tr>
EOT;
if(empty($action) ||$action=="show"){
	$mysql=new Mysql();
	$mysql->setChar("utf8");
	$sql="SELECT * FROM plugin_mobiletalk";
	$query=$mysql->query($sql);
	$temp="";
	while($val=$mysql->fetch($query)){
		$trstpl=$smstrs;
		$trstpl=str_replace("%1",$val['id'],$trstpl);
		$trstpl=str_replace("%2",$val['realname'],$trstpl);
		$trstpl=str_replace("%3",$val['mobile'],$trstpl);
		$trstpl=str_replace("%4",$val['location'],$trstpl);
		$trstpl=str_replace("%5",date("Y-m-d H:i:s",$val["postTime"]),$trstpl);
		$trstpl=str_replace("%6",$val['status'],$trstpl);
		$temp.=$trstpl;
	}
	$html=str_replace("{%smstrs}",$temp,$html);
	echo $html;
}
