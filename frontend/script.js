const HOST = "http://localhost:3000/";

const userAPI = HOST + "users/";

let editMode = false;

let editId = -1;

const getRequest = async (url) => {
  return await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: "localhost",
    },
  }).then(async (res) => {
    return {
      status: res.status,
      isError: res.status >= 400 && res.status < 600 ? true : false,
      data: await res.json(),
    };
  });
};

const postRequest = async (url, body) => {
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: "*",
    },
  }).then(async (res) => {
    return {
      status: res.status,
      isError: res.status >= 400 && res.status < 600 ? true : false,
      data: await res.json(),
    };
  });
};

const putRequest = async (url, body) => {
  return await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: "*",
    },
  }).then(async (res) => {
    return {
      status: res.status,
      isError: res.status >= 400 && res.status < 600 ? true : false,
      data: await res.json(),
    };
  });
};

const deleteRequest = async (url) => {
  return await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: "*",
    },
  }).then(async (res) => {
    return {
      status: res.status,
      isError: res.status >= 400 && res.status < 600 ? true : false,
      data: await res.json(),
    };
  });
};

const getUser = async () => {
  const users = await getRequest(userAPI);
  return users.data || [];
}

const addUser = async () => {
  await postRequest(userAPI, {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
  });
  handleReset();
  await showUser();
}

const updateUserById = async () => {
  await putRequest(userAPI + editId, {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
  });
  await showUser();
};

const deleteUserById = async (id) => {
  await deleteRequest(userAPI + id);
  await showUser();
};

const handleEdit = (id, name, email) => {
  const button = document.getElementById('btn-add');
  button.innerHTML = 'Edit'
  document.getElementById('name').value = name;
  document.getElementById('email').value = email;
  editMode = true;
  editId = id;
}

const handleAdd = async () => {
  if (editMode) {
    await updateUserById();
    editId = -1;
    editMode = false;
    document.getElementById('btn-add').innerHTML = 'Add';

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
  } else {
    await addUser();
  }
}

const handleReset = () => {
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
}

const showUser = async () => {
  let users = await getUser();
  let tempHtml = "";
  console.log(users);
  users.forEach((user) => {
    tempHtml +=
      `
      <div class="card card-style" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">` +
      user.name +
      `</h5>
          <p id="msg" class="card-text card-text-style">` +
      user.email +
      `</p>
      <button onclick="handleEdit(`+ user.id + `,'` + user.name + `','` + user.email + `')" class="btn btn-warning">Update</button>
      <button onclick="deleteUserById(`+ user.id + `)" class="btn btn-danger">Delete</button>
        </div>
      </div>`;
  });

  document.getElementById("list").innerHTML = tempHtml;
}
