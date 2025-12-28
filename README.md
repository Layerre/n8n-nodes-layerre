# n8n-nodes-layerre

This is an n8n community node for [Layerre](https://layerre.com) - a platform for creating templates and variants from Canva designs.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Usage](#usage)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

```bash
npm install n8n-nodes-layerre
```

## Operations

### Template

- **Create** - Create a new template from a Canva design URL
- **Get** - Get a template by ID with all its layers
- **Get Many** - List all templates for the current user
- **Update** - Update template properties (name, dimensions, background color)
- **Delete** - Delete a template

### Variant

- **Create** - Create a new variant with layer overrides (text, images, colors, positions, etc.)
- **Get** - Get a variant by ID
- **Get Many** - List all variants for a template
- **Delete** - Delete a variant

## Credentials

To use this node, you need a Layerre API key:

1. Log in to your [Layerre account](https://app.layerre.com)
2. Go to Settings → API Keys
3. Create a new API key
4. Copy the key (format: `lyr_<key_id>_<secret>`)

In n8n:
1. Go to Credentials → Add Credential
2. Search for "Layerre API"
3. Paste your API key
4. (Optional) Change the Base URL if using a custom endpoint

## Usage

### Creating a Template from Canva

1. Add the **Layerre** node to your workflow
2. Select **Template** as the resource
3. Select **Create** as the operation
4. Paste your Canva share URL (e.g., `https://www.canva.com/design/...`)
5. Execute the node

The node will return the template with all extracted layers.

### Creating a Variant with Overrides

1. Add the **Layerre** node to your workflow
2. Select **Variant** as the resource
3. Select **Create** as the operation
4. Choose a template from the dropdown (dynamically loaded from your account)
5. Add layer overrides:
   - Select a layer from the dropdown
   - Set text, image URL, color, position, size, etc.
6. Execute the node

The node will render the variant and return the image URL.

### Example: Bulk Image Generation

```
[Spreadsheet] → [Loop Over Items] → [Layerre: Create Variant] → [Download Image]
```

Use data from a spreadsheet to create personalized images at scale by mapping columns to layer overrides.

## Resources

- [Layerre Documentation](https://docs.layerre.com)
- [Layerre API Reference](https://docs.layerre.com/api)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)
