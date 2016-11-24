function post(endpoint, payload) {
  var task = NSTask.alloc().init()
  task.setLaunchPath('/usr/bin/curl');

  var args = NSArray.arrayWithObjects(
    '-v',
    '-X', 'POST',
    '--header', 'User-Agent: Sketch',
    'Content-Disposition: form-data; name=artboardfile; Content-Type=application/json;',
    '-d', '',
    endpoint + '/upload/sketch', nil);

  task.setArguments(args);

  var outputPipe = NSPipe.pipe();

  task.setStandardOutput(outputPipe);
  task.launch();

  var outputData = outputPipe.fileHandleForReading().readDataToEndOfFile();
  var outputString = NSString.alloc({
    initWithData: outputData,
    encoding: NSUTF8StringEncoding
  });

  return JSON.parse(outputString);
}