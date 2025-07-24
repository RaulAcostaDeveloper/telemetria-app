interface TimeTraveled {
  eventId: number;
  dateGps: string;
  lat: number;
  lon: number;
  hours: number;
}

interface AverageRPM {
  eventId: number;
  dateGps: string;
  lat: number;
  lon: number;
  rpm: number;
}

interface Distance {
  eventId: number;
  dateGps: string;
  lat: number;
  lon: number;
  distance: number;
}

interface Value {
  imei: number;
  averageRPM: AverageRPM[];
  distance: Distance[];
  timeTraveled: TimeTraveled[];
}

interface FuelVehicleOBDDataMock {
  statusCode: number;
  message: string;
  value: Value;
}

export const fuelVehicleOBDDataMock: FuelVehicleOBDDataMock = {
  statusCode: 200,
  message: "OK",
  value: {
    imei: 4894894161653,
    averageRPM: [
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:30:00Z",
        lat: 20.1234567,
        lon: -100.9876543,
        rpm: 254,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:31:00Z",
        lat: 20.1235,
        lon: -100.9876,
        rpm: 824,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:32:00Z",
        lat: 20.12353,
        lon: -100.98755,
        rpm: 1550,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:33:00Z",
        lat: 20.12357,
        lon: -100.9875,
        rpm: 2160,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:34:00Z",
        lat: 20.1236,
        lon: -100.98745,
        rpm: 2780,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:35:00Z",
        lat: 20.12364,
        lon: -100.9874,
        rpm: 3220,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:36:00Z",
        lat: 20.12368,
        lon: -100.98735,
        rpm: 3770,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:37:00Z",
        lat: 20.12371,
        lon: -100.9873,
        rpm: 4430,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:38:00Z",
        lat: 20.12375,
        lon: -100.98725,
        rpm: 4200,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:39:00Z",
        lat: 20.12378,
        lon: -100.9872,
        rpm: 4470,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:40:00Z",
        lat: 20.12381,
        lon: -100.98715,
        rpm: 4640,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:41:00Z",
        lat: 20.12384,
        lon: -100.9871,
        rpm: 4830,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:42:00Z",
        lat: 20.12387,
        lon: -100.98705,
        rpm: 5080,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:43:00Z",
        lat: 20.1239,
        lon: -100.987,
        rpm: 5290,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:44:00Z",
        lat: 20.12393,
        lon: -100.98695,
        rpm: 5230,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:45:00Z",
        lat: 20.12396,
        lon: -100.9869,
        rpm: 5620,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:46:00Z",
        lat: 20.12399,
        lon: -100.98685,
        rpm: 5770,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:47:00Z",
        lat: 20.12402,
        lon: -100.9868,
        rpm: 6050,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:48:00Z",
        lat: 20.12405,
        lon: -100.98675,
        rpm: 6000,
      },
      {
        eventId: 2009,
        dateGps: "2023-05-15T14:49:00Z",
        lat: 20.12408,
        lon: -100.9867,
        rpm: 6290,
      },
    ],
    distance: [
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:30:00Z",
        lat: 20.1234567,
        lon: -100.9876543,
        distance: 642,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:31:00Z",
        lat: 20.12348,
        lon: -100.98762,
        distance: 634,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:32:00Z",
        lat: 20.12351,
        lon: -100.98758,
        distance: 856,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:33:00Z",
        lat: 20.12354,
        lon: -100.98754,
        distance: 425,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:34:00Z",
        lat: 20.12357,
        lon: -100.9875,
        distance: 483,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:35:00Z",
        lat: 20.1236,
        lon: -100.98746,
        distance: 542,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:36:00Z",
        lat: 20.12363,
        lon: -100.98742,
        distance: 602,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:37:00Z",
        lat: 20.12366,
        lon: -100.98738,
        distance: 662,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:38:00Z",
        lat: 20.12369,
        lon: -100.98734,
        distance: 724,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:39:00Z",
        lat: 20.12372,
        lon: -100.9873,
        distance: 786,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:40:00Z",
        lat: 20.12375,
        lon: -100.98726,
        distance: 124,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:41:00Z",
        lat: 20.12378,
        lon: -100.98722,
        distance: 85,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:42:00Z",
        lat: 20.12381,
        lon: -100.98718,
        distance: 632,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:43:00Z",
        lat: 20.12384,
        lon: -100.98714,
        distance: 347,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:44:00Z",
        lat: 20.12387,
        lon: -100.9871,
        distance: 965,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:45:00Z",
        lat: 20.1239,
        lon: -100.98706,
        distance: 2247,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:46:00Z",
        lat: 20.12393,
        lon: -100.98702,
        distance: 743,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:47:00Z",
        lat: 20.12396,
        lon: -100.98698,
        distance: 996,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:48:00Z",
        lat: 20.12399,
        lon: -100.98694,
        distance: 870,
      },
      {
        eventId: 2017,
        dateGps: "2023-05-15T14:49:00Z",
        lat: 20.12402,
        lon: -100.9869,
        distance: 497,
      },
    ],
    timeTraveled: [
      {
        eventId: 2005,
        dateGps: "2023-01-15T14:30:00Z",
        lat: 20.1234567,
        lon: -100.9876543,
        hours: 42,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-15T15:30:00Z",
        lat: 20.12348,
        lon: -100.98763,
        hours: 47,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-15T16:30:00Z",
        lat: 20.12351,
        lon: -100.9876,
        hours: 49,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-15T17:30:00Z",
        lat: 20.12354,
        lon: -100.98757,
        hours: 43,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-15T18:30:00Z",
        lat: 20.12357,
        lon: -100.98754,
        hours: 47,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-15T19:30:00Z",
        lat: 20.1236,
        lon: -100.98751,
        hours: 63,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-15T20:30:00Z",
        lat: 20.12363,
        lon: -100.98748,
        hours: 35,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-15T21:30:00Z",
        lat: 20.12366,
        lon: -100.98745,
        hours: 84,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-15T22:30:00Z",
        lat: 20.12369,
        lon: -100.98742,
        hours: 85,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-15T23:30:00Z",
        lat: 20.12372,
        lon: -100.98739,
        hours: 89,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-16T00:30:00Z",
        lat: 20.12375,
        lon: -100.98736,
        hours: 73,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-16T01:30:00Z",
        lat: 20.12378,
        lon: -100.98733,
        hours: 51.9,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-16T02:30:00Z",
        lat: 20.12381,
        lon: -100.9873,
        hours: 52.8,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-16T03:30:00Z",
        lat: 20.12384,
        lon: -100.98727,
        hours: 55,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-16T04:30:00Z",
        lat: 20.12387,
        lon: -100.98724,
        hours: 52,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-16T05:30:00Z",
        lat: 20.1239,
        lon: -100.98721,
        hours: 68,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-16T06:30:00Z",
        lat: 20.12393,
        lon: -100.98718,
        hours: 86,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-16T07:30:00Z",
        lat: 20.12396,
        lon: -100.98715,
        hours: 82,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-16T08:30:00Z",
        lat: 20.12399,
        lon: -100.98712,
        hours: 92,
      },
      {
        eventId: 2005,
        dateGps: "2023-01-16T09:30:00Z",
        lat: 20.12402,
        lon: -100.98709,
        hours: 85,
      },
    ],
  },
};
