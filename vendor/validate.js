jQuery.validator.addMethod("phone", function(value, element) {
  var v = value.replace(/[^\+0-9]/g, '');
  var isvalid = this.optional(element) || /^\+?\d{10,14}$/.test(v);
  return isvalid;
}, "Пожалуйста, введите полный номер телефона в международном формате, например +7 921 123 4567");
$(function() {
  $('form').each(function() {
    var myrules = new Array();
    $(this).find('input[rules],select[rules],textarea[rules]').each(function() {
      myrules[$(this).attr('name')] = $(this).attr('rules');
      $(this).change(function() {
        $(this).valid();
      });
    });
    $(this).validate({
      rules: myrules,
    });
  }).submit(function(e){
    if ($(this).valid()) {
      $(this).find('button[type="submit"]')
        .html('<i class="fa fa-refresh fa-spin"></i>')
        .attr('disabled','disabled');
    }
  })
});