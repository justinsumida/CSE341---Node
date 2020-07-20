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
      /*error: function (jqXHR, exception){
        console.log(jqXHR);
        var content = '404 error, city not found. Please make sure to give two letter abbreviations for state and country.';
        $('#weatherInfo').html(content);
      },*/
      error: function (request, status, error) {
        console.log("Ajax Error");
        alert(request.responseText);
      },
      success: function (response) {
        //console.log(response);
        console.log("Ajax success)");
        var content = '';
        if(response.cod == '200'){
            content += "<img src=\"http://openweathermap.org/img/w/" + response.icon + ".png\">"; 
            content += "<h3>" + response.name + "</h3><p>" + response.description + "<br> Temperature: " + Math.round(response.temp) + "°  Feels Like: " + Math.round(response.feelLike) + "°</p>";
          }
          $('#weatherInfo').css("visibility","visible");
          $('#weatherInfo').html(content);
      }

      
    });
    // this causes the form not to submit 
    console.log('false return');
    return false;
  }