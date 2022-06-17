const $inp = document.getElementById("inp");
const $allBtn = document.getElementById("all");
const $activeBtn = document.getElementById("active");
const $completedBtn = document.getElementById("completed");
const $mainDiv = document.getElementById("mainDiv");
const $form = document.querySelector("#main-form");
const $deleteButtonDiv = document.getElementById("deleteButtonDiv");
const $mainFormWrapper = document.getElementById("mainformWrapper");
const $currentTab = document.getElementById("currentTab");

let data = [];
let currentTab = "all";
let clearAllButtonExists = false;

const renderLatestItem = (data) => {
  const el = {
    name: data,
    checked: false,
  };
  const index = data.length - 1;
  const $cbox = createCbox(el, index);
  const $todo = createTodo(el, index);
  const $todoDiv = createTodoDiv($cbox, $todo, el);

  $cbox.addEventListener("click", () => {
    if ($cbox.checked === true) {
      $todo.style.textDecoration = "line-through";
      $todo.className = "activeClass";
      el.checked = true;
    } else {
      $todo.style.textDecoration = "none";
      $todo.className = "UnactiveClass";
      el.checked = false;
    }
  });
  $mainDiv.appendChild($todoDiv);
};

const render = () => {
  $currentTab.innerHTML = `Current Tab: ${currentTab}`;
  //console.log(data);
  $mainDiv.innerHTML = "";
  let newData = getNewData();
  // newData.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0)); // Sorting the newData
  newData.forEach((el, index) => {
    const $cbox = createCbox(el, index);

    const $todo = createTodo(el, index);
    const $todoDiv = createTodoDiv($cbox, $todo, el);

    $cbox.addEventListener("click", () => {
      if ($cbox.checked === true) {
        $todo.style.textDecoration = "line-through";
        $todo.className = "activeClass";
        el.checked = true;
      } else {
        $todo.style.textDecoration = "none";
        $todo.className = "UnactiveClass";
        el.checked = false;
      }
    });
    $mainDiv.appendChild($todoDiv);
  });
};

const getNewData = () => {
  if (currentTab === "active") {
    return data.filter((el) => {
      return el.checked === false;
    });
  } else if (currentTab === "completed") {
    return data.filter((el) => {
      return el.checked === true;
    });
  } else if (currentTab === "all") {
    return data;
  }
};

const createCbox = (el, index) => {
  const $cbox = document.createElement("input");
  $cbox.type = "checkbox";
  $cbox.id = `cbox-${index}`;
  $cbox.className = "cBox";
  if (el.checked === true) {
    $cbox.checked = true;
  } else {
    $cbox.checked = false;
  }
  return $cbox;
};

const createTodo = (el, index) => {
  const $todo = document.createElement("label");
  $todo.className = "todo";
  $todo.for = `cbox-${index}`;
  $todo.innerHTML = el.name;
  if (el.checked === true) {
    $todo.style.textDecoration = "line-through";
  }
  return $todo;
};

const createTodoDiv = ($cbox, $todo, el) => {
  const $todoDiv = document.createElement("div");
  $todoDiv.className = "todoDiv";
  $todoDiv.appendChild($cbox);
  $todoDiv.appendChild($todo);
  if (currentTab === "completed") {
    const $clearButton = document.createElement("button");
    $clearButton.id = "clearBtn";
    let txt = document.createTextNode("Delete");
    $clearButton.appendChild(txt);

    $clearButton.addEventListener("click", () => {
      data = data.filter((item) => {
        return item.name !== el.name;
      });
      render();
    });

    $todoDiv.appendChild($clearButton);
  }
  return $todoDiv;
};

const createClearAllBtn = () => {
  const $clearAllButton = document.createElement("button");
  $clearAllButton.id = "clearBtnAll";
  $clearAllButton.addEventListener("click", () => {
    data = data.filter((item) => {
      return item.checked === false;
    });
    render();
  });
  return $clearAllButton;
};

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  if ($inp.value !== "") {
    data.push({ name: $inp.value, checked: false });
    renderLatestItem($inp.value);
    $inp.value = "";

    //render();
  }
});

$allBtn.addEventListener("click", () => {
  currentTab = "all";
  $mainFormWrapper.style.display = "block";
  $deleteButtonDiv.style.display = "none";

  render();
});

$activeBtn.addEventListener("click", () => {
  currentTab = "active";
  $mainFormWrapper.style.display = "block";
  $deleteButtonDiv.style.display = "none";
  render();
});

$completedBtn.addEventListener("click", () => {
  currentTab = "completed";
  $mainFormWrapper.style.display = "none";
  //$deleteButtonDiv.innerHTML = "";
  if (!clearAllButtonExists) {
    const $clearAllButton = createClearAllBtn();
    $clearAllButton.innerHTML = `Clear All`;
    $deleteButtonDiv.appendChild($clearAllButton);
    clearAllButtonExists = true;
  }
  $deleteButtonDiv.style.display = "block";

  render();
});
