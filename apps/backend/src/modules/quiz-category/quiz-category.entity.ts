import { type Entity } from "~/libs/types/types.js";

type QuizCategoryObject = {
	createdAt: string;
	id: number;
	name: string;
	updatedAt: string;
};

type NewQuizCategoryObject = {
	createdAt: string;
	name: string;
	updatedAt: string;
};

type Constructor = {
	createdAt: string;
	id: null | number;
	name: string;
	updatedAt: string;
};

class QuizCategoryEntity implements Entity {
	private createdAt: string;

	private id: null | number;

	private name: string;

	private updatedAt: string;

	private constructor({ createdAt, id, name, updatedAt }: Constructor) {
		this.createdAt = createdAt;
		this.id = id;
		this.name = name;
		this.updatedAt = updatedAt;
	}

	public static initialize(
		quizCategory: QuizCategoryObject,
	): QuizCategoryEntity {
		return new QuizCategoryEntity(quizCategory);
	}

	public static initializeNew(
		newQuizCategory: NewQuizCategoryObject,
	): QuizCategoryEntity {
		return new QuizCategoryEntity({ id: null, ...newQuizCategory });
	}

	toNewObject(): NewQuizCategoryObject {
		return {
			createdAt: this.createdAt,
			name: this.name,
			updatedAt: this.updatedAt,
		};
	}

	toObject(): QuizCategoryObject {
		return {
			createdAt: this.createdAt,
			id: this.id as number,
			name: this.name,
			updatedAt: this.updatedAt,
		};
	}
}

export { QuizCategoryEntity };
