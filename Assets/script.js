{/* <h2 id="cityName"></h2>
<p id="temperature"></p>
<p id="humidity"></p>
<p id="wind"></p>
<p id="uv"></p> */}

const key = "20c39a25dd0737f0b31ac27a4c0e3325";
var city = "Denver";
var country = "us";


$("form").on("submit", function(e) {
    e.preventDefault();

    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&mode=json&appid=${key}`
    console.log("queryURL", queryURL)
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(result) {
        console.log('result: ', result);

        $("#cityName").text(result.city.name); // city name
        $("#date").text(`(${moment().format('L')})`); //date

        // get longitude and latitude for 2nd call
        var latitude = result.city.coord.lat;
        var longitude = result.city.coord.lon;
        
        // 2nd call to get 5 day forcast
        let queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + key;
        console.log("queryURL", queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(res) {
            console.log('res: ', res);
            var list = res.daily;

            for (i=0; i < 5; i++) {
                //get 5 days forcast info

                // add temperature

                // add humidity

                // add wind

                // add uv

                // make days forcast block
                    //date
                    //icon
                    //temp farenhite
                    //humidity
            }
        })

        //save city to local storage

        //make city as a button
        
    })
})