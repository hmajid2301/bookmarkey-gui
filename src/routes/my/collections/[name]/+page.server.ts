import type { PageServerLoad } from "./$types";

interface OutputType {
	name: string;
}

export const load: PageServerLoad<OutputType> = async ({ params, locals }) => {
	console.log("params", params, locals);
	return { name: params.name };
};
