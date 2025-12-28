import type { INodeProperties, IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { variantCreateDescription } from './create';
import { variantGetDescription } from './get';
import { variantGetAllDescription } from './getAll';
import { variantDeleteDescription } from './delete';

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
	const overridesCollection = this.getNodeParameter('overrides', {}) as { override?: Array<Record<string, unknown>> };
	const variantDimensions = this.getNodeParameter('variantDimensions', {}) as Record<string, unknown>;

	const body: Record<string, unknown> = {};

	// Add dimension overrides if set
	if (variantDimensions.width) {
		body.width = variantDimensions.width;
	}
	if (variantDimensions.height) {
		body.height = variantDimensions.height;
	}

	// Transform overrides to API format
	const overridesList = overridesCollection.override || [];
	if (overridesList.length > 0) {
		body.overrides = overridesList.map((override) => {
			const apiOverride: Record<string, unknown> = {
				layer_id: override.layerId,
			};

			// Add position if set
			if (override.x !== undefined && override.x !== 0) {
				apiOverride.x = override.x;
			}
			if (override.y !== undefined && override.y !== 0) {
				apiOverride.y = override.y;
			}

			// Build properties object
			const properties: Record<string, unknown> = {};

			// Text properties
			if (override.text) {
				properties.text = override.text;
			}
			if (override.color) {
				properties.color = override.color;
			}
			if (override.fontSize && override.fontSize !== 0) {
				properties.font_size = override.fontSize;
			}
			if (override.fontName) {
				properties.font_name = override.fontName;
			}
			if (override.textAlign && override.textAlign !== 'left') {
				properties.text_align = override.textAlign;
			}

			// Image properties
			if (override.imgUrl) {
				properties.img_url = override.imgUrl;
			}
			if (override.opacity !== undefined && override.opacity !== 1) {
				properties.opacity = override.opacity;
			}
			if (override.flipHorizontal) {
				properties.flip_horizontal = override.flipHorizontal;
			}
			if (override.flipVertical) {
				properties.flip_vertical = override.flipVertical;
			}

			// Common properties
			if (override.width && override.width !== 0) {
				properties.width = override.width;
			}
			if (override.height && override.height !== 0) {
				properties.height = override.height;
			}
			if (override.rotation !== undefined && override.rotation !== 0) {
				properties.rotation = override.rotation;
			}

			// Only add properties if there are any
			if (Object.keys(properties).length > 0) {
				apiOverride.properties = properties;
			}

			return apiOverride;
		});
	}

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
				description: 'Get a variant by ID',
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
				description: 'Get many variants for a template',
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
	...variantGetDescription,
	...variantGetAllDescription,
	...variantDeleteDescription,
];
