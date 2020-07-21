const vm = new Vue({
  el: "#app",
  data: function() {
    return {
      todos: [
        {
          id: 1,
          title: "Задача 1",
          completed: false
        },
        {
          id: 2,
          title: "Задача 2",
          completed: false
        },
        {
          id: 3,
          title: "Задача 3",
          completed: true
        }
      ],
      activeFilter: "all",
      value: "Задача "
    };
  },
  methods: {
    todo(t) {
      let todos = this.todos;
      let title = t || "Задача " + 1;
      let id = 1;
      console.log(this.todos.length);
      if (todos.length > 0) {
        id = todos[todos.length - 1].id + 1 || 1;
      }
      let todo = {
        id: id,
        title: title,
        completed: false
      };
      this.todos.push(todo);
      this.updateField();
      localStorage.setItem("data", JSON.stringify(todos));
    },
    remove(t) {
      let todos = this.todos;
      console.log(t.id);
      this.todos = todos.filter(todo => todo.id !== t.id);

      localStorage.setItem("data", JSON.stringify(this.todos));
      this.updateField();
    },
    setFilter(filter) {
      this.activeFilter = filter;
    },
    updateField() {
      if (this.todos.length > 0) {
        this.value = "Задача " + (this.todos[this.todos.length - 1].id + 1);
      } else {
        this.value = "Задача 1";
      }
    }
  },
  computed: {
    filtered() {
      if (this.activeFilter === "all") {
        return this.todos;
      } else if (this.activeFilter === "completed") {
        return this.todos.filter(t => t.completed);
      } else if (this.activeFilter === "active") {
        return this.todos.filter(t => !t.completed);
      }
    }
  },
  mounted() {
    if (localStorage.data) {
      this.todos = JSON.parse(localStorage.data);
    }
    this.$refs.field.focus();
    this.updateField();
  }
});
