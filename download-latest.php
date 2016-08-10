<?php

$hit_count = @file_get_contents('count.txt');
$hit_count++;
@file_put_contents('count.txt', $hit_count);

header('Location: http://prettyminimal.com/csstetic/dist/csstetic-classic.zip'); // redirect to the real file to be downloaded

?>