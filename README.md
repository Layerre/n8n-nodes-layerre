# n8n-nodes-layerre

This is an n8n community node for [Layerre](https://layerre.com) - a platform for creating templates and variants from Canva designs.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Usage](#usage)  
[Contributing](#contributing)  
[License](#license)

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
- **Delete** - Delete a template

### Variant

- **Create** - Create a new variant with layer overrides (text, images, colors, positions, etc.)
- **Get** - Get a variant by ID
- **Get Many** - List all variants for a template
- **Delete** - Delete a variant

## Credentials

To use this node, you need a Layerre API key:

1. Log in to your [Layerre account](https://layerre.com/app)
2. Go to API Keys
3. Create a new API key
4. Copy the key (starts with `lyr_`)

In n8n:
1. Go to Credentials → Add Credential
2. Search for "Layerre API"
3. Paste your API key

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
5. (Optional) Set variant dimensions (width/height) to override the template size
6. Add layer overrides:
   - Select a layer from the dropdown (dynamically loaded from the selected template)
   - Configure override options:
     - **Text layers**: text content, color, font name, font size, font weight, italic, underline, text align, letter spacing, line spacing
     - **Image layers**: image URL, opacity, flip horizontal/vertical
     - **All layers**: position (x, y), size (width, height), rotation, color
7. Execute the node

The node will render the variant and return the image URL.

### Example: Bulk Image Generation

```
[Spreadsheet] → [Loop Over Items] → [Layerre: Create Variant] → [Download Image]
```

Use data from a spreadsheet to create personalized images at scale by mapping columns to layer overrides.

## Contributing

Contributions are welcome! Here's how to get started:

### Development Setup

1. Fork the repository on GitHub

2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/n8n-nodes-layerre.git
   cd n8n-nodes-layerre
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Install n8n globally:
   ```bash
   npm install n8n -g
   ```

5. Start development mode (runs n8n with the node loaded):
   ```bash
   npm run dev
   ```

5. Make your changes and test in the n8n UI

### Building

```bash
npm run build
```

### Linting

```bash
npm run lint
npm run lint:fix  # Auto-fix issues
```

### Submitting Changes

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Resources

- [Layerre Documentation](https://layerre.com/docs)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE)
