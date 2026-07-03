<?php
// Load raw images
$before_path = 'public/gfc_before_raw.jpeg';
$after_path = 'public/gfc_after_raw.jpeg';

if (!file_exists($before_path) || !file_exists($after_path)) {
    die("Raw images not found. Make sure download completed.\n");
}

function crop_logo($src_path, $dest_path) {
    echo "Processing $src_path...\n";
    $src = imagecreatefromjpeg($src_path);
    if (!$src) {
        die("Failed to load $src_path\n");
    }

    $width = imagesx($src);
    $height = imagesy($src);

    // We crop the image to remove the bottom white logo band.
    // The white band occupies approximately the bottom 25% (200px of 808px).
    // So we crop the height to 590px.
    $new_height = 590;

    $dest = imagecreatetruecolor($width, $new_height);
    
    // Copy the top portion of the image to the new canvas
    imagecopyresampled($dest, $src, 0, 0, 0, 0, $width, $new_height, $width, $new_height);
    
    // Save the cropped image
    imagejpeg($dest, $dest_path, 95);
    
    imagedestroy($src);
    imagedestroy($dest);
    echo "Successfully saved cropped image to $dest_path\n";
}

crop_logo($before_path, 'public/gfc_before.jpg');
crop_logo($after_path, 'public/gfc_after.jpg');
echo "All done!\n";
?>
