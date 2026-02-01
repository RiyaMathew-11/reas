import { Document, Packer, Paragraph, TextRun, AlignmentType, ExternalHyperlink } from 'docx'
import type { Reference } from '@/types/reference'

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

      // Split by <br> tags to handle line breaks
      const lines = formattedText.split('<br>')

      lines.forEach((line, lineIndex) => {
        const lineChildren: (TextRun | ExternalHyperlink)[] = []

        // Add number prefix only on first line
        if (lineIndex === 0) {
          lineChildren.push(
            new TextRun({
              text: `${index + 1}. `,
              size: 24,
              bold: true
            })
          )
        }

        // Process the line for <em> tags and URLs
        const processLine = (text: string): (TextRun | ExternalHyperlink)[] => {
          const result: (TextRun | ExternalHyperlink)[] = []

          // Split by <em> tags
          const parts = text.split(/<em>|<\/em>/)

          parts.forEach((part, partIndex) => {
            if (!part) return

            const isItalic = partIndex % 2 === 1

            // Check for URLs in this part
            const urlRegex = /(https?:\/\/[^\s]+)/g
            const urlParts = part.split(urlRegex)

            urlParts.forEach((segment, segIndex) => {
              if (!segment) return

              if (urlRegex.test(segment)) {
                // This is a URL - create a hyperlink
                result.push(
                  new ExternalHyperlink({
                    children: [
                      new TextRun({
                        text: segment,
                        size: 24,
                        italics: isItalic,
                        style: 'Hyperlink',
                        color: '0563C1',
                        underline: {}
                      })
                    ],
                    link: segment
                  })
                )
              } else {
                // Regular text
                result.push(
                  new TextRun({
                    text: segment,
                    size: 24,
                    italics: isItalic
                  })
                )
              }
            })
          })

          return result
        }

        lineChildren.push(...processLine(line))

        children.push(
          new Paragraph({
            children: lineChildren,
            alignment: AlignmentType.LEFT,
            spacing: { after: lineIndex === lines.length - 1 ? 200 : 0 },
            indent: {
              left: 360,
              hanging: lineIndex === 0 ? 360 : 0
            }
          })
        )
      })
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
