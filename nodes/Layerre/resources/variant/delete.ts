import type { INodeProperties } from 'n8n-workflow';

const showOnlyForVariantDelete = {
	operation: ['delete'],
	resource: ['variant'],
};

export const variantDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForVariantDelete,
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
			show: showOnlyForVariantDelete,
		},
		description: 'The ID of the variant to delete',
	},
];

