<?php

$json = json_decode( file_get_contents('php://input'));

$user = array(
	"comotion" => '1qaz!QAZ',
	"lafa"     => '123asd',
);

if (isset($user[$json->username]) && (string) $json->password === $user[$json->username]) {
	$json->token   = base64_encode(md5($json->username .  $json->password));
	echo json_encode($json);
} else {
	header("Status: 401 Unauthorized");
}

/*
{
	username : "lafa",
	password : "938271",
	token    : "OWUyMzk1NjNjOWE5N2M0NWM3OGM2MTJj",
}
*/
