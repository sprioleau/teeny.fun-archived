import type { NextApiRequest, NextApiResponse } from "next";

import { ROOT_URL } from "../../constants";
import { hasNone } from "../../utils";
import { supabase } from "../../libs/subabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { emojis } = req.query;
	const { data: teenyUrlData, error } = await supabase.from("urls").select().match({ emojis });

	console.dir({ data: teenyUrlData, error });

	if (error || hasNone(teenyUrlData)) {
		res.redirect(ROOT_URL);
	} else {
		const { data, error } = await supabase
			.from("urls")
			.update({ hits: Number(teenyUrlData[0]?.hits) + 1 })
			.match({ emojis });

		console.log("data:", data);
		if (error) console.error(error);
		res.redirect(`/redirect?to=${teenyUrlData[0].long_url}`);
	}
}
