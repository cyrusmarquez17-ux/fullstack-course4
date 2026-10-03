(function (global) {

var ajaxUtils = {};

function getRequestObject() {
  if (global.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } 
  else if (global.ActiveXObject) {
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  }
  else {
    global.alert("Ajax is not supported!");
    return(null); 
  }
}

ajaxUtils.sendGetRequest = 
  function(requestUrl, responseHandler, isResponseBodyJson) {
    var request = getRequestObject();
    request.onreadystatechange = 
      function() { 
        handleResponse(request, 
                       responseHandler,
                       isResponseBodyJson); 
      };
    request.open("GET", requestUrl, true);
    request.send(null);
  };

function handleResponse(request,
                        responseHandler,
                        isResponseBodyJson) {
  if ((request.readyState == 4) &&
     (request.status == 200)) {

    if (isResponseBodyJson === undefined) {
      isResponseBodyJson = true;
    }

    if (isResponseBodyJson) {
      responseHandler(JSON.parse(request.responseText));
    }
    else {
      responseHandler(request.responseText);
    }
  }
}

global.$ajaxUtils = ajaxUtils;

})(window);
