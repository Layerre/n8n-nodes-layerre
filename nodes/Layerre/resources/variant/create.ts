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
						displayName: 'Color',
						name: 'color',
						type: 'color',
						default: '',
						description: 'Override the color (hex format, e.g.,	#FF0000)',
					},
					{
						displayName: 'Flip Horizontal',
						name: 'flipHorizontal',
						type: 'boolean',
						default: false,
						description: 'Whether to flip the layer horizontally',
					},
					{
						displayName: 'Flip Vertical',
						name: 'flipVertical',
						type: 'boolean',
						default: false,
						description: 'Whether to flip the layer vertically',
					},
					{
						displayName: 'Font Name',
						name: 'fontName',
						type: 'string',
						default: '',
						description: 'Override the font family name (for text layers)',
					},
					{
						displayName: 'Font Size',
						name: 'fontSize',
						type: 'number',
						default: 0,
						description: 'Override the font size in pixels (for text layers)',
					},
					{
						displayName: 'Height',
						name: 'height',
						type: 'number',
						default: 0,
						description: 'Override the layer height in pixels',
					},
					{
						displayName: 'Image URL',
						name: 'imgUrl',
						type: 'string',
						default: '',
						description: 'Override the image URL (for image layers)',
					},
					{
						displayName: 'Layer',
						name: 'layerId',
						type: 'options',
						default: '',
							required:	true,
						description: 'The layer to override. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'Opacity',
						name: 'opacity',
						type: 'number',
						default: 1,
						description: 'Override the opacity (0.0	=	transparent, 1.0	=	opaque)',
					},
					{
						displayName: 'Rotation',
						name: 'rotation',
						type: 'number',
						default: 0,
						description: 'Override the rotation angle in degrees',
					},
					{
						displayName: 'Text',
						name: 'text',
						type: 'string',
						default: '',
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
						displayName: 'Width',
						name: 'width',
						type: 'number',
						default: 0,
						description: 'Override the layer width in pixels',
					},
					{
						displayName: 'X Position',
						name: 'x',
						type: 'number',
						default: 0,
						description: 'Override the X position in pixels',
					},
					{
						displayName: 'Y Position',
						name: 'y',
						type: 'number',
						default: 0,
						description: 'Override the Y position in pixels',
					},
			],
			},
		],
	},
];

