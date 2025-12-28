import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTemplateUpdate = {
	operation: ['update'],
	resource: ['template'],
};

export const templateUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTemplateUpdate,
		},
		description: 'The ID of the template to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForTemplateUpdate,
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the template',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
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
				description: 'Template width in pixels',
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
				description: 'Template height in pixels',
				routing: {
					send: {
						type: 'body',
						property: 'height',
					},
				},
			},
			{
				displayName: 'Background Color',
				name: 'backgroundColor',
				type: 'color',
				default: '#FFFFFF',
				description: 'Background color in hex format',
				routing: {
					send: {
						type: 'body',
						property: 'background_color',
					},
				},
			},
		],
	},
];

