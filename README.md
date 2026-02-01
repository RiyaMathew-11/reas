# [ = ] reas

### Simplifying academic citations

A lightweight, open-source reference list manager for creating and exporting beautifully formatted citations.

<img align="center" height="500" alt="Screenshot 2026-02-01 at 19 58 37" src="https://github.com/user-attachments/assets/49e09f47-8af6-4423-84aa-3e12d64f917e" />
<br/>

---

## Motivation

This project was born from a conversation with a non-tech friend who found her current academic citation tools confusing to use - what should be straightforward became frustrating.

I looked for alternatives, particularly free and open-source options. While tools like [Zotero](https://www.zotero.org/) are powerful, it lacked a straightforward way to export formatted reference lists.

**reas** is my attempt to fill this gap — a simple, accessible tool that does one thing well: helps you create, organize, and export formatted academic reference lists.

---

## Features

- **Citation types**: Harvard (APA and MLA coming soon)
- **Reference types**: Journal articles, books, websites
- **Smart management**: Auto-sorting, duplicate detection, local storage
- **Export**: Download as formatted .docx files with clickable links
- **Privacy-first**: All data stored locally.

---

## Roadmap

Planned features as time permits:

- Multiple reference lists
- Auto-fetch metadata from ISBN/DOI
- Other citation formats (APA, MLA, etc.)
- Import/export (BibTeX, RIS)

---

## Tech Stack

- [Nuxt 4](https://nuxt.com)
- [Tailwind CSS](https://tailwindcss.com)
- IndexedDB via [idb](https://github.com/jakearchibald/idb)
- [docx](https://github.com/dolanmiu/docx) for exports

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Clone and install
git clone https://github.com/riyamathew-11/reas.git
cd reas
pnpm install

# Development
pnpm dev

# Production build
pnpm build
```

---

##  Usage

1. Click **Add Reference** and fill in the details
2. Choose citation format from dropdown
3. Click **Download** to export as Word document

All data is stored locally in your browser—no account needed, works offline.

### Exported document format

<img height="400" alt="Screenshot 2026-02-01 at 20 00 20" src="https://github.com/user-attachments/assets/be6e93ce-4674-41f2-b88a-28aefa9f8067" />


---

## License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.

This ensures that the software and all derivatives remain free and open-source, even when used as a web service.

See the [LICENSE](LICENSE) file for full details.

---

<div align="center">
  <sub>Built with ❤️ for academia</sub>
</div>
