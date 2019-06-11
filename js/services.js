app.factory('utils', function($q, $filter, $rootScope) {
	var def;
  return {    
    fl: function(fil, arr, condition){
    	return $filter(fil)(arr, condition)
		},
	  progress: function(evt){
	  	if (evt.lengthComputable) {
	  		var prog = Math.round(evt.loaded * 100 / evt.total)
	  		$rootScope.$broadcast("progress", { prog: prog })
      } else {
	  		$rootScope.$broadcast("progress", { prog: 0 })
      }
	  },
		done: function(evt){
	    try{
	    	var res = JSON.parse(evt.target.response)
	    	def.resolve(res)
	    } catch(err){
	    	l(evt.target.response)
	    }
	  },
	  failed: function() {
	    l("There was an error attempting to upload the file.")
	  },
	  canceled: function() {
	    l("The upload has been canceled by the user or the browser dropped the connection.")
	  },
    post: function(url, data, files){
    	// l(data, files)

    	def = $q.defer()
      var fd = new FormData()
      var xhr = new XMLHttpRequest()

    	fd.append("params", angular.toJson(data))    	
    	if(files){
    		var paths = [];
    		files.forEach(function(x){    			
	        fd.append("files[]", x.value)
	        paths.push(x.upPath)
    		})
      	fd.append("paths", angular.toJson(paths))
    	}

      xhr.upload.addEventListener("progress", this.progress, false)
      xhr.addEventListener("load", this.done, false)
      xhr.addEventListener("error", this.failed, false)
      xhr.addEventListener("abort", this.canceled, false)
      xhr.open("POST", url)
      xhr.send(fd)

    	return def.promise;
    }
	}
})