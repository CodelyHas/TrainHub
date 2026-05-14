export interface OccupancyByTrain {
  id: number;
  trainName: string;
  route: string;
  capacity: number;
  availableSeats: number;
  occupiedSeats: number;
  occupancyRate: number;
}

export interface DashboardSummary {
  totalSchedules: number;
  totalPassengers: number;
  totalBookings: number;
  totalRevenue: number;
  occupancyByTrain: OccupancyByTrain[];
}