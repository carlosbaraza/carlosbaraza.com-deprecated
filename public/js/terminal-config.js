var commands = {};

commands.help = function() {
  var output = "<div>" +
               "<ul>" +
               "<li><strong>help</strong> - display this help.</li>" +
               "<li><strong>hello NAME</strong> - displays a greeting for NAME.</li>" +
               "<li><strong>weather LOCATION</strong> - show weather for LOCATION</li>" +
               "</ul></div>";
  return output;
};

commands.hello = function(args) {
  if(args.length < 2) return "<p>Hello. Why don't you tell me your name?</p>";
  return "Hello " + args[1];
};

commands.weather = function(args) {
  args.shift();
  var xhr = new XMLHttpRequest();
  xhr.open("get", "http://api.openweathermap.org/data/2.5/weather?units=metric&q=" + args.join(" "), false);
  xhr.send();
  if(xhr.status !== 200) return "Error :(";
  weather = JSON.parse(xhr.responseText);
  return "<p><img style=\"vertical-align: middle\" src=\"http://openweathermap.org/img/w/" +
         weather.weather[0].icon + ".png\">" +
         weather.weather[0].description + ", " +
         weather.main.temp + " &deg;C</p>"
};

Terminal.init(document.getElementById("terminal"), commands);