import type { INodeProperties } from 'n8n-workflow';
import { templateCreateDescription } from './create';
import { templateGetDescription } from './get';
import { templateGetAllDescription } from './getAll';
import { templateDeleteDescription } from './delete';

const showOnlyForTemplate = {
	resource: ['template'],
};

export const templateDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTemplate,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a template',
				description: 'Create a new template from a Canva design URL',
				routing: {
					request: {
						method: 'POST',
						url: '/template',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a template',
				description: 'Delete a template',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/template/{{$parameter.templateId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a template',
				description: 'Retrieve a template by ID with all its layers',
				routing: {
					request: {
						method: 'GET',
						url: '=/template/{{$parameter.templateId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many templates',
				description: 'Retrieve a list of templates for the current user',
				routing: {
					request: {
						method: 'GET',
						url: '/templates',
					},
				},
			},
		],
		default: 'create',
	},
	...templateCreateDescription,
	...templateGetDescription,
	...templateGetAllDescription,
	...templateDeleteDescription,
];

