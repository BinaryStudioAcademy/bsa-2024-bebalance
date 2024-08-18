type Encrypt = {
	compare: (data: string, hash: string) => Promise<boolean>;
	generateHash: (data: string, salt: string) => Promise<string>;
	generateSalt: (saltRounds: number) => Promise<string>;
};

export { type Encrypt };
