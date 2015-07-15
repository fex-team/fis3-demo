<?php

ini_set('display_errors', 1);
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);

//引用静态资源管理类
require_once 'Resource.class.php';

//设置配置和模板文件夹
$root = dirname(__FILE__) . DIRECTORY_SEPARATOR;
FISResource::setConfig(array(
    'config_dir'    => $root . '/tpl/config/',
    'template_dir'  => $root . '/tpl/'
));

//渲染首页
display("page/index.php");
