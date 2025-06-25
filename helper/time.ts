import { Timestamp } from 'firebase/firestore';

export function toJsDate(input: any): Date {
  if (!input) return new Date();
  if (input instanceof Date) return input;
  if (input instanceof Timestamp) return input.toDate();
  // For { seconds, nanoseconds }–shaped objects (offline mode)
  if (typeof input.seconds === 'number') {
    return new Date(input.seconds * 1000);
  }
  return new Date();
}
