<?php 

require('config.php') ;


$valid_formats = array("jpg", "png", "gif", "bmp","jpeg");
if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST")
{
	$name = $_FILES['file']['name'];
	$size = $_FILES['file']['size'];
		
	if(strlen($name))
	{
		list($txt, $ext) = explode(".", $name);
		if(in_array($ext,$valid_formats))
		{
			if($size<(1024*1024)) // Check that it is less than 1 MB
			{
				$actual_image_name = $name;
				$tmp = $_FILES['file']['tmp_name'];
				list($width, $height) = getimagesize($tmp);

				$dest = null;

				$maxWidth = 115;
				$maxHeight = 115; 

				if($width > $maxWidth)
				{
					$source = imagecreatefromstring(file_get_contents($tmp));
					$scaledHeight = $height*$maxWidth/$width;
					if($scaledHeight < $maxHeight) $scaledHeight = $maxHeight;
					if($height > $maxHeight) $scaledHeight = $maxHeight;
					$dest = imagecreatetruecolor($maxWidth, $scaledHeight);
					imagecopyresampled($dest, $source, 0, 0, 0, 0, $maxWidth, $scaledHeight, $width, $height);
					imagedestroy($source);
					
					
				}
				else
				{
					$dest = imagecreatefromstring(file_get_contents($tmp));
				}
				
				if(imagepng($dest, UPLOAD_DIR.DELIMITER.$actual_image_name))
				{
					$image = getImage($actual_image_name);
					/*----------code starts here to create base64 image uri----------*/
					$imageExtn = pathinfo($image, PATHINFO_EXTENSION);
					$data = file_get_contents($image);
					$base64 = 'data:image/'.$imageExtn.';base64,'.base64_encode($data);
					
					/*----------code ends here to create base64 image uri----------*/
					echo "<div id='logoContainer' style='position:relative;margin-top:-70px;'><a class='remove-logo'><img src=".$image." name='comp-logo' class='preview' data-image-uri=".$base64."></a></div>";
				}
				else
				{
					echo "failed";
				}
			}
			else echo "Image file size max 1 MB";
		}
		else echo "Invalid file format..";
	}
	else echo "Please select image..!";
	exit;
}
?>