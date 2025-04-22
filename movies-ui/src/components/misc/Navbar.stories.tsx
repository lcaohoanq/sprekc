import Navbar from './Navbar';
import {MemoryRouter} from 'react-router-dom';
import {Meta, StoryObj} from '@storybook/react';
import {useKeycloak} from '@react-keycloak/web';

// 🧠 Mocking react-router-dom's useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

// 🧠 Mock Keycloak hook
jest.mock('@react-keycloak/web', () => ({
    useKeycloak: jest.fn(),
}));

const mockedUseKeycloak = useKeycloak as jest.Mock;

const meta: Meta<typeof Navbar> = {
    title: 'Layout/Navbar',
    component: Navbar,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const LoggedOut: Story = {
    render: () => {
        mockedUseKeycloak.mockReturnValue({
            keycloak: {
                authenticated: false,
                login: () => alert('Login called'),
                logout: () => alert('Logout called'),
            },
        });
        return <Navbar />;
    },
};

export const LoggedInUser: Story = {
    render: () => {
        mockedUseKeycloak.mockReturnValue({
            keycloak: {
                authenticated: true,
                login: () => {},
                logout: () => alert('Logging out'),
                tokenParsed: {
                    preferred_username: 'hoangdev',
                    roles: ['user'],
                },
            },
        });
        return <Navbar />;
    },
};

export const LoggedInAdmin: Story = {
    render: () => {
        mockedUseKeycloak.mockReturnValue({
            keycloak: {
                authenticated: true,
                login: () => {},
                logout: () => alert('Logging out'),
                tokenParsed: {
                    preferred_username: 'admin_user',
                    roles: ['admin'],
                },
            },
        });
        return <Navbar />;
    },
};
