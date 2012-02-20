//show me love to the Module Pattern
var getflickrbybadge = function() {

      //private member
      var bigImage = null;

      function init() {

            if(Cache.get('mybooksflickr')) {

               var photos_cached = Cache.get('mybooksflickr');

               document.getElementById('results').innerHTML = photos_cached;  

            } else {

               asyncRequest.REQUEST('GET','getphotosfromjson.php?sid='+Math.random(),getflickrbybadge.seed);
            }
      };

      function seed(o) {

           document.getElementById('results').innerHTML = o; 

           Cache.set('mybooksflickr',o); 
      }
  
      function show(o) {

                        if(bigImage == null) {
                                 bigImage = document.createElement('div');
                                 bigImage.style.position = 'absolute';
                                 bigImage.style.left = '300px';
                                 bigImage.style.border = '5px solid #ccc';
                                 bigImage.style.padding = '4px';
                                 document.body.appendChild(bigImage);          
                        };//endif

                        var output = o.innerHTML.replace(/_s/,'_m');
                            bigImage.innerHTML = '<a href="#" onclick="this.parentNode.style.display = \'none\';return false;">' + output + '</a>';
                            bigImage.style.display = 'block';

                        var y;
                        if(self.pageYOffset) {
                               y = self.pageYOffset;
                         } else if(document.documentElement && document.documentElement.scrollTop) {
                               y = document.documentElement.scrollTop;
                        } else if(document.body) {
                               y = document.body.scrollTop; 
                        }

                        bigImage.style.top = 100 + y + 'px';
       };
   return {init: init,show: show,seed: seed}  
}();
Cache.expiry = 60*60*1000;
getflickrbybadge.init();