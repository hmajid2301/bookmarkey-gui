// TODO: use correct typing i.e. PageLoad
export const load = async ({ locals }: { locals: App.Locals }) => {
	if (!locals.user) {
		return {
			user: undefined
		};
	}

	return {
		user: locals.user
	};
};
