<?php

// PHP 是世界上最好的语言之一

date_default_timezone_set('Asia/Shanghai');

define('ROOT', dirname(__FILE__));

require(ROOT . '/smarty/Smarty.class.php');

$MIMEType = array(
    'bmp' => 'image/bmp',
    'css' => 'text/css',
    'doc' => 'application/msword',
    'dtd' => 'text/xml',
    'gif' => 'image/gif',
    'hta' => 'application/hta',
    'htc' => 'text/x-component',
    'htm' => 'text/html',
    'html' => 'text/html',
    'xhtml' => 'text/html',
    'ico' => 'image/x-icon',
    'jpe' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'jpg' => 'image/jpeg',
    'js' => 'text/javascript',
    'json' => 'application/json',
    'mocha' => 'text/javascript',
    'mp3' => 'audio/mp3',
    'mp4' => 'video/mpeg4',
    'mpeg' => 'video/mpg',
    'mpg' => 'video/mpg',
    'manifest' => 'text/cache-manifest',
    'pdf' => 'application/pdf',
    'png' => 'image/png',
    'ppt' => 'application/vnd.ms-powerpoint',
    'rmvb' => 'application/vnd.rn-realmedia-vbr',
    'rm' => 'application/vnd.rn-realmedia',
    'rtf' => 'application/msword',
    'svg' => 'image/svg+xml',
    'swf' => 'application/x-shockwave-flash',
    'tif' => 'image/tiff',
    'tiff' => 'image/tiff',
    'txt' => 'text/plain',
    'vml' => 'text/xml',
    'vxml' => 'text/xml',
    'wav' => 'audio/wav',
    'wma' => 'audio/x-ms-wma',
    'wmv' => 'video/x-ms-wmv',
    'woff' => 'image/woff',
    'xml' => 'text/xml',
    'xls' => 'application/vnd.ms-excel',
    'xq' => 'text/xml',
    'xql' => 'text/xml',
    'xquery' => 'text/xml',
    'xsd' => 'text/xml',
    'xsl' => 'text/xml',
    'xslt' => 'text/xml'
);

$uri = $_SERVER['REQUEST_URI'];

$script = preg_replace('@\?.*@', '', $uri);

if ((preg_match('@\.([a-z]+)@i', $script, $m))) {
    $ext = $m[1];
    if (isset($MIMEType[$ext])) {
        header('Content-Type: ' . $MIMEType[$ext]);
    }
    if (file_exists(ROOT . $script)) {
        echo file_get_contents(ROOT . $script);
        exit(0);
    }
}

$smarty = new Smarty();
$smarty->setPluginsDir(array(
    ROOT . '/plugin'
));
$smarty->setTemplateDir(ROOT . '/template');
$smarty->setCompileDir(ROOT . '/templates_c');
$smarty->setConfigDir(ROOT . '/config');
$smarty->display('page/index.tpl'); // 从 template_dir 下寻找