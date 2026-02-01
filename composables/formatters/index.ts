import type { FormatType } from '@/types/reference'
import type { Formatter } from './types'
import { harvardFormatter } from './harvard'
import { apaFormatter } from './apa'
import { mlaFormatter } from './mla'

/**
 * Format registry - maps format names to their implementations
 */
const formatters: Record<FormatType, Formatter> = {
  harvard: harvardFormatter,
  apa: apaFormatter,
  mla: mlaFormatter
}

/**
 * Get a formatter by format type
 */
export const getFormatter = (format: FormatType): Formatter => {
  const formatter = formatters[format]
  if (!formatter) {
    console.warn(`Unknown format: ${format}, falling back to Harvard`)
    return formatters.harvard
  }
  return formatter
}

/**
 * Get list of available formats
 */
export const getAvailableFormats = (): FormatType[] => {
  return Object.keys(formatters) as FormatType[]
}
