// app/api/teetimes/route.ts

import { NextResponse } from "next/server";

async function getTeeItUpTimes(params: TeeItUpParams) {
  const url =
    "https://phx-api-be-east-1b.kenna.io/v2/tee-times?" +
    new URLSearchParams({ date: params.date, facilityIds: params.facilityIds });

  const resp = await fetch(url, { headers: { "X-Be-Alias": params.alias } });
  const data = (await resp.json()) as TeeItUpResp;
  return data;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get("zip");
  const alias = searchParams.get("alias");
  const date = searchParams.get("date");
  const facilityIds = searchParams.get("facilityIds");
  const timeOfDay = searchParams.get("timeOfDay");

  //Determine which site to query
  let site: Software = "teeitup";
  //Tee it up
  let teeTimes: TeeItUpResp;
  if (site == "teeitup") {
    teeTimes = await getTeeItUpTimes({
      alias,
      date,
      facilityIds,
    } as TeeItUpParams);
  } else {
    teeTimes = {} as TeeItUpResp;
  }
  // Filter based on ZIP code (in a real app, you'd fetch from a database or API)
  // const filteredTeeTimes = teeTimes.filter(() => zip === "12345");

  return NextResponse.json(teeTimes);
}
