import type { INodeProperties, IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { variantCreateDescription } from './create';
import { variantCreateBulkDescription } from './createBulk';
import { variantGetDescription } from './get';
import { variantGetAllDescription } from './getAll';
import { variantDeleteDescription } from './delete';
import { transformOverridesList } from './overrideTransform';

const showOnlyForVariant = {
	resource: ['variant'],
};

/**
 * Transform variant create body to API format
 */
async function transformVariantCreateBody(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const overridesCollection = this.getNodeParameter('overrides', {}) as {
		override?: Array<Record<string, unknown>>;
	};
	const variantDimensions = this.getNodeParameter('variantDimensions', {}) as Record<string, unknown>;

	const body: Record<string, unknown> = {};

	if (variantDimensions.width) {
		body.width = variantDimensions.width;
	}
	if (variantDimensions.height) {
		body.height = variantDimensions.height;
	}

	const overridesList = overridesCollection.override || [];
	if (overridesList.length > 0) {
		body.overrides = transformOverridesList(overridesList);
	}

	requestOptions.body = body;
	return requestOptions;
}

/**
 * Transform bulk variant create body to API format
 */
async function transformVariantCreateBulkBody(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const bulkItemsCollection = this.getNodeParameter('bulkItems', {}) as {
		item?: Array<Record<string, unknown>>;
	};

	const items = bulkItemsCollection.item || [];
	if (items.length === 0) {
		throw new Error('At least one bulk item is required.');
	}

	const body = (requestOptions.body as Record<string, unknown>) || {};

	body.items = items.map((item, index) => {
		const mapped: Record<string, unknown> = {};

		const pageNumber = item.pageNumber;
		if (pageNumber !== undefined && pageNumber !== null && pageNumber !== '') {
			mapped.page_number = Number(pageNumber);
		}

		const itemDimensions = (item.itemDimensions as Record<string, unknown>) || {};
		if (itemDimensions.width) {
			mapped.width = itemDimensions.width;
		}
		if (itemDimensions.height) {
			mapped.height = itemDimensions.height;
		}

		const overridesCollection = (item.overrides as { override?: Array<Record<string, unknown>> }) || {};
		const overridesList = overridesCollection.override || [];
		mapped.overrides = transformOverridesList(overridesList);

		if (!Array.isArray(mapped.overrides)) {
			throw new Error(`Bulk item ${index + 1} overrides must be an array.`);
		}

		return mapped;
	});

	requestOptions.body = body;
	return requestOptions;
}

export const variantDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForVariant,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a variant',
				description: 'Create a new variant from a template with layer overrides',
				routing: {
					request: {
						method: 'POST',
						url: '=/template/{{$parameter.templateId}}/variant',
					},
					send: {
						preSend: [transformVariantCreateBody],
					},
				},
			},
			{
				name: 'Create Bulk',
				value: 'createBulk',
				action: 'Create variants in bulk',
				description:
					'Create multiple variants in one request, with optional combined PDF output (Plus+ only)',
				routing: {
					request: {
						method: 'POST',
						url: '=/template/{{$parameter.templateId}}/variant/bulk',
					},
					send: {
						preSend: [transformVariantCreateBulkBody],
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a variant',
				description: 'Delete a variant',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/template/{{$parameter.templateId}}/variant/{{$parameter.variantId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a variant',
				description: 'Retrieve a variant by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/template/{{$parameter.templateId}}/variant/{{$parameter.variantId}}',
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many variants',
				description: 'Retrieve a list of variants for a template',
				routing: {
					request: {
						method: 'GET',
						url: '=/template/{{$parameter.templateId}}/variants',
					},
				},
			},
		],
		default: 'create',
	},
	...variantCreateDescription,
	...variantCreateBulkDescription,
	...variantGetDescription,
	...variantGetAllDescription,
	...variantDeleteDescription,
];
