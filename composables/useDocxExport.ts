import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx'
import type { Reference } from '~/types/reference'

export const useDocxExport = () => {
  const { formatReference } = useFormatter()

  const exportToDocx = async (references: Reference[], format: string = 'harvard') => {
    // Create document sections
    const children: Paragraph[] = []

    // Add title
    children.push(
      new Paragraph({
        text: 'Bibliography',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      })
    )

    // Add each reference with hanging indent
    references.forEach(ref => {
      const formattedText = formatReference(ref, format as any)

      // Parse HTML-like tags for italic text
      const textRuns: TextRun[] = []
      const parts = formattedText.split(/<em>|<\/em>/)

      parts.forEach((part, index) => {
        if (part) {
          textRuns.push(
            new TextRun({
              text: part,
              italics: index % 2 === 1 // Odd indices are inside <em> tags
            })
          )
        }
      })

      children.push(
        new Paragraph({
          children: textRuns,
          spacing: { after: 200 },
          indent: {
            left: 720, // 0.5 inch
            hanging: 360 // 0.25 inch hanging indent
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
