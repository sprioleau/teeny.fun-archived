export type Url = {
	id?: string;
	created_at?: string;
	code_points: string;
	teeny_code: string;
	long_url: string;
	hits: number;
};

export type TopEmoji = Record<string, number>;