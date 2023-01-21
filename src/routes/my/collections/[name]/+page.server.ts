import type { PageServerLoad } from "./$types";

interface OutputType {
	name: string;
}

export const load: PageServerLoad<OutputType> = async ({ params }) => {
	return { name: params.name };
};
