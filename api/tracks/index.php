<?php
$files = array_filter(scandir("."), function($a) {
	return '.' !== substr($a, 0, 1) && 'index.php' !== $a;
} );

$query = isset($_GET['q']) ? $_GET['q'] : '';

header("Content-Type: application/json");

$content = array_map('file_get_contents', $files);

$filter = function($data) use ($query) {
		if ('' !== $query) {
			return false !== strstr($data, $query);
		} else {
			return true;
		}
};

$raw = str_replace(
	array("\t", "\n", '  '),
	'',
	'[' . implode(',', array_filter($content, $filter)) . ']');

echo $raw;



