import { Tutorial, TutorialFrontmatter } from "./TutorialModels";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";
import ArticleTitleSubtitle from "../common/ArticleTitleSubtitle.11ty";
import ArticleAuthor from "../common/ArticleAuthor.11ty";
import ArticleTopics from "../common/ArticleTopics.11ty";
import HorizontalResourceCard from "../../resourcecard/HorizontalResourceCard.11ty";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";

export type TutorialLayoutData = LayoutProps & TutorialFrontmatter;

export function TutorialLayout(
	this: LayoutContext,
	data: TutorialLayoutData
): JSX.Element {
	const { collections, page, content } = data;
	const tutorial = collections.resourceMap.get(page.url) as Tutorial;
	const references = tutorial.references;

	// Sidebars
	let sidebarSteps = tutorial.tutorialSteps && (
		<div class="column is-3 is-full-touch">
			<aside class="menu">
				<p class="menu-label">Tutorial</p>
				<ul class="menu-list">
					{tutorial.tutorialSteps.map((step) => (
						<li>
							<a aria-label="Tutorial Step" href={step.url}>
								{step.title}
							</a>
						</li>
					))}
				</ul>
			</aside>
		</div>
	);

	// Main content
	const listing = (
		<Fragment>
			{tutorial.tutorialSteps.map((resource) => (
				<HorizontalResourceCard resource={resource} />
			))}
		</Fragment>
	);

	const firstTutorialStep =
		tutorial.tutorialSteps.length > 0 ? tutorial.tutorialSteps[0] : undefined;

	// Breadcrumbs
	let breadcrumbs = (
		<nav class="breadcrumb" aria-label="breadcrumbs">
			<ul>
				<li class="is-active">
					<a href={tutorial.url}>{tutorial.title}</a>
				</li>
			</ul>
		</nav>
	);

	const main = (
		<Fragment>
			<ArticleTitleSubtitle
				title={tutorial.title}
				subtitle={tutorial.subtitle}
			/>
			<ArticleAuthor
				author={references!.author}
				displayDate={tutorial.displayDate}
			/>
			<ArticleTopics topics={references!.topics} />

			{content ? <div class="mb-4">{content}</div> : null}
			{firstTutorialStep ? (
				<div class="mb-5">
					<a class="button is-rounded is-primary" href={firstTutorialStep.url}>
						Start learning &raquo;
					</a>
				</div>
			) : null}
			{listing && <div class="columns is-multiline">{listing}</div>}
		</Fragment>
	);
	return (
		<BaseLayout {...data}>
			<div class="section">
				<div class="container">
					<div class="columns is-multiline">
						{sidebarSteps}
						<div class="column">
							{breadcrumbs}
							<main class="content">{main}</main>
						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
}

export const render = TutorialLayout;
