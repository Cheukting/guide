import { Static, Type } from "@sinclair/typebox";
import { Resource, ResourceFrontmatter } from "../../../src/ResourceModels";
import { EleventyPage, LayoutProps } from "../../../src/models";
import { CHANNEL_RESOURCE_TYPE } from "../../../src/resourceType";
import { IconField } from "../commonModels";
import h from "vhtml";
import path from "upath";

export const ChannelFrontmatter = Type.Intersect([
	ResourceFrontmatter,
	Type.Optional(IconField),
	Type.Object({
		hero: Type.Optional(
			Type.String({
				description: "File name of the hero image",
			})
		),
	}),
	Type.Object({
		subnav: Type.Optional(
			Type.Array(
				Type.Object({
					title: Type.String({
						description: "File name of the animated GIF, can be webm or gif",
					}),
					url: Type.String({
						description: "URL to link to",
					}),
				})
			)
		),
	}),
]);
export type ChannelFrontmatter = Static<typeof ChannelFrontmatter>;

export class Channel
	extends Resource<CHANNEL_RESOURCE_TYPE>
	implements ChannelFrontmatter
{
	hero?: string;
	subnav?: ChannelFrontmatter["subnav"];
	accent?: string;
	icon?: string;
	logo?: string;
	static frontmatterSchema = ChannelFrontmatter;

	constructor({
		data,
		page,
	}: {
		data: ChannelFrontmatter;
		page: EleventyPage;
	}) {
		super({
			data,
			page,
		});
		this.hero = data.hero;
		this.subnav = data.subnav;
		if (data.logo) {
			this.logo = path.join(page.url, data.logo);
		}
		if (data.accent) {
			this.accent = data.accent;
			this.icon = data.icon;
		}
	}

	getThumbnail(): string {
		if (this.logo) {
			return (
				<img
					data-template-src="thumbnail"
					data-template-alt="title"
					src={this.logo}
					alt={this.title}
				/>
			);
		} else {
			return <i class={`${this.icon} has-text-${this.accent} fa-5x`} />;
		}
	}

	getBoxThumbnail(): string {
		if (this.logo) {
			return (
				<img
					data-template-src="thumbnail"
					data-template-alt="title"
					src={this.logo}
					alt={this.title}
				/>
			);
		} else {
			return <i class={`${this.icon} has-text-${this.accent} fa-2x`} />;
		}
	}
}

// The following type is helpful for re-use in
// channel homepage views.

export type ChannelHomepageData = {} & LayoutProps & ChannelFrontmatter;
