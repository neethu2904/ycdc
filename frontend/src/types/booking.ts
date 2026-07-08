export type BookingPrefills = {
  branch?: string;
  category?: string;
  service?: string;
};

export type BookingField =
  | 'step'
  | 'branch'
  | 'category'
  | 'service'
  | 'doctor'
  | 'date'
  | 'patientName'
  | 'patientPhone'
  | 'patientEmail'
  | 'patientNotes'
  | 'bookingId';

export type BookingState = {
  step: number;
  branch: string;
  category: string;
  service: string;
  doctor: string;
  date: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientNotes: string;
  bookingId: string;
  isSuccess: boolean;
  submitting: boolean;
};

export interface BookingWidgetProps {
  onClose?: () => void;
  initialBranch?: string;
  initialCategory?: string;
  initialService?: string;
}
