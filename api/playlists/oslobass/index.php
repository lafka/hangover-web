<?php
$files = array_filter(scandir("."), function($a) {
	return
		'.' !== substr($a, 0, 1)
			&& !is_dir($a)
			&& 'index.php' !== $a;
} );

$query = isset($_GET['q']) ? $_GET['q'] : '';

header("Content-Type: application/json");

if (!isset($_SERVER["REQUEST_METHOD"])) {
	$_SERVER["REQUEST_METHOD"] = "GET";
}

if ("GET" === $_SERVER["REQUEST_METHOD"]) {
	$content = array_map('file_get_contents', $files);

	$filter = function($data) use ($query) {
		if ('' !== $query) {
			return false !== strstr($data, $query);
		} else {
			return true;
		}
	};

	echo '[' . implode(',', array_filter($content, $filter)) . ']';
} else if ("POST" === $_SERVER["REQUEST_METHOD"]) {
	$json = json_decode(file_get_contents("php://input"));
	$json->id = substr(md5(time()), 0, 6);
	$json->author = $_COOKIE['_h_user'];
	$raw = json_encode($json);

	if (file_put_contents($json->id, $raw)) {
		header("HTTP/1.1 201 Created");
		echo $raw;
	} else {
		header("HTTP/1.1 500 Internal Server Error");
	}
}



