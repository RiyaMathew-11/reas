import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx'
import type { Reference } from '~/types/reference'

export const useDocxExport = () => {
  const { formatReference } = useFormatter()

  const exportToDocx = async (references: Reference[], format: string = 'harvard') => {
    // Create document sections
    const children: Paragraph[] = []

    // Add title - Bibliography
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: 'Bibliography',
            bold: true,
            size: 32 // 16pt (size is in half-points)
          })
        ],
        alignment: AlignmentType.LEFT,
        spacing: { after: 100 }
      })
    )

    // Add date created
    const today = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Created: ${today}`,
            size: 20, // 10pt
            color: '666666'
          })
        ],
        alignment: AlignmentType.LEFT,
        spacing: { after: 600 } // Increased vertical space before references
      })
    )

    // Add each reference with numbering
    references.forEach((ref, index) => {
      const formattedText = formatReference(ref, format as any)

      // Parse HTML-like tags for italic text
      const textRuns: TextRun[] = []

      // Add number prefix
      textRuns.push(
        new TextRun({
          text: `${index + 1}. `,
          size: 24, // 12pt
          bold: true
        })
      )

      const parts = formattedText.split(/<em>|<\/em>/)

      parts.forEach((part, partIndex) => {
        if (part) {
          textRuns.push(
            new TextRun({
              text: part,
              italics: partIndex % 2 === 1, // Odd indices are inside <em> tags
              size: 24 // 12pt (size is in half-points, so 24 = 12pt)
            })
          )
        }
      })

      children.push(
        new Paragraph({
          children: textRuns,
          alignment: AlignmentType.LEFT,
          spacing: { after: 200 },
          indent: {
            left: 360, // Indent for wrapped lines
            hanging: 360 // Hanging indent to align with text after number
          }
        })
      )
    })

    // Create document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children
        }
      ]
    })

    // Generate and download
    const blob = await Packer.toBlob(doc)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `bibliography-${new Date().toISOString().split('T')[0]}.docx`
    link.click()
    URL.revokeObjectURL(url)
  }

  return {
    exportToDocx
  }
}
