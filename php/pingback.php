<?php

$user = $_GET["uid"];
$sku = $_GET["goodsid"];

$string_data = file_get_contents("datos/items.txt");
$datos = unserialize($string_data);

if(!isset($datos[$user])){
	$datos[$user]=(array(
		"001" => 0,
		"002" => 0,
		"003" => 0
		)
	);
}

$datos[$user][$sku] += 1;

$string_data = serialize($datos);
file_put_contents("datos/items.txt", $string_data);

echo "OK";

?>