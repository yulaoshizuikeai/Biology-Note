# Yulaoshizuikeai's Biology Note - Workspace Guidelines

This repository contains **高考生物知识库 (Yulaoshizuikeai's Biology Note)**.
All agents working in this workspace must adhere to the rules defined in `.agents/rules/`:

1. **[Branding & SEO Guidelines](./.agents/rules/branding-and-seo.md)**
   - Author: `Yulaoshizuikeai` (capitalized).
   - Brand: `Yulaoshizuikeai's Biology Note`.
   - Site & SEO Title: **高考生物知识库**.
   - Body Text & Content: **高中生物知识库**.
   - PowerShell Git Commit: Always wrap commit messages in single quotes `'...'` when containing Chinese punctuation.
   - Build Verification: Always verify with `npm run docs:build` before committing.

2. **[Biology SVG Diagram Design & Multimodal Visual Verification Protocol](./.agents/rules/svg-diagrams-and-vision-check.md)**
   - ViewBox standard: `0 0 780 370`.
   - Card structure: Must use `<g transform="...">` local coordinates to prevent text collisions.
   - Multimodal Vision Check: Mandatory Playwright PNG rendering + visual inspection before finalizing diagrams.

3. **[Official Textbooks Alignment & Content Expansion Protocol](./.agents/rules/textbook-alignment-and-expansion.md)**
   - Official Textbooks Location: `E:\日记\Diary and memories\高中课本_深圳\06_生物_人教版\`.
   - Structure & TOC: Strictly mapped to the 16 core themes (`01 走进细胞` ~ `16 经典实验`).
   - Strict Alignment: Grounded in textbook definitions, physiological pathways, and experiments.
   - High-level Expansion: Rigorous mathematical/quantitative models, Gaokao trap warnings, and structured long-answer templates.
