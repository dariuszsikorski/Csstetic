 <?php

  $current_count = file_get_contents('count-css');
  $f = fopen('count-css', 'w+');
  fwrite($f, $current_count + 1);
  fclose($f);

  header("Location: https://github.com/dariuszsikorski/Csstetic/raw/master/dist/");

 ?>