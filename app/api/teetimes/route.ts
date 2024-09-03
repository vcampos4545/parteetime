// app/api/teetimes/route.ts

import { CallTracker } from "assert";
import { NextResponse } from "next/server";

function formatTeeTime(teeTime: string) {
  const date = new Date(teeTime);

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const strMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${strMinutes} ${ampm}`;
}

async function getTeeItUpTimes(course: GolfCourse, date: string) {
  // Get alias
  let alias;
  try {
    const aliasUrl = `https://phx-api-be-east-1b.kenna.io/settings/alias?subdomain=${
      course.apiUrl.split(".")[0].split("//")[1]
    }`;
    const aliasResp = await fetch(aliasUrl);
    alias = (await aliasResp.json()).alias;
  } catch (e) {
    console.log("Error getting alias", e);
    return;
  }

  //Get facility Id
  let facilityId;
  try {
    const facilitiesUrl = "https://phx-api-be-east-1b.kenna.io/facilities";
    const facilitiesResp = await fetch(facilitiesUrl, {
      headers: { "X-Be-Alias": alias },
    });
    facilityId = (await facilitiesResp.json())[0].id;
  } catch (e) {
    console.log("Error getting facility ID", e);
    return;
  }

  let data;
  try {
    //Get Tee Times
    const url =
      "https://phx-api-be-east-1b.kenna.io/v2/tee-times?" +
      new URLSearchParams({ date, facilityIds: facilityId });

    const resp = await fetch(url, { headers: { "X-Be-Alias": alias } });
    data = (await resp.json()) as TeeItUpAPIResp[];
  } catch (e) {
    console.log("Error getting tee times", e);
    return;
  }

  // Parse into a standard format
  // TODO: Add additional info
  let teeTimes: TeeTime[] = [];
  for (const tt of data[0].teetimes) {
    tt.rates.forEach((rate) => {
      teeTimes.push({
        time: formatTeeTime(tt.teetime),
        price: rate.greenFeeWalking / 100,
      });
    });
  }
  return teeTimes;
}

async function getForeUpTimes(course: GolfCourse, date: string) {
  // TODO:
  // const temp =
  //   "https://foreupsoftware.com/index.php/booking/22023/9617#teetimes";
  // const tempReq = `https://foreupsoftware.com/index.php/
  //   api/booking/times?
  //   time=all&
  //   date=09-04-2024&
  //   holes=all&
  //   players=0& //players 0 means all
  //   booking_class=13254&
  //   schedule_id=9617&
  //   schedule_ids%5B%5D=9617&
  //   specials_only=0&
  //   api_key=no_limits`;

  console.log(course.apiUrl.split("#")[0].split("/").pop());
  const schedule_id = course.apiUrl.split("#")[0].split("/").pop();
  const url = `https://foreupsoftware.com/index.php/api/booking/times?time=all&date=${date}&holes=all&players=0&booking_class=13254&schedule_id=${schedule_id}&schedule_ids%5B%5D=${schedule_id}&specials_only=0&api_key=no_limits`;
  const resp = await fetch(url);
  const data = await resp.json();
  console.log("ForeUp Data: ", data);

  let teeTimes: TeeTime[] = [];
  for (const tt of data) {
    teeTimes.push({
      time: formatTeeTime(tt.time),
      price: tt.green_fee,
      minPlayers: tt.minPlayers,
      cartFee9: tt.cart_fee_9_hole,
      cartFee18: tt.cart_fee_18_hole,
    });
  }
  return teeTimes;
}

async function getChronoGolfTimes(course: GolfCourse, date: string) {
  // TODO:
  return [];
}

async function fetchTeeTimes(course: GolfCourse, date: string) {
  if (course.apiUrl.includes("teeitup")) {
    return await getTeeItUpTimes(course, date);
  } else if (course.apiUrl.includes("foreup")) {
    return await getForeUpTimes(course, date);
  } else if (course.apiUrl.includes("chronogolf")) {
    return await getChronoGolfTimes(course, date);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");
  const date =
    searchParams.get("date") || new Date().toISOString().split("T")[0];

  // TODO: Get courses near location (Name, distance, API URL)

  // Dummy data
  const courses = [
    {
      courseName: "Richter Park Golf Course",
      distance: "14.9 miles",
      apiUrl:
        "https://foreupsoftware.com/index.php/booking/22023/9617#teetimes",
    },
    {
      courseName: "Oak Hills Park Golf Course",
      distance: "7.9 miles",
      apiUrl: "https://oak-hills-park-golf-course.book.teeitup.com/",
    },
    {
      courseName: "Fairchild Wheeler (Black)",
      distance: "7.7 miles",
      apiUrl:
        "https://fairchild-wheeler-golf-course-black-course.book.teeitup.golf/",
    },
    {
      courseName: "Fairchild Wheeler (Red)",
      distance: "7.7 miles",
      apiUrl: "https://fairchild-wheeler-red-course.book.teeitup.golf/",
    },
  ];

  let courseTeeTimes: CourseTeeTimes[] = [];

  for (const course of courses) {
    const teeTimes = await fetchTeeTimes(course, date);
    if (teeTimes) {
      console.log("Tee times", teeTimes);
      courseTeeTimes.push({ ...course, teeTimes: teeTimes });
    } else {
      console.log("No tee times", teeTimes);
    }
  }

  console.log("Course Tee Times: ", courseTeeTimes);

  // Filter based on ZIP code (in a real app, you'd fetch from a database or API)
  // const filteredTeeTimes = teeTimes.filter(() => zip === "12345");

  return NextResponse.json(courseTeeTimes);
}
