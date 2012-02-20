<?php

if($_GET['sid']) {

     $rest = 'http://thinkphp.ro/apps/YQL/getFlickrBy/getFlickrBy.php?user=23455178@N06&search=books&format=json&amount=9&size=s';

     $content = get($rest);

  if($content !== 'Timeout') {

     $json = json_decode($content);

             if(is_array($json->photos) && isset($json->photos)) {

                         $output= '<ul class="thumbnail">'; 

                         foreach($json->photos as $p) {

                                 $output .='<li><a href="'.$p->url.'" onclick="getflickrbybadge.show(this);return false;" title="'.$p->title.'"><img src="'.$p->src.'" alt="'.$p->title.'" style="border: 0"/></a></li>';
                         }

                         $output .='</ul>';

                         echo$output;

             } else if(isset($json->photo) && !isset($json->photos)) {

                         $output= '<ul class="thumbnail">'; 

                         $p = $json->photo;

                                 $output .='<li><a href="'.$p->url.'" onclick="getflickrbybadge.show(this);return false;" title="'.$p->title.'"><img src="'.$p->src.'" alt="'.$p->title.'" style="border: 0"/></a></li>';

                         $output .='</ul>';

                         echo$output;

             } else {

                    echo$json->error;
             }

    } else {

           echo'Server Timeout.';
    }



}//end if


   function get($url) {

           $ch = curl_init();
           curl_setopt($ch,CURLOPT_URL,$url);
           curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,2);
           curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
           $data = curl_exec($ch);
           curl_close($ch);
           if(!empty($data)) {return $data;}
                else {return 'Timeout';}
    }

?>