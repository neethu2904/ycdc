import type { BookingPrefills } from './booking';

export interface AppUiState {
  activeTreatmentTab: string;
  mobileMenuOpen: boolean;
  showBookingModal: boolean;
  showDashboardModal: boolean;
  showApplyModal: boolean;
  bookingPrefills: BookingPrefills;
}
