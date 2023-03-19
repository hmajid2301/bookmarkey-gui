import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
	if (locals.pb?.authStore.isValid) {
		throw redirect(303, "/my/collections/0");
	}
};
