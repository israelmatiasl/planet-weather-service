import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';

export const CognitoProvider = {
    provide: 'COGNITO_CLIENT',
    useFactory: () => {
        return new CognitoIdentityProviderClient({
            region: process.env.AWS_REGION,
        });
    }
};