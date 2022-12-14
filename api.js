let key = "Your API Key..."

async function search (){
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${userLocation.value}&appid=${key}&units=metric`
    let response = await fetch(endpoint)
    let jsonResponse = await response.json()
    console.log(jsonResponse)
    let icon = `http://openweathermap.org/img/wn/${jsonResponse.weather[0].icon}@2x.png`
    image.src = icon
    cityName.innerHTML = jsonResponse.name;
    degree.innerHTML = `${Math.round(jsonResponse.main.temp)}${"<sup>°</sup>C"}`
    condition.innerHTML = jsonResponse.weather[0].description;
    country.innerHTML = jsonResponse.sys.country
    longitude.innerHTML = jsonResponse.coord.lon
    latitude.innerHTML = jsonResponse.coord.lat
    cloud.innerHTML = `${jsonResponse.clouds.all}${"%"}`
    pressure.innerHTML = jsonResponse.main.pressure
    humidity.innerHTML = `${jsonResponse.main.humidity}${"%"}`
    wind.innerHTML = `${jsonResponse.wind.speed}${"Km/hr"}`
    gust.innerHTML = `${jsonResponse.wind.gust}${"Km/hr"}`


    if (jsonResponse.weather[0].main === "Rain"){
        gen.style.backgroundImage = `url(https://www.pewtrusts.org/-/media/post-launch-images/2020/03/gettyimages838815210jpgmaster/16x9_m.jpg)`
    }
    else if(jsonResponse.weather[0].main === "Clouds"){
        gen.style.backgroundImage = `url(https://img.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg)`
    }
    else{gen.style.backgroundImage = `url(https://t3.ftcdn.net/jpg/01/19/18/92/360_F_119189251_kiyixdA3xj8dcCimKuVa4e5DcuslHJPs.jpg)`}
}

const timeDisp = ()=>{
    const time = new Date();

    const hour = timeFormat((time.getHours()))
    const minutes = timeFormat((time.getMinutes()))
    const day = timeFormat((time.getDay()))
    const month = timeFormat((time.getMonth()))
    const year = timeFormat((time.getFullYear()))
    clock.innerHTML = `${hour}:${minutes}-${day},${month} ${year}`
}
setInterval(timeDisp, 1000);

const timeFormat = (timer)=>{
    if(timer<10){
    return '0'+timer
    }
    else{
        return timer
    }
}

async function currentLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
        let longiTude = position.coords.longitude
       let  latiTude = position.coords.latitude
       let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latiTude}&lon=${longiTude}&appid=${key}&units=metric`
       fetch(url).then((response)=>response.json()).then((currentLocation)=>{
           cityName.innerHTML = currentLocation.name;
           degree.innerHTML = `${Math.round(currentLocation.main.temp)}${"<sup>°</sup>C"}`
           condition.innerHTML = currentLocation.weather[0].description;
           country.innerHTML = currentLocation.sys.country
           longitude.innerHTML = longiTude
           latitude.innerHTML = latiTude
           cloud.innerHTML = `${currentLocation.clouds.all}${"%"}`
           pressure.innerHTML = currentLocation.main.pressure
           humidity.innerHTML = `${currentLocation.main.humidity}${"%"}`
           wind.innerHTML = `${currentLocation.wind.speed}${"Km/hr"}`
           gust.innerHTML = `${currentLocation.wind.gust}${"Km/hr"}`

           if (currentLocation.weather[0].main === "Rain"){
            gen.style.backgroundImage = `url(https://www.pewtrusts.org/-/media/post-launch-images/2020/03/gettyimages838815210jpgmaster/16x9_m.jpg)`
        }
        else if(currentLocation.weather[0].main === "Clouds"){
            gen.style.backgroundImage = `url(https://img.freepik.com/free-photo/black-rain-abstract-dark-power_1127-2380.jpg)`
        }
        else{gen.style.backgroundImage = `url(https://t3.ftcdn.net/jpg/01/19/18/92/360_F_119189251_kiyixdA3xj8dcCimKuVa4e5DcuslHJPs.jpg)`}
       })
    })
}