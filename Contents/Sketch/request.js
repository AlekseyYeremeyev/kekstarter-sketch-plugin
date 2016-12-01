function post(endpoint, payload) {
  var task = NSTask.alloc().init()
  task.setLaunchPath('/usr/bin/curl');

  var args = NSArray.arrayWithObjects(
    '-v',
    '-X', 'PATCH',
    '--header', 'Content-Type:application/json',
    '--header', 'Accept: application/json',
    '-d',
    payload,
    endpoint);

  task.setArguments(args);

  var outputPipe = NSPipe.pipe();

  task.setStandardOutput(outputPipe);
  task.launch();

  var outputData = outputPipe.fileHandleForReading().readDataToEndOfFile();
  var outputString = NSString.alloc({
    initWithData: outputData,
    encoding: NSUTF8StringEncoding
  });
}
