
export function doAjaxRequest(url, cachebust, headers, method, data, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  if (!!headers) {
    Object.keys(headers).forEach((key) => {
      xhr.setRequestHeader(key, headers[key]);
    });
  }
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function (e) {
    return callback(null, xhr);
  };
  xhr.onerror = function (e) {
    return callback(new Error(), xhr);
  };
  xhr.send(data);  // doesn't seem to matter that data is null in the case of GET
}



