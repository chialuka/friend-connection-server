import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

async function main() {
	await prisma.user.upsert({
		where: { email: 'aluka@gmail.com' },
		update: {},
		create: {
			email: 'aluka@gmail.com',
			username: 'aluka_c',
			userId: uuid(),
			posts: {
				create: [
					{
						postId: uuid(),
						post: 'Checking in with friends',
						likes: 0,
					},
				],
			},
		},
	});
	await prisma.user.upsert({
		where: { email: 'jose@kor.com' },
		update: {},
		create: {
			userId: uuid(),
			email: 'jose@kor.com',
			posts: {
				create: [
					{
						postId: uuid(),
						post: 'Hey friends!',
						likes: 0,
					},
					{
						postId: uuid(),
						post: 'Hello, world!',
						likes: 0,
					},
				],
			},
		},
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
