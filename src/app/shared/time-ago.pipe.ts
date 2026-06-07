import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 60 * 60 * 24 * 365],
  ['month', 60 * 60 * 24 * 30],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
  ['second', 1],
];

/** Renders a Firestore Timestamp as a relative string, e.g. "2 minutes ago". */
@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  private readonly rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });

  transform(value: Timestamp | null | undefined): string {
    if (!value) return '';
    const seconds = (value.toDate().getTime() - Date.now()) / 1000;
    for (const [unit, secondsPerUnit] of UNITS) {
      if (Math.abs(seconds) >= secondsPerUnit || unit === 'second') {
        return this.rtf.format(Math.round(seconds / secondsPerUnit), unit);
      }
    }
    return '';
  }
}
