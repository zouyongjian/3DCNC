<?php
/*设置UTF编码*/
header("Content-type: text/html; charset=utf-8"); 
/*默认时区设置，避免时间戳误差，本地程序有设置则无须重复设置*/
function_exists('date_default_timezone_set') && date_default_timezone_set('Etc/GMT-8');
/*应用参数信息,请将以下参数值设定为自身应用的参数信息*/
define("APP_ID","690967640000261152");  //应用ID
define("APP_SECRET","58486cac19c3cf77ad43a483168aaaa1");    //应用密钥
//得到accessToken
$data = "app_id=690967640000261152&app_secret=58486cac19c3cf77ad43a483168aaaa1&grant_type=client_credentials"; 
$ch = curl_init("https://oauth.api.189.cn/emp/oauth2/v2/access_token"); 
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1); 
curl_setopt($ch,CURLOPT_POST,1);//使用post提交数据 
curl_setopt($ch,CURLOPT_POSTFIELDS,$data);//设置 post提交的数据 
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
// 从证书中检查SSL加密算法是否存在 
 
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false); 
$access_token = curl_exec($ch); 
curl_close($ch); 
$access_token = json_decode($access_token,true);
$access_token = $access_token['access_token'];
// echo json_encode($access_token); 
// echo "haha";exit;
//得到accessToken
define("ACCESS_TOKEN", $access_token);//应用TOEKN
$acceptor_tel = "";
$message = "";
$number = rand('100000','999999');
$action=$_GET["action"];
if($action=="getVerify"){
    $acceptor_tel=addslashes($_POST["telNum"]);
};
/*准备所有参数，进行排序，拼接*/
$name = "3D云课"; 
$message = "您的验证码为:".$number;
$template_id = "91552223";      //必选参数，短信模板ID
//$template_param = "{\"param1\":\"3D云课\",\"param2\":$number}"; //必选参数，模板匹配参数
$template_param = "{'param1':".$name.",'param2':".$message."}";  //必选参数，模板匹配参数
$timestamp = date('Y-m-d H:i:s');   //必选参数，时间戳
$params_array = array(
    'app_id'            => APP_ID,
    'access_token'      => ACCESS_TOKEN,
    'acceptor_tel'      => $acceptor_tel,
    'template_id'       => $template_id,
    'template_param'    => $template_param,
    'timestamp'         => $timestamp
);
ksort($params_array);   //按照key进行字典升序

$params_str = "";   //请求参数间以‘&’字符拼接成的字符串
foreach ($params_array as $k=>$v){
    $params_str .= '&'.$k.'='.$v;
}
$params_str = substr($params_str, 1);
/*sign参数签名获取*/
$hmac = hash_hmac("sha1", $params_str, APP_SECRET, true);
$sign = base64_encode($hmac);   //非必选参数，参数签名
$params_array['sign'] = $sign;
$url = 'http://api.189.cn/v2/emp/templateSms/sendSms';  //模板短信请求地址

$http = new http();
/*发送POST请求*/
$result = $http->post($url, $params_array);
$ajaxRes = array(
    'number'            => $number,
    'result'      => $result
);
echo json_encode($ajaxRes);




class http{
    
    /**
     * POST 请求
     * @param  $url 请求地址
     * @param  $params  请求参数数组
     * @param  $header  HTTP头信息
     */
     function post($url , $params_array = array(), $header = array()){
        $ch = curl_init();  // 初始化CURL句柄
        curl_setopt($ch, CURLOPT_URL, $url);    //设置请求的URL
        curl_setopt($ch, CURLOPT_POST, 1);  //启用POST提交
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);     // 设为TRUE把curl_exec()结果转化为字串，而不是直接输出
        $postdata = '';     //请求参数数组转化为以‘&’分隔的字符串
        if(!empty($params_array)) {
            foreach($params_array as $k=>$v) {
                $postdata .= $k.'='.rawurlencode($v).'&';       //注意，此处统一对传入参数做urlencode处理，请勿重复encdoe参数
            }
            $postdata = substr($postdata, 0, -1);
        }
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);    //设置POST提交的请求参数
        curl_setopt($ch,CURLOPT_HTTPHEADER,$header);    //设置HTTP头信息
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);  //设置超时时间15秒
        $response = curl_exec($ch); //执行预定义的CURL
        curl_close($ch);    //关闭CURL
        return $response;
    }
    
    /**
     * GET 请求
     * @param  $url 请求地址
     */
    function get($url){
        $ch = curl_init();  // 初始化CURL句柄
        curl_setopt($ch, CURLOPT_URL, $url);    //设置请求的URL
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);     // 设为TRUE把curl_exec()结果转化为字串，而不是直接输出
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);  //设置超时时间15秒
        $response = curl_exec($ch); //执行预定义的CURL
        curl_close($ch);    //关闭CURL
        return $response;
    }
}
?>