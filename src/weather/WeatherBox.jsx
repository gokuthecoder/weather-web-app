import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton"


export default function WeatherBox() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Punjab");

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=16b3163ab5e153687405d55cbc505a06`;
      const response = await fetch(url);
      const jsResponse = await response.json();
      setCity(jsResponse);
      console.log(jsResponse);
    };
    fetchApi();
  }, [search]);

  // Unix timestamp
  var unixTimestamp = city?.dt;

  // Check if unixTimestamp is valid
  if (unixTimestamp !== undefined) {
    // Convert Unix timestamp to milliseconds
    var milliseconds = unixTimestamp * 1000;

    // Create a new Date object
    var dateObject = new Date(milliseconds);

    // Get individual date components
    var day = dateObject.getDate();
    var month = dateObject.getMonth() + 1; // Month starts from 0
    var year = dateObject.getFullYear();
    var hours = dateObject.getHours();
    var minutes = dateObject.getMinutes();

    // Convert hours to 12-hour format and determine AM or PM
    var amOrPm = hours >= 12 ? "P.M." : "A.M.";
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12

    // Add leading zeros if necessary
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Concatenate the date components into the desired format
    var formattedDate =
      day +
      "/" +
      month +
      "/" +
      year +
      " " +
      hours +
      ":" +
      minutes +
      " " +
      amOrPm;

    console.log(formattedDate); // Output the formatted date
  } else {
    console.log("Invalid timestamp"); // Handle invalid timestamp
  }

  // const userLocation = async () => {

  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }

  //  async function showPosition(position) {
  //     // console.log("Latitude: " + position.coords.latitude +
  //     // "<br>Longitude: " + position.coords.longitude);

  //     var latitude = position.coords.latitude;
  //     var longitude = position.coords.longitude;

  //     // API endpoint
  //     var apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  //     // Fetch location data
  //     await fetch(apiUrl)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         var locationName = data.address.state;
  //         console.log("Location:", locationName);
  //       setSearch(locationName)
  //       })
  //       .catch((error) =>
  //         console.error("Error fetching location data:", error)
  //       );
  //   }
  // };

  // userLocation();

  return (
    <div className="w-[500px] m-auto">
      <Card>
        <CardHeader>
          <Input
            type="email"
            placeholder="Enter place name"
            className="flex justify-center "
            onChange={(e) => {
              setSearch(e.target.value);
              console.log(e.target.value);
            }}
          />
          {!city?.name ? (
            <CardTitle className="uppercase">{city?.message}</CardTitle>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-xs font-bold	text-[#dc2626]">
                  {formattedDate}
                </div>
                <CardTitle className="col-span-2 text-start ml-7">
                  <img
                    src={
                      "https://openweathermap.org/img/wn/" +
                      city.weather[0].icon +
                      "@2x.png"
                    }
                    alt="nothing"
                  />
                  {search}
                </CardTitle>
              </div>
            </>
          )}
          <CardDescription>
            Temprature:&nbsp;&nbsp;&nbsp;
            {Math.round(city?.main?.temp_min) - 273}&nbsp;&nbsp;°C
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center mx-auto">
          <div className="mx-3 text-xs font-bold	text-black	pt-1">
            Wind speed:&nbsp;&nbsp;{city?.wind?.speed}m/s
          </div>
          <div className="h-6 w-0 border-r-2 border-slate-900	mr-1"></div>
          <div className="h-6 w-0 border-r-2 border-slate-900	mr-1"></div>
          <div className="mx-3 text-xs font-bold	text-black	pt-1">
            Visibility:&nbsp;&nbsp;{city?.visibility / 1000}km
          </div>
          <div className="h-6 w-0 border-r-2 border-slate-900	mr-1"></div>
          <div className="h-6 w-0 border-r-2 border-slate-900	mr-1"></div>
          <div className="mx-3 text-xs font-bold	text-black	pt-1">
            Humidity:&nbsp;&nbsp;{city?.main?.humidity}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
