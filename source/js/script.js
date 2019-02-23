'use strict';

$(document).ready(function() {
  $(".link--dropdown").click(function() {
    $(".link-categories").slideToggle();
  });

  $("#login").click(function() {
    $("#modal-login").toggle();
  });

  $("#register").click(function() {
    $("#modal-login").toggle();
    $("#modal-register").toggle();
  });

  $("#haveacc").click(function() {
    $("#modal-login").toggle();
    $("#modal-register").toggle();
  });

  $("#close1").click(function() {
    $("#modal-login").toggle();;
  });

  $("#close2").click(function() {
    $("#modal-register").toggle();
  });

});