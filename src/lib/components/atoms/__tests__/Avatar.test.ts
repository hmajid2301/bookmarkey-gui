import { render } from "@testing-library/svelte";
import { describe, expect, test } from "vitest";

import Avatar from "../Avatar.svelte";

describe("Avatar", () => {
	test("Successfully renders fallback avatar", async () => {
		const { getByAltText } = render(Avatar, {});
		const image = getByAltText("") as HTMLImageElement;
		expect(image.src).toContain("");
	});

	test("Successfully renders gravatar avatar", async () => {
		const { getByAltText } = render(Avatar, {
			props: { email: "user@example.com" }
		});
		const image = getByAltText("user@example.com");
		expect(image.getAttribute("data-sources")).toBe(
			",https://www.gravatar.com/avatar/b58996c504c5638798eb6b511e6f49af?"
		);
	});

	test("Successfully renders text avatar", async () => {
		const { getByAltText } = render(Avatar, {
			props: { nickname: "haseeb" }
		});
		const image = getByAltText("haseeb");
		expect(image.getAttribute("data-sources")).toBe(",https://ui-avatars.com/api/?name=haseeb");
	});

	test("Successfully renders src avatar", async () => {
		const { getByAltText } = render(Avatar, {
			props: { avatar: "my_avatar.png" }
		});
		const image = getByAltText("");
		expect(image.getAttribute("data-sources")).toBe("my_avatar.png");
	});

	test("Successfully renders gravatar, when given email and nickname", async () => {
		const { getByAltText } = render(Avatar, {
			props: { nickname: "haseeb", email: "user@example.com" }
		});
		const image = getByAltText("user@example.com");
		expect(image.getAttribute("data-sources")).toBe(
			",https://www.gravatar.com/avatar/b58996c504c5638798eb6b511e6f49af?&d=404,https://ui-avatars.com/api/?name=haseeb"
		);
	});
});
