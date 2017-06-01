<?php
$contents=file_get_contents("qqnum.txt");
if($contents==""||$contents=="0")
	$contents="1";
else
	$contents="0";
file_put_contents("qqnum.txt",$contents);
echo $contents;
?>