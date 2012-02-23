cache.js
========

Wrapper to store the results in localStorage HTML5 when the browser support it with timed expiry.

![Screenshot](http://farm8.staticflickr.com/7052/6777854986_4ff7c0b4a1.jpg)

How to use
----------

            var $ = function(id){return document.getElementById(id);}
            var getflickrbybadge = function() {
            //private member
             var bigImage = null;

              function init() {
               if(Cache.get('mybooksflickr')) {
                 var photos_cached = Cache.get('mybooksflickr');
                 $('results').innerHTML = photos_cached;  
                 $('status').innerHTML = '(read from cache)';
                } else {
                 asyncRequest.REQUEST('GET','getphotosfromjson.php?sid='+Math.random(),getflickrbybadge.seed);
                }
               };
               function seed(o) {
                   $('results').innerHTML = o
                   Cache.set('mybooksflickr',o)
                   $('status').innerHTML = 'read from api (fresh)'
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

I used cache.js in my blog: thinkphp.ro/blog @section reading

You can view in action: http://thinkphp.ro/apps/js-hacks/cache.js/