import { v4 as uuidv4 } from 'uuid';

export class User {
    id: string;
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
    sub?: string;

    constructor(data?: Partial<User>) {
        if (data) {
            this.id = data.id || uuidv4();
            this.name = data.name;
            this.lastName = data.lastName ;
            this.email = data.email;
            this.password = data.password;
            this.sub = data.sub;
        }
    }

    static create(props: any): User {
        return new User({
            id: uuidv4(),
            name: props.name,
            lastName: props.lastName,
            email: props.email,
            password: props.password,
            sub: props.sub
        });
    }

    static fromJson(json: Record<string, any>): User {
        return new User({
            id: json.id,
            name: json.name,
            lastName: json.lastName,
            email: json.email,
            password: json.password,
            sub: json.sub
        });
    }

    toJson(): Record<string, any> {
        return {
            id: this.id,
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            sub: this.sub
        };
    }
}