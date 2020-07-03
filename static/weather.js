function ajax_formSubmitter(form) {
    console.log('running ajax form submit');
    //store form in form variable
    var $that = $(form);
    var that = $that;
    url = that.attr('action'),
      type = that.attr('method'),
      data = {};
    //find anything with attribute name
    that.find('[name]').each(function (index, value) {
      var that = $(this),
        name = that.attr('name'),
        value = that.val();
      data[name] = value;
    });
    $.ajax({
      url: url,
      type: type,
      data: data,
      success: function (response) {
        //console.log(response);
        //console.log("Ajax success)");
        var content = '';
        if(response.cod == 200){
            content += "<h3>" + response.name + "</h3><br><p>" + response.description + "<br> Temperature: " + response.temp + "  Feels Like: " + response.feelLike + "</p>";
            content += "<img src=\"http://openweathermap.org/img/w/" + response.icon + ".png\">"; 
          }
          else{
            content += "404, city not found. Please enter a valid city, lower case and two letter initials for state and country";
          }
          $('#weatherInfo').html(content);
      }
    });
    // this causes the form not to submit 
    console.log('false return');
    return false;
  }