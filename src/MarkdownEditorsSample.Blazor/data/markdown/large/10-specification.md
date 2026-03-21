---
title: Mock Specification
id: spec-010
reviewers:
  - qa
  - dev
  - ux
---

# Specification

## 1. Overview

This document intentionally contains more text to stress editor rendering and typing responsiveness.

## 2. Requirements

- R1: Switching files should preserve unsaved changes warning behavior.
- R2: Preview mode should render frontmatter-free markdown body.
- R3: Editor should support code fences and tables.
- R4: Basic keyboard operations should remain responsive under long content.

## 3. Data Samples

| Type | Count | Notes |
| --- | ---: | --- |
| Markdown | 10+ | Mixed size |
| YAML | 1-2 | Frontmatter-like |
| JSON | 1-2 | Nested values |
| XML | 1-2 | Config-style |
| Text | 1-2 | Plain prose |

## 4. Test Ideas

- Paste formatted content from external sources.
- Rapidly switch among three files while editing.
- Save and reopen to verify round-trip integrity.
