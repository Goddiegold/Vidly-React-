import { toast } from "react-toastify";
import init_log from "./logService";
import $ from 'jquery';


$.ajaxSetup({
  beforeSend: function (xhr) {
    xhr.fail(err => {
      const expectedError = err && err.status >= 400 && err.status < 500;
      if (!expectedError) {
        init_log.log(err);
        toast.error("An unexpected error occurred");
      }
      return Promise.reject(err);
    });
  },
});

function setJwt(jwt) {
  $.ajaxSetup({
  beforeSend:function(xhr) {   
    xhr.setRequestHeader("x-auth-token", jwt);
  }
  })
}

let http = {
  get: $.get,
  post: $.post,
  put: $.ajax,
  delete: $.ajax,
  setJwt
};


export default http;
