function todaysDate(){
	var dtime = new Date()
	var months = ['January ','February','March','April','May','June','July','August','September','October','November','December'];	
	var month = months[dtime.getMonth()]
	var day = dtime.getDate()
	var year = dtime.getFullYear()
	var ordinal = null
	if(day == 1 || day == 21 || day == 31){
		ordinal = 'st'
	}else if(day == 3 || day == 23){
		ordinal = 'rd'
	}else{
		ordinal = 'th'
	}
	$('#todays_date').html(month + ' ' + day + ordinal + ' ' + year)
}

function timeConverter(timestamp){
	var a = new Date(timestamp * 1000);
	var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];					
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hours = ['1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM',
				 '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM', '12AM']
	var hour = hours[a.getHours()];
	var time = month + ' ' + date + ', ' + hour;
	return time;
}
	
function updateWeather(){
	var json_url = 'https://api.openweathermap.org/data/2.5/forecast?zip=53156&units=imperial&appid=59cf1a9efcb7c17c4b6e4c95d6b68e60';
	$.ajax({
		type: 'GET',
		url: json_url,
		dataType: 'json',
		success: function(data) {
							
			var span_counter = 0
			while(span_counter < 3){
				
				var date_time = data.list[span_counter].dt;
				date_time = timeConverter(date_time);
				var weather_desc = data.list[span_counter].weather[0].description
				var icon = "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/" 
					+ data.list[span_counter].weather[0].icon + ".png";
				var temp = Math.round(data.list[span_counter].main['temp']);
				var fl_temp = Math.round(data.list[span_counter].main['feels_like']);
				var win_speed = Math.round(data.list[span_counter].wind['speed']);
				var clouds = Math.round(data.list[span_counter].clouds['all']);
				
				var span_selector = '#span_' + span_counter
				$(span_selector).html(
					date_time 
					+ '<br/>'
					+ weather_desc
					+ '<br/>'
					+ '<img src="' + icon + '">' 
					+ '<br/>' 
					+ 'TEMP: ' + temp + '&#8457;'
					+ '<br/>'
					+ 'FEELS: ' + fl_temp + '&#8457;'
					+ '<br/>'
					+ 'WINDS: ' + win_speed + ' mph'
					+ '<br/>'
					+ 'CLOUDS: ' + clouds + '%'
				)
				
				span_counter ++;
			}
		}
	});
}

var art_array = []
function getNewsAPI(){			
	var json_url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=e510f28cada845bc965815537d39d792';
	$.ajax({
		type: 'GET',
		url: json_url,
		dataType: 'json',
		success: function(data){
			art_array = []
			for(art_num=0; art_num<data.articles.length	; art_num++){
				art_array.push(data.articles[art_num].title)						
			}					
		}
	});			
};		
		
var art_next = 0
function nextArticle(){			
	$("#art_hl").html(art_array[art_next])
	console.log(art_next)
	if(art_next != art_array.length){
		art_next = art_next + 1;
	}else{
		art_next = 0;
	}
}

todaysDate();
setInterval(todaysDate, 120000)
updateWeather();
setInterval(updateWeather, 120000);
getNewsAPI();
setInterval(getNewsAPI, 120000);
nextArticle();
setInterval(nextArticle, 30000);
