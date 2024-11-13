import React from 'react';
import { Outlet, useNavigation, useLoaderData, Form, redirect, NavLink } from 'react-router-dom';

// export async function action() {
//     const contact = await createContact();
//     return redirect(`/contacts/${contact.id}/edit`);
// }

// export async function loader({ request }) {
//     const contacts = (await getContacts(null)) as any[];
//     return contacts;
// }

const SearchForm = () => {
    return (
        <div>
            <Form id="search-form" role="search">
                <input id="q" aria-label="Search contacts" placeholder="Search" type="search" name="q" />
                <div id="search-spinner" aria-hidden hidden={true} />
                <div className="sr-only" aria-live="polite"></div>
            </Form>
            <Form method="post">
                <button type="submit">New</button>
            </Form>
        </div>
    );
};

const Sidebar = (contacts: any) => {
    return (
        <div id="sidebar">
            <SearchForm />
            <nav>
                {contacts?.length ? (
                    <ul>
                        {contacts.map(
                            (contact) =>
                                contact.first && (
                                    <li key={contact.id}>
                                        <NavLink
                                            to={`contacts/${contact.id}`}
                                            className={({ isActive, isPending }) =>
                                                isActive ? 'active' : isPending ? 'pending' : ''
                                            }
                                        >
                                            {contact.first || contact.last ? (
                                                <>
                                                    {contact.first} {contact.last}
                                                </>
                                            ) : (
                                                <i>No Name</i>
                                            )}{' '}
                                            {contact.favorite && <span>★</span>}
                                        </NavLink>
                                    </li>
                                )
                        )}
                    </ul>
                ) : (
                    <p>
                        <i>No contacts</i>
                    </p>
                )}
            </nav>
        </div>
    );
};

const MainContent = (navigation: any) => {
    return (
        <div id="detail" className={navigation.state === 'loading' ? 'loading' : ''}>
            <Outlet />
            We are here
        </div>
    );
};

export default function Root() {
    const { contacts } = useLoaderData() as any;
    const navigation = useNavigation();

    return (
        <>
            <Sidebar contacts={contacts} />
            <MainContent navigation={navigation} />
        </>
    );
}
