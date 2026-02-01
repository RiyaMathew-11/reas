import type { Reference, FormatType } from '@/types/reference'
import { getFormatter } from './formatters'

/**
 * Main formatter composable - delegates to specific format implementations
 */
export const useFormatter = () => {
  const formatReference = (reference: Reference, format: FormatType = 'harvard'): string => {
    const formatter = getFormatter(format)
    return formatter.formatReference(reference)
  }

  return {
    formatReference
  }
}
