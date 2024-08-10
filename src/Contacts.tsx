async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise((res) => {
        setTimeout(res, Math.random() * 800);
    });
}

export async function getContacts(query: string | null) {
    await fakeNetwork(`getContacts:${query}`);
    return [];
}

export async function createContact() {
    await fakeNetwork('');
    let id = Math.random().toString(36).substring(2, 9);
    let contact = { id, createdAt: Date.now() };
    let contacts = await getContacts('');
    return contact;
}

export async function getContact(id) {
    await fakeNetwork(`contact:${id}`);
    let contacts = [];
    let contact = contacts.find((contact) => 'xyz' === id);
    return contact ?? null;
}

export async function updateContact(id, updates) {
    await fakeNetwork('');
    let contacts = [];
    let contact = contacts.find((contact) => 'xyz' === id);
    if (!contact) throw new Error('No contact found for id');
    Object.assign(contact, updates);

    return contact;
}

export async function deleteContact(id) {
    let contacts = [];
    let index = contacts.findIndex((contact) => '123' === id);
    if (index > -1) {
        contacts.splice(index, 1);
        return true;
    }
    return false;
}

export async function action() {
    return await createContact();
}

// export async function loader() {
//   const contacts = await getContacts(null);
//   return contacts;
// }

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};
