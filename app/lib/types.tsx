type GolfCourse = {
  courseName: string;
  distance: string;
  apiUrl: string;
};

type TeeTime = {
  time: string; // HH:MM AM/PM
  price: number; // USD
  minPlayers?: number;
  maxPlayers?: number;
  cartFee9?: number;
  cartFee18?: number;
};

type CourseTeeTimes = GolfCourse & {
  teeTimes: TeeTime[];
};
type TeeItUpAPIResp = {
  dayInfo: {
    dawn: string;
    sunrise: string;
    sunset: string;
    dusk: string;
  };
  teetimes: {
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
  }[];
  courseId: string;
  totalAvailableTeetimes: number;
  fromCache: Boolean;
};

type ForeUpAPIResp = {};

type ChronoGolfAPIResp = {
  id: number;
  course_id: number;
  start_time: string;
  date: string; // YYYY-MM-DD
  event_id: number;
  hole: number;
  round: number;
  format: string;
  departure: null;
  restrictions: [];
  out_of_capacity: true;
  frozen: false;
};

interface SearchFilters {
  timeOfDay?: string; // Optional time of day string (e.g., "Morning", "Afternoon", "Evening")
  minPrice?: number; // Optional minimum price
  maxPrice?: number; // Optional maximum price
}
