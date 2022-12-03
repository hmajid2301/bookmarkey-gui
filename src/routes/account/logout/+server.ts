import { redirect } from '@sveltejs/kit';

export const POST = ({ locals }: { locals: App.Locals }) => {
	locals.pb?.authStore.clear();
	locals.user = undefined;
	throw redirect(303, '/account/login');
};
