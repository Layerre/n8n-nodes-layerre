import type { INodeProperties } from 'n8n-workflow';
import { layerOverrideFields } from './overrideFields';

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
		displayName: 'Export Type',
		name: 'exportType',
		type: 'options',
		default: 'png',
		displayOptions: {
			show: showOnlyForVariantCreate,
		},
		options: [
			{
				name: 'PNG',
				value: 'png',
				description: 'Export as PNG image',
			},
			{
				name: 'JPEG',
				value: 'jpeg',
				description: 'Export as JPEG image',
			},
			{
				name: 'WEBP',
				value: 'webp',
				description: 'Export as WEBP image',
			},
			{
				name: 'PDF',
				value: 'pdf',
				description: 'Export as PDF document',
			},
		],
		description: 'Export format for the variant',
		routing: {
			send: {
				type: 'body',
				property: 'export_type',
			},
		},
	},
	{
		displayName: 'Page Number',
		name: 'pageNumber',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: showOnlyForVariantCreate,
		},
		description:
			'0-based page index for multi-page templates. Defaults to 0 (first page).',
		routing: {
			send: {
				type: 'body',
				property: 'page_number',
			},
		},
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
				values: layerOverrideFields,
			},
		],
	},
];

