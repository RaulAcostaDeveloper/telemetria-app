interface AverageRPM {
  eventId: number;
  dateGps: string;
  lat: number;
  lon: number;
  rpm: number;
}

interface Value {
  imei: number;
  averageRPM: AverageRPM[];
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
        eventId: 7065,
        dateGps: "2023-05-15T14:30:00Z",
        lat: 20.1234567,
        lon: -100.9876543,
        rpm: 254,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:31:00Z",
        lat: 20.1235,
        lon: -100.9876,
        rpm: 820,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:32:00Z",
        lat: 20.12353,
        lon: -100.98755,
        rpm: 1500,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:33:00Z",
        lat: 20.12357,
        lon: -100.9875,
        rpm: 2100,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:34:00Z",
        lat: 20.1236,
        lon: -100.98745,
        rpm: 2700,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:35:00Z",
        lat: 20.12364,
        lon: -100.9874,
        rpm: 3200,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:36:00Z",
        lat: 20.12368,
        lon: -100.98735,
        rpm: 3700,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:37:00Z",
        lat: 20.12371,
        lon: -100.9873,
        rpm: 4000,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:38:00Z",
        lat: 20.12375,
        lon: -100.98725,
        rpm: 4200,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:39:00Z",
        lat: 20.12378,
        lon: -100.9872,
        rpm: 4400,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:40:00Z",
        lat: 20.12381,
        lon: -100.98715,
        rpm: 4600,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:41:00Z",
        lat: 20.12384,
        lon: -100.9871,
        rpm: 4800,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:42:00Z",
        lat: 20.12387,
        lon: -100.98705,
        rpm: 5000,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:43:00Z",
        lat: 20.1239,
        lon: -100.987,
        rpm: 5200,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:44:00Z",
        lat: 20.12393,
        lon: -100.98695,
        rpm: 5400,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:45:00Z",
        lat: 20.12396,
        lon: -100.9869,
        rpm: 5600,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:46:00Z",
        lat: 20.12399,
        lon: -100.98685,
        rpm: 5800,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:47:00Z",
        lat: 20.12402,
        lon: -100.9868,
        rpm: 6000,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:48:00Z",
        lat: 20.12405,
        lon: -100.98675,
        rpm: 6200,
      },
      {
        eventId: 7065,
        dateGps: "2023-05-15T14:49:00Z",
        lat: 20.12408,
        lon: -100.9867,
        rpm: 6400,
      },
    ],
  },
};
