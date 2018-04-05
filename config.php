<?php

$baseDir  = __DIR__; // Absolute path to your installation, ex: /var/www/mywebsite
$docRoot  = preg_replace("!{$_SERVER['SCRIPT_NAME']}$!", '', $_SERVER['SCRIPT_FILENAME']); # ex: /var/www
$baseURL  = preg_replace("!^{$docRoot}!", '', $baseDir); # ex: '' or '/mywebsite'
$protocol  = empty($_SERVER['HTTPS']) ? 'http' : 'https';
$port      = $_SERVER['SERVER_PORT'];
$dPort = ($protocol == 'http' && $port == 80 || $protocol == 'https' && $port == 443) ? '' : ":$port";
$domain    = $_SERVER['SERVER_NAME'];
$baseURL  = "$protocol://{$domain}{$dPort}{$baseURL}"; # Ex: 'http://example.com', 'https://example.com/mywebsite', etc.

$baseURL = "http://localhost/ExpressInvoicer";


date_default_timezone_set('Asia/Kolkata');

define('PROJECT_DIR', $baseDir);
define('DELIMITER','/');
define('BASE_URL',$baseURL);
define('AJAX_DIR', BASE_URL.DELIMITER.'ajax');
define('STYLE_DIR',BASE_URL.DELIMITER.'assets/css');
define('SCRIPT_DIR',BASE_URL.DELIMITER.'assets/js');
define('IMAGE_DIR',BASE_URL.DELIMITER.'assets/image');
define('LIBRARY_DIR',BASE_URL.DELIMITER.'library');
define('UPLOAD_DIR',PROJECT_DIR.DELIMITER.'uploads');

define('APP_VERSION', '1.0');
define('APP_TITLE', 'EXPRESS INVOICER');

function getScript($script){ return SCRIPT_DIR.DELIMITER.$script;}

function getStyle($style) { return STYLE_DIR.DELIMITER.$style; }

function getImage($image) { return BASE_URL.DELIMITER.'uploads/'.$image; }

