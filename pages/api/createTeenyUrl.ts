import type { NextApiRequest, NextApiResponse } from "next";

import emojiUnicode from "emoji-unicode";
import { generateTeenyCode } from "@utils";
import { supabase } from "@libs/subabase";
import { topEmojis } from "@constants";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { long_url } = req.query;

	const teenyCode = generateTeenyCode(topEmojis);
	const codePoints = emojiUnicode.raw(teenyCode);
	const newUrlEntry = {
		long_url,
		teeny_code: teenyCode,
		code_points: codePoints,
	};

	// Check if teeny_code already exist for another teeny URL
	const { data, error } = await supabase.from("urls").select().match({ teeny_code: teenyCode });

	if (data?.length === 0 && !error) {
		// If Emoji combination is available, save teeny_code as new entry
		const { data, error } = await supabase.from("urls").insert([newUrlEntry]);

		res.status(200).json({
			data,
			error: error ? error.message : null,
		});
	} else {
		res.status(500).json({
			data: null,
			error: error?.message,
		});
	}
}
