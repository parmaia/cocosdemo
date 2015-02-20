<?php 

require_once('lib/paymentwall.php');
Paymentwall_Base::setApiType(Paymentwall_Base::API_GOODS);
Paymentwall_Base::setAppKey('6acf7ab85be84713e1fb0945b20e4ee4'); // available in your Paymentwall merchant area
Paymentwall_Base::setSecretKey('5ac12cb8151b6d6a049a304d618bd907'); // available in your Paymentwall merchant area

$items = array(
	"001" => array(
		"name"  => "Gold",
		"price" => 6
		),
	"002" => array(
		"name"  => "Silver",
		"price" => 3
		),
	"003" => array(
		"name"  => "Bronze",
		"price" => 1
		),
	);
$users=array(
	"U001" => array(
		"email" => "parmaia@gmail.com"
		)
	);
$sku = $_GET["sku"];
$user= $_GET["user"];
$widget = new Paymentwall_Widget(
    $user, // id of the end-user who's making the payment
    'p10_1', // widget code, e.g. p1; can be picked inside of your merchant account
    array( // product details for Flexible Widget Call. To let users select the product on Paymentwall's end, leave this array empty
        new Paymentwall_Product(
            $sku, // id of the product in your system
            $items[$sku]["price"], // price
            'EUR', // currency code
            $items[$sku]["name"], // product name
            Paymentwall_Product::TYPE_FIXED // this is a time-based product; for one-time products, use Paymentwall_Product::TYPE_FIXED and omit the following 3 array elements
        )
    ),
array('email' => $users[$user]["email"]) // additional parameters
);
?>

<html>
	<head>
		<title>Demo Pago</title>
		<script>
			function notifyExit(){
			    window.opener.updateItems();
			    return true;
			}
		</script>
	<head>
	<body onunload="return notifyExit()">
		<center>
			<?php echo $widget->getHtmlCode() ?>
		</center>
	</body>
</html>";
