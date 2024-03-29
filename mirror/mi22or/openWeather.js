/*!
Name: Open Weather
Dependencies: jQuery, OpenWeatherMap API
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: August 28, 2013
Licensed under the MIT license
*/;(function($){$.fn.openWeather=function(options){if(!this.length){return this;}
var defaults={descriptionTarget:null,maxTemperatureTarget:null,minTemperatureTarget:null,windSpeedTarget:null,humidityTarget:null,sunriseTarget:null,sunsetTarget:null,placeTarget:null,iconTarget:null,customIcons:null,units:'c',city:null,lat:null,lng:null,key:null,lang:'en',success:function(){},error:function(message){}}
var plugin=this;var el=$(this);var apiURL;plugin.settings={}
plugin.settings=$.extend({},defaults,options);var s=plugin.settings;apiURL='//api.openweathermap.org/data/2.5/weather?lang='+s.lang;if(s.city!=null){apiURL+='&q='+s.city.replace(' ','');}else if(s.lat!=null&&s.lng!=null){apiURL+='&lat='+s.lat+'&lon='+s.lng;}
if(s.key!=null){apiURL+='&appid='+s.key;}
var formatTime=function(unixTimestamp){var milliseconds=unixTimestamp*1000;var date=new Date(milliseconds);var hours=date.getHours();if(hours>12){hoursRemaining=24-hours;hours=12-hoursRemaining;}
var minutes=date.getMinutes();minutes=minutes.toString();if(minutes.length<2){minutes=0+minutes;}
var time=hours+':'+minutes;return time;}
$.ajax({type:'GET',url:apiURL,dataType:'jsonp',success:function(data){if(s.units=='f'){var temperature=Math.round(((data.main.temp-273.15)*1.8)+32)+'°F';var minTemperature=Math.round(((data.main.temp_min-273.15)*1.8)+32)+'°';var maxTemperature=Math.round(((data.main.temp_max-273.15)*1.8)+32)+'°';}else{var temperature=Math.round(data.main.temp-273.15)+'°C';var minTemperature=Math.round(data.main.temp_min-273.15)+'°';var maxTemperature=Math.round(data.main.temp_max-273.15)+'°';}
el.html(temperature);if(s.minTemperatureTarget!=null){$(s.minTemperatureTarget).text(minTemperature);}
if(s.maxTemperatureTarget!=null){$(s.maxTemperatureTarget).text(maxTemperature);}
$(s.descriptionTarget).text(data.weather[0].description);if(s.iconTarget!=null&&data.weather[0].icon!=null){if(s.customIcons!=null){var defaultIconFileName=data.weather[0].icon;var iconName;var timeOfDay;if(defaultIconFileName.indexOf('d')!=-1){timeOfDay='day';}else{timeOfDay='night';}
if(defaultIconFileName=='01d'||defaultIconFileName=='01n'){iconName='clear';}
if(defaultIconFileName=='02d'||defaultIconFileName=='02n'||defaultIconFileName=='03d'||defaultIconFileName=='03n'||defaultIconFileName=='04d'||defaultIconFileName=='04n'){iconName='clouds';}
if(defaultIconFileName=='09d'||defaultIconFileName=='09n'||defaultIconFileName=='10d'||defaultIconFileName=='10n'){iconName='rain';}
if(defaultIconFileName=='11d'||defaultIconFileName=='11n'){iconName='storm';}
if(defaultIconFileName=='13d'||defaultIconFileName=='13n'){iconName='snow';}
if(defaultIconFileName=='50d'||defaultIconFileName=='50n'){iconName='mist';}
var iconURL=s.customIcons+timeOfDay+'/'+iconName+'.png';}else{var iconURL='http://openweathermap.org/img/w/'+data.weather[0].icon+'.png';}
$(s.iconTarget).attr('src',iconURL);}
if(s.placeTarget!=null){$(s.placeTarget).text(data.name+', '+data.sys.country);}
if(s.windSpeedTarget!=null){$(s.windSpeedTarget).text(Math.round(data.wind.speed)+'');}
if(s.humidityTarget!=null){$(s.humidityTarget).text(data.main.humidity+'%');}
if(s.sunriseTarget!=null){var sunrise=formatTime(data.sys.sunrise);$(s.sunriseTarget).text(sunrise+' AM');}
if(s.sunsetTarget!=null){var sunset=formatTime(data.sys.sunset);$(s.sunsetTarget).text(sunset+' PM');}
s.success.call(this);},error:function(jqXHR,textStatus,errorThrown){s.error.call(this,textStatus);}});}})(jQuery);