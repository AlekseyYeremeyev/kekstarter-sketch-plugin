// var projects = [];
var url = NSURL.URLWithString(appUrl + "/projects");

var request = [NSMutableURLRequest requestWithURL:url cachePolicy:NSURLRequestReloadIgnoringCacheData timeoutInterval:30]

request.setHTTPMethod('GET');

var response = nil;
var error = nil;
var data = [NSURLConnection sendSynchronousRequest:request returningResponse:response error:error];

if (error == nil && data != nil) {
  var errorJson;

  var res = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:errorJson];

  var projects = [];

  for (var i = 0; i < res.projects.count(); i++) {
    var project = res.projects[i];
    projects.push({
      title: project.name,
      id: project._id
    })
  }
} else {
  document.showMessage("Can't connect to projects server.");
}


var message = null;
var items = [];

for (var i = 0; i < projects.length; i++){
  items[i] = projects[i].title;
};
