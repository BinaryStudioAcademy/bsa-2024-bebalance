type Encrypt = {
	encrypt: (data: string) => Promise<{ hash: string; salt: string }>;
};

export { type Encrypt };
