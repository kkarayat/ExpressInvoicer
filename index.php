<?php require_once('config.php') ;?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
	<title><?php echo APP_TITLE;?></title>
	
	<!-- Bootstrap -->
	<link href="<?php echo getStyle('bootstrap.min.css')?>" rel="stylesheet">
	<link href="<?php echo getStyle('font-awesome.min.css')?>" rel="stylesheet">
	<link href="<?php echo getStyle('app.css')?>" rel="stylesheet">

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
    	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->

	<script>BASE_URL = "<?php echo BASE_URL;?>";</script>
</head>
<body>
	<header><?php include 'layouts/header.php';?></header>
	
	<section class="wrapper">
		<div class="container">
			<div class="row">
				<div class="col-md-3"><?php include 'layouts/left.php';?></div>
				<div class="col-md-9"><?php include 'layouts/right.php';?></div>
				<div class="clearfix"></div>
			</div>
		</div>
	</section>
	<div class="clearfix"></div>
	<footer class="footer mar-t20"><?php include 'layouts/footer.php';?></footer>
	
	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
	<script	src="<?php echo getScript('jquery-1.11.1.min.js')?>"></script>
	
	<!-- Include all compiled plugins (below), or include individual files as needed -->
	<script src="<?php echo getScript('bootstrap.min.js')?>"></script>
	<script src="<?php echo getScript('app.js')?>"></script>
	<script src="<?php echo getScript('invoice.js')?>"></script>
	<script src="<?php echo getScript('pdfMake/pdfmake.js')?>"></script>
	<script src="<?php echo getScript('pdfMake/vfs_fonts.js')?>"></script>
</body>
</html>