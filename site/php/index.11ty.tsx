import { LayoutContext } from "../../src/models";
import ListingSection from "../../_includes/pageelements/ListingSection.11ty";
import HeroSection from "../../_includes/pageelements/HeroSection.11ty";
import {
	Channel,
	ChannelFrontmatter,
	ChannelHomepageData,
} from "../../_includes/resources/channel/ChannelModels";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import { TUTORIAL_RESOURCE, LINK_RESOURCE } from "../../src/resourceType";

const frontmatter: ChannelFrontmatter = {
	title: "PHP",
	subtitle: "Scripting language especially \n suited to web development.",
	resourceType: "channel",
	date: new Date(Date.UTC(2024, 11, 22)),
	author: "hs",
	logo: "thumbnail.png",
	hero: "/assets/splashes/php.svg",
	subnav: [{ title: "PHP", url: "https://www.jetbrains.com/phpstorm/" }],
};

class PHPHomepage {
	data() {
		return {
			layout: "",
			...frontmatter,
		};
	}

	render(this: LayoutContext, data: ChannelHomepageData): JSX.Element {
		const channel: Channel = this.getResource(data.page.url) as Channel;

		const tutorials = this.getResources({
			resourceTypes: [TUTORIAL_RESOURCE],
			channel: channel.url,
			limit: 4,
		});

		const links = this.getResources({
			resourceTypes: [LINK_RESOURCE],
			customFilter: (r) =>
				r.channel == channel.url || r.topics?.includes("php") == true,
			limit: 8,
		});

		return (
			<BaseLayout {...data}>
				<HeroSection
					title={channel.title}
					subtitle={channel.subtitle!}
					image={channel.hero!}
					titleExtraClass={"has-text-white"}
					subtitleExtraClass={"has-text-white"}
				/>

				{tutorials && (
					<ListingSection
						title={`Latest tutorials`}
						resources={tutorials}
						separator={false}
						includeCardFooter={false}
						// moreLink={`${channel.url}tutorials/`}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}
				{links && (
					<ListingSection
						title={`Latest links`}
						resources={links}
						separator={false}
						includeCardFooter={false}
						// moreLink={`${channel.url}links/`}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}
			</BaseLayout>
		);
	}
}

module.exports = PHPHomepage;
