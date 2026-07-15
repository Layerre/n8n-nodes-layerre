import type { INodeProperties } from 'n8n-workflow';
import { layerOverrideFields } from './overrideFields';

const showOnlyForVariantCreateBulk = {
	operation: ['createBulk'],
	resource: ['variant'],
};

export const variantCreateBulkDescription: INodeProperties[] = [
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
			show: showOnlyForVariantCreateBulk,
		},
		description:
			'The template to create variants from. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Export Type',
		name: 'exportType',
		type: 'options',
		default: 'pdf',
		displayOptions: {
			show: showOnlyForVariantCreateBulk,
		},
		options: [
			{
				name: 'PNG',
				value: 'png',
			},
			{
				name: 'JPEG',
				value: 'jpeg',
			},
			{
				name: 'WEBP',
				value: 'webp',
			},
			{
				name: 'PDF',
				value: 'pdf',
			},
		],
		description: 'Export format applied to every item in the batch',
		routing: {
			send: {
				type: 'body',
				property: 'export_type',
			},
		},
	},
	{
		displayName: 'Combine Into One PDF',
		name: 'combinePdf',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForVariantCreateBulk,
				exportType: ['pdf'],
			},
		},
		description:
			'Whether to merge all PDF items into one multi-page PDF (Plus+ only). The response includes combined_pdf.variant.',
		routing: {
			send: {
				type: 'body',
				property: 'combine_pdf',
			},
		},
	},
	{
		displayName: 'Items',
		name: 'bulkItems',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Item',
		default: {},
		required: true,
		displayOptions: {
			show: showOnlyForVariantCreateBulk,
		},
		description: 'Variant items to render in one bulk request',
		options: [
			{
				displayName: 'Item',
				name: 'item',
				values: [
					{
						displayName: 'Page Number',
						name: 'pageNumber',
						type: 'number',
						default: 0,
						typeOptions: {
							minValue: 0,
						},
						description:
							'0-based page index for multi-page templates. Use different page numbers to export an entire design in one combined PDF.',
					},
					{
						displayName: 'Variant Dimensions',
						name: 'itemDimensions',
						type: 'collection',
						placeholder: 'Add Dimension Override',
						default: {},
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
						options: [
							{
								displayName: 'Override',
								name: 'override',
								values: layerOverrideFields,
							},
						],
					},
				],
			},
		],
	},
];
