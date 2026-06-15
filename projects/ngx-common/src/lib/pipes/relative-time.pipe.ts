import { Pipe, PipeTransform } from '@angular/core'

/**
 * `RelativeTimePipe` converts an ISO date string or JavaScript `Date` object
 * into a human-readable relative time string.
 *
 * Example outputs:
 * - "Asked just now"
 * - "Asked 5 minutes ago"
 * - "Asked 2 hours ago"
 * - "Asked recently"
 *
 * ```
 */
@Pipe({
    name: 'relativeTime',
    standalone: true,
})
export class RelativeTimePipe implements PipeTransform {
    /**
     * Transforms a date into a relative time string.
     *
     * @param value - ISO date string (e.g., "2026-02-16T08:34:35.628Z") or Date object
     * @returns A string representing the relative time (e.g., "Asked 5 minutes ago")
     */
    transform(value: string | Date | undefined): string {
        if (!value) return 'recently'

        const date = new Date(value)
        const now = new Date()
        const diffInSeconds = Math.floor(
            (now.getTime() - date.getTime()) / 1000,
        )

        if (diffInSeconds < 0) return 'just now'

        const intervals = [
            { label: 'year', seconds: 31536000 },
            { label: 'month', seconds: 2592000 },
            { label: 'week', seconds: 604800 },
            { label: 'day', seconds: 86400 },
            { label: 'hour', seconds: 3600 },
            { label: 'minute', seconds: 60 },
            { label: 'second', seconds: 1 },
        ]

        for (const interval of intervals) {
            const count = Math.floor(diffInSeconds / interval.seconds)
            if (count >= 1) {
                const plural = count === 1 ? '' : 's'
                return ` ${count} ${interval.label}${plural} ago`
            }
        }

        return 'recently'
    }
}
