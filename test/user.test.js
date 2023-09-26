import supertest from "supertest";
import {web} from "../src/applications/web.js";
import {logger} from "../src/applications/logging.js";
import {createTestUser, getTestUser, removeTestUser} from "./test-util.js";
import bcrypt from "bcrypt";

describe('POST /api/v1/users', function () {

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
            .post('/api/v1/users')
            .send({
                username: "user-test",
                password: "rahasia",
                name: "name-test"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("user-test");
        expect(result.body.data.name).toBe("name-test");
        expect(result.body.data.password).toBeUndefined();
    });

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/v1/users')
            .send({
                username: "",
                password: "",
                name: ""
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject if username already registered', async () => {
        let result = await supertest(web)
            .post('/api/v1/users')
            .send({
                username: "user-test",
                password: 'rahasia',
                name: 'name-test'
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("user-test");
        expect(result.body.data.name).toBe("name-test");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/v1/users')
            .send({
                username: "user-test",
                password: 'rahasia',
                name: 'test'
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('POST /api/v1/users/login', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/v1/users/login')
            .send({
                username: "user-test",
                password: "rahasia"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it('should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/v1/users/login')
            .send({
                username: "",
                password: ""
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/v1/users/login')
            .send({
                username: "user-test",
                password: "salah"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('should reject login if username is wrong', async () => {
        const result = await supertest(web)
            .post('/api/v1/users/login')
            .send({
                username: "salah",
                password: "salah"
            });

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/v1/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can get current user', async () => {
        const result = await supertest(web)
            .get('/api/v1/users/current')
            .set('Authorization', "token-test");

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("user-test");
        expect(result.body.data.name).toBe("name-test");
    });

    it('should reject if token is invalid', async () => {
        const result = await supertest(web)
            .get('/api/v1/users/current')
            .set('Authorization', 'salah');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('PATCH /api/v1/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can update user', async () => {
        const result = await supertest(web)
            .patch("/api/v1/users/current")
            .set("Authorization", "token-test")
            .send({
                name: "akhid",
                password: "rahasia-lagi"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("user-test");
        expect(result.body.data.name).toBe("akhid");

        const user = await getTestUser();
        expect(await bcrypt.compare("rahasia-lagi", user.password)).toBe(true);
    });

    it('should can update user name', async () => {
        const result = await supertest(web)
            .patch("/api/v1/users/current")
            .set("Authorization", "token-test")
            .send({
                name: "akhid"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("user-test");
        expect(result.body.data.name).toBe("akhid");
    });

    it('should can update user password', async () => {
        const result = await supertest(web)
            .patch("/api/v1/users/current")
            .set("Authorization", "token-test")
            .send({
                password: "rahasia-lagi"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("user-test");
        expect(result.body.data.name).toBe("name-test");

        const user = await getTestUser();
        expect(await bcrypt.compare("rahasia-lagi", user.password)).toBe(true);
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .patch("/api/v1/users/current")
            .set("Authorization", "salah")
            .send({});

        expect(result.status).toBe(401);
    });
});

describe('DELETE /api/v1/users/logout', function () {
    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeTestUser();
    });

    it('should can logout', async () => {
        const result = await supertest(web)
            .delete('/api/v1/users/logout')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        const user = await getTestUser();
        expect(user.token).toBeNull();
    });

    it('should reject logout if token is invalid', async () => {
        const result = await supertest(web)
            .delete('/api/v1/users/logout')
            .set('Authorization', 'salah');

        expect(result.status).toBe(401);
    });
});
