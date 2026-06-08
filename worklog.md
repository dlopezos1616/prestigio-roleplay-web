---
Task ID: 1
Agent: Main Agent
Task: Replace placeholder Código Penal with comprehensive criminal code data and professional table styling

Work Log:
- Saved comprehensive código penal data as markdown file at /home/z/my-project/normativas/codigo_penal.md
- Updated NormativaBlock interface to add 'penal-table' type and 'chapterTitle' optional field
- Replaced the placeholder Código Penal section (4 sections with generic data) with full criminal code (12 chapters, 130+ articles) organized by chapters I-XII
- Created professional penal-table rendering in NormativaBlock.tsx with:
  - Chapter header banners with red accent styling
  - Article number badges in monospace font
  - Gold-colored importe (fine) amounts
  - Red-highlighted meses (prison months) badges for articles with prison time
  - Left border accent for rows with prison sentences
  - Hover effects and responsive mobile design
- Added comprehensive CSS in globals.css for penal code styling (~200 lines)
- Built successfully and verified server running on port 3000

Stage Summary:
- Código Penal now shows 12 sections (12 chapters) with 130+ professional articles
- Each chapter has its own table with columns: Artículo, Descripción, Importe ($), Meses
- Professional criminal code aesthetic with red accent theme, article badges, and prison time indicators
- All data matches the user's provided criminal code exactly
