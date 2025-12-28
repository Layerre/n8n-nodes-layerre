import type { INodeProperties } from 'n8n-workflow';

const showOnlyForVariantCreate = {
	operation: ['create'],
	resource: ['variant'],
};

export const variantCreateDescription: INodeProperties[] = [
	{
		displayName: 'Template Name or ID',
		name: 'templateId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getTemplates',
		},
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForVariantCreate,
		},
		description: 'The template to create a variant from. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Variant Dimensions',
		name: 'variantDimensions',
		type: 'collection',
		placeholder: 'Add Dimension Override',
		default: {},
		displayOptions: {
			show: showOnlyForVariantCreate,
		},
		options: [
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 1,
					maxValue: 10000,
				},
				description: 'Override the variant width in pixels (uses template width if not set)',
				routing: {
					send: {
						type: 'body',
						property: 'width',
					},
				},
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 1,
					maxValue: 10000,
				},
				description: 'Override the variant height in pixels (uses template height if not set)',
				routing: {
					send: {
						type: 'body',
						property: 'height',
					},
				},
			},
		],
	},
	{
		displayName: 'Layer Overrides',
		name: 'overrides',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Layer Override',
		default: {},
		displayOptions: {
			show: showOnlyForVariantCreate,
		},
		description: 'Override layer properties for this variant',
		options: [
			{
				displayName: 'Override',
				name: 'override',
				values: [
					{
						displayName: 'Layer Name or ID',
						name: 'layerId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getLayers',
							loadOptionsDependsOn: ['templateId'],
						},
						default: '',
						required: true,
						description: 'The layer to override. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'Override Options',
						name: 'overrideOptions',
						type: 'collection',
						placeholder: 'Add Override Option',
						default: {},
						description: 'Optional properties to override for this layer',
						options: [
							{
								displayName: 'Height',
								name: 'height',
								type: 'number',
								default: 0,
								typeOptions: {
									minValue: 1,
									maxValue: 10000,
								},
								description: 'Override the layer height in pixels',
							},
							{
								displayName: 'Image Flip Horizontal',
								name: 'flipHorizontal',
								type: 'boolean',
								default: false,
								description: 'Whether to flip the image horizontally (for image layers)',
							},
							{
								displayName: 'Image Flip Vertical',
								name: 'flipVertical',
								type: 'boolean',
								default: false,
								description: 'Whether to flip the image vertically (for image layers)',
							},
							{
								displayName: 'Image Opacity',
								name: 'opacity',
								type: 'number',
								default: 1,
								typeOptions: {
									minValue: 0,
									maxValue: 1,
									numberStepSize: 0.1,
								},
								description: 'Override the image opacity (0.0 = transparent, 1.0 = opaque, for image layers)',
							},
							{
								displayName: 'Image URL',
								name: 'imgUrl',
								type: 'string',
								default: '',
								typeOptions: {
									maxLength: 2048,
								},
								description: 'Override the image URL (for image layers)',
							},
							{
								displayName: 'Rotation',
								name: 'rotation',
								type: 'number',
								default: 0,
								typeOptions: {
									minValue: -360,
									maxValue: 360,
								},
								description: 'Override the rotation angle in degrees',
							},
							{
								displayName: 'Text',
								name: 'text',
								type: 'string',
								default: '',
								typeOptions: {
									maxLength: 1000,
								},
								description: 'Override the text content (for text layers)',
							},
							{
								displayName: 'Text Align',
								name: 'textAlign',
								type: 'options',
								options: [
									{
										name: 'Left',
										value: 'left',
									},
									{
										name: 'Center',
										value: 'center',
									},
									{
										name: 'Right',
										value: 'right',
									},
									{
										name: 'Justify',
										value: 'justify',
									},
								],
								default: 'left',
								description: 'Override the text alignment (for text layers)',
							},
							{
								displayName: 'Text Color',
								name: 'color',
								type: 'color',
								default: '',
								description: 'Override the text/layer color (hex format, e.g., #FF0000)',
							},
							{
								displayName: 'Text Font Name',
								name: 'fontName',
								type: 'string',
								default: '',
								typeOptions: {
									maxLength: 100,
								},
								description: 'Override the font family name (for text layers)',
							},
							{
								displayName: 'Text Font Size',
								name: 'fontSize',
								type: 'number',
								default: 0,
								typeOptions: {
									minValue: 1,
									maxValue: 2000,
								},
								description: 'Override the font size in pixels (for text layers)',
							},
							{
								displayName: 'Text Font Style: Italic',
								name: 'fontItalic',
								type: 'boolean',
								default: false,
								description: 'Whether to make the text italic (for text layers)',
							},
							{
								displayName: 'Text Font Style: Underline',
								name: 'fontUnderline',
								type: 'boolean',
								default: false,
								description: 'Whether to underline the text (for text layers)',
							},
							{
								displayName: 'Text Font Weight',
								name: 'fontWeight',
								type: 'string',
								default: '',
								placeholder: 'e.g., bold, 700',
								description: 'Override the font weight (for text layers). Use values like "bold", "normal", or numeric values like "400", "700".',
							},
							{
								displayName: 'Text Letter Spacing',
								name: 'letterSpacing',
								type: 'number',
								default: 0,
								typeOptions: {
									minValue: -200,
									maxValue: 800,
								},
								description: 'Override the letter spacing in pixels (for text layers)',
							},
							{
								displayName: 'Text Line Spacing',
								name: 'lineSpacing',
								type: 'number',
								default: 1000,
								typeOptions: {
									minValue: 500,
									maxValue: 2500,
								},
								description: 'Override the line spacing in pixels (for text layers). Default is 1000.',
							},
							{
								displayName: 'Width',
								name: 'width',
								type: 'number',
								default: 0,
								typeOptions: {
									minValue: 1,
									maxValue: 10000,
								},
								description: 'Override the layer width in pixels',
							},
							{
								displayName: 'X Position',
								name: 'x',
								type: 'number',
								default: 0,
								typeOptions: {
									minValue: -10000,
									maxValue: 10000,
								},
								description: 'Override the X position in pixels',
							},
							{
								displayName: 'Y Position',
								name: 'y',
								type: 'number',
								default: 0,
								typeOptions: {
									minValue: -10000,
									maxValue: 10000,
								},
								description: 'Override the Y position in pixels',
							},
						],
					},
				],
			},
		],
	},
];

