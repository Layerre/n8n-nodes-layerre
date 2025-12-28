import type { INodeProperties } from 'n8n-workflow';

const showOnlyForVariantGet = {
	operation: ['get'],
	resource: ['variant'],
};

export const variantGetDescription: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForVariantGet,
		},
		description: 'The ID of the template',
	},
	{
		displayName: 'Variant ID',
		name: 'variantId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForVariantGet,
		},
		description: 'The ID of the variant to retrieve',
	},
];

