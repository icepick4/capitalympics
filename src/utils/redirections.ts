import { Redirection } from '../types/Redirection';
//list of all available redirections with type Redirection
export class Redirections {
    public static readonly REDIRECTIONS: Redirection[] = [
        {
            backgroundColor: 'black',
            text: 'Home',
            textColor: 'white',
            redirectionLink: '/'
        },
        {
            backgroundColor: 'primary',
            text: 'Log in',
            textColor: 'white',
            redirectionLink: '/login'
        },
        {
            backgroundColor: 'primary',
            text: 'Sign up',
            textColor: 'white',
            redirectionLink: '/signup'
        },
        {
            backgroundColor: 'black',
            text: 'Countries',
            textColor: 'white',
            redirectionLink: '/countries'
        },
        {
            backgroundColor: 'black',
            text: 'Learn',
            textColor: 'white',
            redirectionLink: '/learn'
        },
        {
            backgroundColor: 'black',
            text: 'Profile',
            textColor: 'white',
            redirectionLink: '/profile'
        },
        {
            backgroundColor: 'black',
            text: 'Log out',
            textColor: 'white',
            redirectionLink: '/logout'
        }
    ];

    public static getRedirectionByLink(link: string): Redirection {
        //finds the redirection with the same link as the one passed as a parameter or return for /
        return (
            this.REDIRECTIONS.find((redirection) => {
                return redirection.redirectionLink === link;
            }) || this.REDIRECTIONS[0]
        );
    }
}
