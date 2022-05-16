import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "../../libs/subabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { teeny_code, long_url, emojis } = req.query;

	// Check if emojis already exist for another teeny URL
	const response1 = await supabase.from("urls").select().match({ emojis });

	if (response1.data?.length === 0 && !response1.error) {
		// Emoji combination is available
		// Save emojis as new entry
		const { data, error } = await supabase.from("urls").insert([{ teeny_code, long_url, emojis }]);

		res.status(200).json({
			data,
			error: error ? error.message : null,
		});
	} else {
		res.status(500).json({
			data: null,
			error: response1.error?.message,
		});
	}
}
