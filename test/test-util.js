import {prismaClient} from "../src/applications/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "user-test"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "user-test",
            password: await bcrypt.hash("rahasia", 10),
            name: "name-test",
            token: "token-test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "user-test"
        }
    });
}

export const removeAllTestContacts = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: 'test'
        }
    });
}

export const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: "user-test",
            first_name: "name-test",
            last_name: "name-test",
            email: "test@xyz.com",
            phone: "080000020"
        }
    })
}

export const createManyTestContacts = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.contact.create({
            data: {
                username: `test`,
                first_name: `test ${i}`,
                last_name: `test ${i}`,
                email: `test${i}@xyz.com`,
                phone: `080000020${i}`
            }
        })
    }
}

export const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: 'test'
        }
    })
}

export const removeAllTestAddresses = async () => {
    await prismaClient.address.deleteMany({
        where: {
            contact: {
                username: "user-test"
            }
        }
    });
}

export const createTestAddress = async () => {
    const contact = await getTestContact();
    await prismaClient.address.create({
        data: {
            contact_id: contact.id,
            street: "jl. kita",
            city: 'kota test',
            province: 'prov test',
            country: 'indonesia',
            postal_code: '123456'
        }
    })
}

export const getTestAddress = async () => {
    return prismaClient.address.findFirst({
        where: {
            contact: {
                username: "user-test"
            }
        }
    })
}

export const removeTestBook = async () => {
    await prismaClient.book.deleteMany({
        where: {
            username: "user-test"
        }
    })
}