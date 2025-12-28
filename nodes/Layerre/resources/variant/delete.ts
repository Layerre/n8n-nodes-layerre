import type { INodeProperties } from 'n8n-workflow';

const showOnlyForVariantDelete = {
	operation: ['delete'],
	resource: ['variant'],
};

export const variantDeleteDescription: INodeProperties[] = [
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
			show: showOnlyForVariantDelete,
		},
		description: 'The template that contains the variant. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
	{
		displayName: 'Variant Name or ID',
		name: 'variantId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getVariants',
			loadOptionsDependsOn: ['templateId'],
		},
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForVariantDelete,
		},
		description: 'The variant to delete. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
];
