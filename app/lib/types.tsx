type DayInfo = {
  dawn: string;
  sunrise: string;
  sunset: string;
  dusk: string;
};

type Software = "teeitup" | "foreup" | "chronogolf";

type TeeItUpTeeTime = {
  courseId: string;
  teetime: string;
  backNine: false;
  players: string[];
  rates: [
    {
      _id: number;
      name: string;
      externalId: string;
      allowedPlayers: number[];
      holes: number;
      icons: [];
      tags: string[];
      golfnow: {
        TTTeeTimeId: number;
        GolfFacilityId: number;
        GolfCourseId: number;
      };
      trade: boolean;
      dueOnlineWalking: number;
      greenFeeWalking: number;
      acceptCreditCard: boolean;
      transactionFees: number;
      showTransactionFees: boolean;
    }
  ];
};

type TeeItUpResp = {
  dayInfo: DayInfo;
  teeTimes: TeeItUpTeeTime[];
  courseId: string;
  totalAvailableTeetimes: number;
  fromCache: Boolean;
};

// interface ChronoGolfResp {
//   id: number,
//   course_id: number,
//   start_time: string,
//   date: string, // YYYY-MM-DD
//   event_id: number,
//   hole: number,
//   round: number,
//   format: string,
//   departure: null,
//   restrictions: [],
//   out_of_capacity: true,
//   frozen: false,
//   green_fees:
// }

interface SearchFilters {
  timeOfDay?: string; // Optional time of day string (e.g., "Morning", "Afternoon", "Evening")
  minPrice?: number; // Optional minimum price
  maxPrice?: number; // Optional maximum price
}

interface TeeItUpParams {
  alias: string; // The alias of the course
  date: string; // YYYY-MM-DD
  facilityIds: string; // The ID of the facility
}
