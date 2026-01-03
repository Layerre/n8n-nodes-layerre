# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-02

### Added

- Initial release of n8n-nodes-layerre
- **Template operations:**
  - Create template from Canva URL
  - Get template by ID (with all layers)
  - List all templates
  - Delete template
- **Variant operations:**
  - Create variant with layer overrides
  - Get variant by ID
  - List all variants for a template
  - Delete variant
- **Dynamic loading:**
  - Template dropdown populated from user's account
  - Layer dropdown populated based on selected template
- **Layer override properties:**
  - Text content, color, font size, font name, text alignment
  - Image URL, opacity, flip horizontal/vertical
  - Position (x, y), dimensions (width, height), rotation
- Bearer token authentication with Layerre API keys
