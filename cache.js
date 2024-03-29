window.Cache = {

       expiry: 60*60*1000,//

       prefix: 'cache.js # ',

       storage: window.localStorage,

       set: function(key, value, expiry) {

            this.expiry = expiry || this.expiry || 1e5

            var time = new Date().getTime(), 
                ob = JSON.stringify({
                data: value,
                expiry: time})

            this.storage.setItem(this.prefix + key, ob)

          return [key,value]   
       },

       get: function(key, callback) {

            var key = this.prefix + key,

                curr= this.storage.getItem(key)

                if(curr) {

                   var ob = JSON.parse(curr)

                       if(new Date().getTime() - ob.expiry < this.expiry) {

                              return ob.data

                       } else {

                              return false 
                       }
                }  

                if(typeof callback == 'function') {

                   return callback(key)
                }

           return false
       },

       remove: function(key) {

             var key = this.prefix + key 

             this.storage.removeItem(key)

           return key
       }
};