 <?php

  $current_count = file_get_contents('count-scss');
  $f = fopen('count-scss', 'w+');
  fwrite($f, $current_count + 1);
  fclose($f);

  header("Location: https://github.com/dariuszsikorski/Csstetic/raw/master/dist/");

 ?>