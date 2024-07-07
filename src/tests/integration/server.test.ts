import request from "supertest";
import {Express} from "express";
import {createServer} from "../../infrastructure/server";
import {Factory} from "../../infrastructure/factory";
import {Routes} from "../../infrastructure/routes";
import {UserRegistrationController} from "../../infrastructure/UserRegistrationController";

describe('The Server', ()=>{
    let server: Express;
    beforeEach(()=>{
        server = Factory.createServer();
    });

    it('works', async ()=>{
        const response = await request(server).get(Routes.status);

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.body).toEqual({status: 'OK'});
    });

    it('registers a new user for a given valid credentials', async ()=>{
        const email = 'test@test.com';
        const response = await request(server).post(Routes.register).send({email, password: 'StrongPass123_'});

        expect(response.status).toEqual(201);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.body).toEqual({id: expect.any(String), email});
    });

    it('should reject if provided an existing email', async ()=>{
        const email = 'test@test.com';
        const response = await request(server).post(Routes.register).send({email: undefined, password: 'StrongPass123_'});

        expect(response.status).toEqual(400);
        expect(response.headers['content-type']).toContain('application/json');
        expect(response.body).toEqual({message: UserRegistrationController.NOT_VALID_EMAIL_OR_PASSWORD_PROVIDED});
    });
});
