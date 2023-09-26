import {createTestUser, removeTestBook, removeTestUser} from "./test-util";
import supertest from "supertest";
import {web} from "../src/applications/web";
import {logger} from "../src/applications/logging";

describe('POST /api/v1/books', function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeTestBook();
        await removeTestUser();
    })

    it('should can create new book', async () => {
        const result = await supertest(web)
            .post('/api/v1/books')
            .set('Authorization', 'token-test')
            .send({
                tittle: "tittle-test",
                description: "description-test",
                price: 10000,
                image: "image-test.jpg",
                categories: "category-test",
                keywords: "keyword-test",
                stock: 10,
                publisher: "publisher-test"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.tittle).toBe("tittle-test");
        expect(result.body.data.description).toBe("description-test");
        expect(result.body.data.price).toBe(10000);
        expect(result.body.data.image).toBe("image-test.jpg");
        expect(result.body.data.categories).toBe("category-test");
        expect(result.body.data.keywords).toBe("keyword-test");
        expect(result.body.data.stock).toBe(10);
        expect(result.body.data.publisher).toBe("publisher-test");
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/v1/books')
            .set('Authorization', 'token-test')
            .send({
                tittle: "",
                description: "",
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if book already created', async () => {
        let result = await supertest(web)
            .post('/api/v1/books')
            .set('Authorization', 'token-test')
            .send({
                tittle: "tittle-test",
                description: "description-test",
                price: 10000,
                image: "image-test.jpg",
                categories: "category-test",
                keywords: "keyword-test",
                stock: 10,
                publisher: "publisher-test"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.tittle).toBe("tittle-test");
        expect(result.body.data.description).toBe("description-test");
        expect(result.body.data.price).toBe(10000);
        expect(result.body.data.image).toBe("image-test.jpg");
        expect(result.body.data.categories).toBe("category-test");
        expect(result.body.data.keywords).toBe("keyword-test");
        expect(result.body.data.stock).toBe(10);
        expect(result.body.data.publisher).toBe("publisher-test");

        result = await supertest(web)
            .post('/api/v1/books')
            .set('Authorization', 'token-test')
            .send({
                tittle: "tittle-test",
                description: "description-test"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});