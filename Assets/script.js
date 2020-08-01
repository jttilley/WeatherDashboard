{/* <h2 id="cityName"></h2>
<p id="temperature"></p>
<p id="humidity"></p>
<p id="wind"></p>
<p id="uv"></p> */}

const key = "20c39a25dd0737f0b31ac27a4c0e3325";
var country = "us";

function makeFarenheit(k) {
    var f = (k - 273.15) * 1.80 + 32
    return f.toPrecision(4); //convert kelvin to fahrenheit
}

const updateWeather = function(res) {
    //get 5 days forcast info
    var f = res.current.temp;
    var uv = $("#uv")
    var uvi = res.current.uvi.toPrecision(4);

    console.log('uvi: ', uvi);

    // add temperature
    $("#temperature").text(`Temperature: ${f.toPrecision(4)} F`)

    // add humidity
    $("#humidity").text(`Humidity: ${res.current.wind_speed} %`)

    // add wind
    $("#wind").text(`Wind: ${res.current.wind_speed} MPH`)

    // add uv
    uv.text(`UV Index: ${uvi}`)

    // color uv
    if (uvi >= 11) {
        uv.attr("style","background-color: #9a569a");
    } else if (uvi >= 8) {
        uv.attr("style","background-color: red");
    } else if (uvi >= 6) {
        uv.attr("style","background-color: orange");
    } else if (uvi >= 3) {
        uv.attr("style","background-color: yellow");
    } else  {
        uv.attr("style","background-color: green");
    }

    // clear out forcasts
    $("daysForcast").empty();

    i = 1;
    // make days forcast block
    // for (i=0; i < 5; i++) {
        var daily = res.daily[i];
        console.log('daily: ', daily);

        //make a card
        var card = $("div").attr("class","card");
        card.attr("style","width: 200px; font-size: xx-small;");
        

        //date
        var date = $("p").text(moment().add(i,'days').format('l'));

        //icon http://openweathermap.org/img/wn/10d@2x.png
        var icon = $("img").attr("src","http://openweathermap.org/img/wn/" + daily.weather[0].icon + "@2x.png");
        console.log('res.daily[i].weather[0].icon: ', daily.weather[0].icon);
        console.log('daily.weather[0].icon: ', daily.weather[0].icon);

        // description
        var desc = $("p").text(daily.weather[0].description);
        console.log('daily.weather[0].description: ', daily.weather[0].description);
        
        //temp farenhite
        var f = makeFarenheit(daily.temp.max);
        var dayTemp = $("p").text(`${f} F`);
        console.log('f: ', f);

        //humidity
        var humidity = $("p").text(`${daily.humidity} %`);
        console.log('daily.humidity: ', daily.humidity);
        
        // append data to card
        card.append(date, icon, desc, dayTemp, humidity);

        // append card to html
        $("daysForcast").append(card);
    // }
}




$("form").on("submit", function(e) {
    e.preventDefault();
    e.stopPropagation();

    var city = $("#search").val();

    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&mode=json&appid=${key}`
    console.log("queryURL", queryURL)
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(result) {
        console.log('result: ', result);

        $("#cityName").text(result.city.name); // city name
        $("#date").text(moment().format('l')); //date

        // get longitude and latitude for 2nd call
        var latitude = result.city.coord.lat;
        var longitude = result.city.coord.lon;
        
        // 2nd call to get 5 day forcast
        let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + key;
        console.log("queryURL", queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(res) {
            console.log('res: ', res);
            
            updateWeather(res);
            
        })

        //save city to local storage

        //make city as a button
        
    })
})